
import { useEffect, useState } from 'react';
import { ConfigurationState } from '@/types/configurator';

interface ConfigVisualizationProps {
  config: ConfigurationState;
}

const ConfigVisualization = ({ config }: ConfigVisualizationProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading when config changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [config]);

  const getMaterialLabel = (material: string) => {
    switch (material) {
      case 'oak': return 'Дуб';
      case 'walnut': return 'Американский орех';
      case 'rosewood': return 'Палисандр';
      default: return 'Дуб';
    }
  };

  const getBaseLabel = (base: string) => {
    switch (base) {
      case 'lift': return 'Подъёмное';
      case 'liftClosed': return 'Подъёмное закрытое';
      case 'staticP': return 'Статичное П';
      case 'staticZ': return 'Статичное Z';
      default: return 'Подъёмное';
    }
  };

  const getStorageLabel = (storage: string) => {
    switch (storage) {
      case 'none': return 'Без тумбы';
      case 'hanging': return 'Подвесная';
      case 'mobile': return 'Подкатная';
      case 'integratedS': return 'Интегрированная S';
      case 'integratedM': return 'Интегрированная M';
      default: return 'Без тумбы';
    }
  };

  const getTableImage = () => {
    // Use the uploaded images as reference for material selection
    if (config.material === 'walnut') {
      return '/lovable-uploads/83d7d3d4-1b81-43c5-a96e-089124e2d101.png';
    } else if (config.material === 'rosewood') {
      return '/lovable-uploads/83d7d3d4-1b81-43c5-a96e-089124e2d101.png';
    }
    return 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
  };

  const getStorageImage = () => {
    if (config.storage === 'none') return null;
    return '/lovable-uploads/56980825-0cb0-424c-9b13-d26c57f49321.png';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="font-playfair text-xl font-bold text-primary mb-4">
        Предварительный просмотр
      </h3>

      {/* Visualization Container */}
      <div className="relative mb-6">
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
          </div>
        )}

        <div className="aspect-video bg-gray-50 rounded-lg overflow-hidden relative">
          {/* Table Image */}
          <img
            src={getTableImage()}
            alt="Стол"
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          {/* Storage Image Overlay */}
          {getStorageImage() && (
            <img
              src={getStorageImage()}
              alt="Система хранения"
              className="absolute bottom-4 right-4 w-1/4 h-1/3 object-cover rounded opacity-80"
            />
          )}

          {/* Dimensions overlay */}
          <div className="absolute bottom-2 left-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
            {config.width} × {config.length} см
          </div>
        </div>
      </div>

      {/* Configuration Summary */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Материал:</span>
          <span className="font-semibold text-primary">{getMaterialLabel(config.material)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Подстолье:</span>
          <span className="font-semibold text-primary">{getBaseLabel(config.tableBase)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Хранение:</span>
          <span className="font-semibold text-primary">{getStorageLabel(config.storage)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Размеры:</span>
          <span className="font-semibold text-primary">{config.width} × {config.length} см</span>
        </div>

        {/* Selected Options */}
        {Object.entries(config.options).some(([_, selected]) => selected) && (
          <div className="pt-3 border-t border-gray-200">
            <span className="text-gray-600 text-xs font-medium">Дополнительные опции:</span>
            <div className="mt-2 flex flex-wrap gap-1">
              {Object.entries(config.options).map(([key, selected]) => {
                if (!selected) return null;
                return (
                  <span key={key} className="bg-accent/10 text-accent text-xs px-2 py-1 rounded">
                    {key === 'wireless' && 'Беспроводная зарядка'}
                    {key === 'phoneHolder' && 'Подставка для телефона'}
                    {key === 'usbHub' && 'USB-хаб'}
                    {key === 'lighting' && 'Подсветка'}
                    {key === 'speakerphone' && 'Конференц-система'}
                    {key === 'idLock' && 'Биометрический замок'}
                    {key === 'charger' && 'ИБП'}
                    {key === 'audioSystem' && 'Акустическая система'}
                    {key === 'wireShelf' && 'Проводная полка'}
                    {key === 'voiceAssistant' && 'Голосовой ассистент'}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigVisualization;
