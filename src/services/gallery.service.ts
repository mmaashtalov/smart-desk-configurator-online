import { v4 as uuidv4 } from 'uuid';
import { GalleryImage, UploadGalleryImageDTO } from '@/types/gallery';
import { supabase } from './supabase';

/**
 * Fetches all gallery images from the database.
 * @returns A promise that resolves to an array of gallery images.
 */
export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching gallery images:', error);
    throw new Error(error.message);
  }

  return data || [];
};

/**
 * Uploads a new image and its metadata to the gallery.
 * This function is designed to be robust and secure.
 * @param imageData - The data for the new image, conforming to UploadGalleryImageDTO.
 */
export const uploadGalleryImage = async (imageData: UploadGalleryImageDTO): Promise<GalleryImage> => {
  const { imageFile, title, ...metadata } = imageData;

  // 1. Получаем текущего аутентифицированного пользователя.
  // Это критически важно для RLS (Row-Level Security).
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('Error getting user or user not authenticated:', userError);
    throw new Error('Пользователь не аутентифицирован. Пожалуйста, войдите в систему.');
  }

  const fileExtension = imageFile.name.split('.').pop();
  const newFileName = `${uuidv4()}.${fileExtension}`;

  // 2. Вставляем метаданные в таблицу 'gallery_images'.
  // Мы явно указываем 'owner', используя ID пользователя.
  const { data: newImageRecord, error: insertError } = await supabase
    .from('gallery_images')
    .insert([
      {
        ...metadata,
        owner: user.id, // Явно устанавливаем владельца
        alt_text: title, // Используем 'title' из формы как 'alt_text'
        image_url: 'placeholder' // Временный URL
      }
    ])
    .select()
    .single();

  // Если на этом этапе возникает ошибка, значит проблема в данных или политике INSERT.
  if (insertError) {
    console.error('Ошибка при предварительной вставке метаданных изображения:', insertError);
    throw new Error(`Ошибка базы данных при предварительной вставке: ${insertError.message}`);
  }

  // 3. Загружаем файл в Supabase Storage.
  const filePath = newFileName;

  const { error: uploadError } = await supabase.storage
    .from('gallery')
    .upload(filePath, imageFile);

  // Если загрузка файла не удалась, удаляем созданную ранее запись в таблице.
  if (uploadError) {
    console.error('Ошибка при загрузке файла изображения:', uploadError);
    await supabase.from('gallery_images').delete().eq('id', newImageRecord.id);
    throw new Error(`Ошибка хранилища: ${uploadError.message}`);
  }

  // 4. Получаем публичный URL загруженного файла.
  const { data: publicUrlData } = supabase.storage
    .from('gallery')
    .getPublicUrl(filePath);

  // 5. Обновляем запись в таблице, заменяя временный URL на постоянный.
  const { data: updatedImage, error: updateError } = await supabase
    .from('gallery_images')
    .update({ image_url: publicUrlData.publicUrl })
    .eq('id', newImageRecord.id)
    .select()
    .single();

  if (updateError) {
    console.error('Ошибка при обновлении изображения с публичным URL:', updateError);
    throw new Error(`Ошибка базы данных при финальном обновлении: ${updateError.message}`);
  }

  return updatedImage;
};