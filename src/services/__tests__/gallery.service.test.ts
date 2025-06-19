import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { supabase } from '../supabase';
import { getGalleryImages, uploadGalleryImage } from '../gallery.service';
import { GalleryImage, UploadGalleryImageDTO } from '@/types/gallery';
import { v4 as uuidv4 } from 'uuid';

// Mock the supabase client
vi.mock('../supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(),
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(),
        })),
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn(),
          })),
        })),
      })),
      delete: vi.fn(() => ({
        eq: vi.fn(),
      })),
    })),
    auth: {
      getUser: vi.fn(),
    },
    storage: {
      from: vi.fn(() => ({
        upload: vi.fn(),
        getPublicUrl: vi.fn(),
      })),
    },
  },
}));


// Mock uuid
vi.mock('uuid');

describe('Gallery Service', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
  });

  describe('getGalleryImages', () => {
    it('should fetch and return gallery images sorted by creation date', async () => {
      const mockImages: GalleryImage[] = [
        { id: '1', title: 'Image 1', image_url: 'url1', alt_text: 'alt1', category: 'c1', type: 'Фото', coating: 'c1', has_storage: false, is_lift: false, created_at: new Date().toISOString() },
        { id: '2', title: 'Image 2', image_url: 'url2', alt_text: 'alt2', category: 'c2', type: 'Фото', coating: 'c2', has_storage: false, is_lift: false, created_at: new Date().toISOString() },
      ];
      
      const orderMock = vi.fn().mockResolvedValue({ data: mockImages, error: null });
      (supabase.from('gallery_images').select as vi.Mock).mockReturnValue({ order: orderMock });

      const images = await getGalleryImages();

      expect(supabase.from).toHaveBeenCalledWith('gallery_images');
      expect(supabase.from('gallery_images').select).toHaveBeenCalledWith('*');
      expect(orderMock).toHaveBeenCalledWith('created_at', { ascending: false });
      expect(images).toEqual(mockImages);
    });

    it('should throw an error if supabase fetch fails', async () => {
        const mockError = { message: 'Fetch failed' };
        const orderMock = vi.fn().mockResolvedValue({ data: null, error: mockError });
        (supabase.from('gallery_images').select as vi.Mock).mockReturnValue({ order: orderMock });

      await expect(getGalleryImages()).rejects.toThrow(mockError.message);
    });
  });

  describe('uploadGalleryImage', () => {
    const mockFile = new File(['dummy'], 'test.jpg', { type: 'image/jpeg' });
    const mockImageData: UploadGalleryImageDTO = {
      imageFile: mockFile,
      title: 'Test Title',
      category: 'Test Category',
      type: 'Фото',
      coating: 'Дуб',
      has_storage: false,
      is_lift: true,
    };
    const mockUser = { id: 'user-uuid-123' };
    const mockRecordId = 'record-uuid-456';
    const mockFileId = 'file-uuid-789';

    beforeEach(() => {
        // Mock UUID to return a predictable value
        (uuidv4 as vi.Mock).mockReturnValue(mockFileId);
        
        // Mock user session
        (supabase.auth.getUser as vi.Mock).mockResolvedValue({ data: { user: mockUser }, error: null });
        
        // Mock DB insert
        const singleInsertMock = vi.fn().mockResolvedValue({ data: { id: mockRecordId }, error: null });
        const selectInsertMock = vi.fn().mockReturnValue({ single: singleInsertMock });
        (supabase.from('gallery_images').insert as vi.Mock).mockReturnValue({ select: selectInsertMock });

        // Mock storage upload
        (supabase.storage.from('gallery').upload as vi.Mock).mockResolvedValue({ error: null });
        
        // Mock public URL
        const publicUrl = `https://test.supabase.co/storage/v1/object/public/gallery/${mockFileId}.jpg`;
        (supabase.storage.from('gallery').getPublicUrl as vi.Mock).mockReturnValue({ data: { publicUrl } });
        
        // Mock DB update
        const finalRecord = { id: mockRecordId, image_url: publicUrl };
        const singleUpdateMock = vi.fn().mockResolvedValue({ data: finalRecord, error: null });
        const selectUpdateMock = vi.fn().mockReturnValue({ single: singleUpdateMock });
        const eqUpdateMock = vi.fn().mockReturnValue({ select: selectUpdateMock });
        (supabase.from('gallery_images').update as vi.Mock).mockReturnValue({ eq: eqUpdateMock });
    });

    it('should correctly upload an image and update the database record', async () => {
      const newFileName = `${mockFileId}.jpg`;
      const publicUrl = `https://test.supabase.co/storage/v1/object/public/gallery/${newFileName}`;
      
      const result = await uploadGalleryImage(mockImageData);

      // 1. Check if user was fetched
      expect(supabase.auth.getUser).toHaveBeenCalledTimes(1);

      // 2. Check placeholder insert
      expect(supabase.from('gallery_images').insert).toHaveBeenCalledWith([expect.objectContaining({
          owner: mockUser.id,
          alt_text: mockImageData.title,
          image_url: 'placeholder',
          category: mockImageData.category
      })]);

      // 3. Check file upload
      expect(supabase.storage.from).toHaveBeenCalledWith('gallery');
      expect(supabase.storage.from('gallery').upload).toHaveBeenCalledWith(newFileName, mockFile);

      // 4. Check public URL retrieval
      expect(supabase.storage.from('gallery').getPublicUrl).toHaveBeenCalledWith(newFileName);
      
      // 5. Check final update
      expect(supabase.from('gallery_images').update).toHaveBeenCalledWith({ image_url: publicUrl });

      // 6. Check final result
      expect(result.image_url).toBe(publicUrl);
    });

    it('should throw an error if the user is not authenticated', async () => {
        (supabase.auth.getUser as vi.Mock).mockResolvedValueOnce({ data: { user: null }, error: { message: 'No user' } });
        await expect(uploadGalleryImage(mockImageData)).rejects.toThrow('Пользователь не аутентифицирован');
    });

    it('should delete the DB record if file upload fails', async () => {
        const uploadError = { message: 'Storage error' };
        (supabase.storage.from('gallery').upload as vi.Mock).mockResolvedValueOnce({ error: uploadError });
        
        const eqDeleteMock = vi.fn();
        (supabase.from('gallery_images').delete as vi.Mock).mockReturnValue({ eq: eqDeleteMock });

        await expect(uploadGalleryImage(mockImageData)).rejects.toThrow(`Ошибка хранилища: ${uploadError.message}`);
        
        expect(supabase.from('gallery_images').delete).toHaveBeenCalledTimes(1);
        expect(eqDeleteMock).toHaveBeenCalledWith('id', mockRecordId);
    });
  });
}); 