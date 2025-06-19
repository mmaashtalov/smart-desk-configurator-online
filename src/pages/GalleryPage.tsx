import React, { useEffect, useState, useMemo } from 'react';
import { getGalleryImages } from '@/services/gallery.service';
import { GalleryImage } from '@/types/gallery';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for all filters
  const [filters, setFilters] = useState({
    type: 'Все', // 'Визуализация', 'Фотография'
    coating: 'Все', // 'Масло', 'Эмаль', 'Лак'
    material: 'Все', // 'Дуб', 'Орех', etc.
    has_storage: false,
    is_lift: false,
  });

  useEffect(() => {
    const getImages = async () => {
      try {
        setLoading(true);
        const data = await getGalleryImages();
        setImages(data);
      } catch (err) {
        setError('При загрузке изображений произошла ошибка.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getImages();
  }, []);

  const uniqueMaterials = useMemo(() => {
    const allMaterials = images.map((img) => img.category);
    return ['Все', ...Array.from(new Set(allMaterials))];
  }, [images]);

  const filteredImages = useMemo(() => {
    return images.filter(image => {
      const { type, coating, material, has_storage, is_lift } = filters;
      if (type !== 'Все' && image.type !== type) return false;
      if (coating !== 'Все' && image.coating !== coating) return false;
      if (material !== 'Все' && image.category !== material) return false;
      if (has_storage && !image.has_storage) return false;
      if (is_lift && !image.is_lift) return false;
      return true;
    });
  }, [images, filters]);
  
  const handleFilterChange = (filterName: keyof typeof filters, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-playfair font-bold mb-8 text-center">Фотогалерея</h1>

      <div className="bg-gray-50 p-4 rounded-lg mb-8 border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-center">
            {/* Type Filter */}
            <div className="space-y-1">
              <Label>Тип</Label>
              <Select onValueChange={value => handleFilterChange('type', value)} defaultValue="Все">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Все">Все</SelectItem>
                  <SelectItem value="Визуализация">Визуализация</SelectItem>
                  <SelectItem value="Фотография">Фотография</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Coating Filter */}
            <div className="space-y-1">
              <Label>Покрытие</Label>
               <Select onValueChange={value => handleFilterChange('coating', value)} defaultValue="Все">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Все">Все</SelectItem>
                  <SelectItem value="Масло">Масло</SelectItem>
                  <SelectItem value="Эмаль">Эмаль</SelectItem>
                  <SelectItem value="Лак">Лак</SelectItem>
                </SelectContent>
              </Select>
            </div>
             {/* Material Filter */}
             <div className="space-y-1">
              <Label>Материал</Label>
               <Select onValueChange={value => handleFilterChange('material', value)} defaultValue="Все">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {uniqueMaterials.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {/* Storage Switch */}
            <div className="flex items-center space-x-2 pt-5">
               <Switch id="has_storage" checked={filters.has_storage} onCheckedChange={checked => handleFilterChange('has_storage', checked)} />
               <Label htmlFor="has_storage">Есть тумба</Label>
            </div>
             {/* Lift Switch */}
             <div className="flex items-center space-x-2 pt-5">
               <Switch id="is_lift" checked={filters.is_lift} onCheckedChange={checked => handleFilterChange('is_lift', checked)} />
               <Label htmlFor="is_lift">Подъемный стол</Label>
            </div>
        </div>
      </div>

      {loading && <p className="text-center" role="status">Загрузка изображений...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {!loading && !error && filteredImages.length === 0 && (
        <p className="text-center text-gray-500">По вашему запросу ничего не найдено.</p>
      )}

      {!loading && !error && (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
          {filteredImages.map((image) => (
            <div key={image.id} className="mb-4 break-inside-avoid">
              <img
                src={image.image_url}
                alt={image.alt_text}
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