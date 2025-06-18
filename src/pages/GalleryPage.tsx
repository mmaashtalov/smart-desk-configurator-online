import React, { useEffect, useState, useMemo } from 'react';
import { fetchGalleryImages } from '@/services/gallery.service';
import { GalleryImage } from '@/types/gallery';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Все');

  useEffect(() => {
    const getImages = async () => {
      try {
        setLoading(true);
        const data = await fetchGalleryImages();
        setImages(data);
      } catch (err) {
        setError('Не удалось загрузить изображения.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getImages();
  }, []);

  const categories = useMemo(() => {
    const allCategories = images.map((img) => img.category);
    return ['Все', ...Array.from(new Set(allCategories))];
  }, [images]);

  const filteredImages = useMemo(() => {
    if (activeCategory === 'Все') {
      return images;
    }
    return images.filter((img) => img.category === activeCategory);
  }, [images, activeCategory]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Фотогалерея</h1>
      
      <div className="flex justify-center flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {loading && <p className="text-center">Загрузка изображений...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
          {filteredImages.map((image) => (
            <div key={image.id} className="mb-4 break-inside-avoid">
              <img
                src={image.imageUrl}
                alt={image.altText}
                className="w-full h-auto object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryPage; 