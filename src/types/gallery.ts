export interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string;
  category: string;
  type?: 'Визуализация' | 'Фотография';
  coating?: 'Масло' | 'Эмаль' | 'Лак';
  has_storage?: boolean;
  is_lift?: boolean;
  created_at: string;
} 