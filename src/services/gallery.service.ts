import { supabase } from './supabase';
import { GalleryImage } from '@/types/gallery';

/**
 * Fetches gallery images from Supabase.
 */
export const fetchGalleryImages = async (): Promise<GalleryImage[]> => {
  try {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('id, image_url, alt_text, category')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Map snake_case from DB to camelCase for the app
    return data.map((item: any) => ({
      id: item.id,
      imageUrl: item.image_url,
      altText: item.alt_text,
      category: item.category,
    })) as GalleryImage[];

  } catch (error) {
    console.error('Error fetching gallery images:', error);
    // On any error, return an empty array to prevent the page from crashing.
    return [];
  }
}; 