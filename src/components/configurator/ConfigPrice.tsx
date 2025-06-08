
import { ConfigurationState } from '@/types/configurator';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';

interface ConfigPriceProps {
  config: ConfigurationState;
  onSave: () => void;
  onAddToCart: () => void;
}

const ConfigPrice = ({ config, onSave }: ConfigPriceProps) => {
  const [animatePrice, setAnimatePrice] = useState(false);
  const { addToCart } = useApp();

  const calculatePrice = () => {
    let basePrice = 85000; // Base oak table price

    // Material pricing
    if (config.material === 'walnut') basePrice += 60000;
    if (config.material === 'rosewood') basePrice += 80000;

    // Base pricing
    if (config.tableBase === 'lift') basePrice += 55000;
    if (config.tableBase === 'liftClosed') basePrice += 85000;
    if (config.tableBase === 'staticP') basePrice += 20000;
    if (config.tableBase === 'staticZ') basePrice += 45000;

    // Storage pricing
    if (config.storage === 'hanging' || config.storage === 'mobile') basePrice += 25000;
    if (config.storage === 'integratedS') basePrice += 55000;
    if (config.storage === 'integratedM') basePrice += 85000;

    // Additional options
    if (config.options.wireless) basePrice += 15000;
    if (config.options.phoneHolder) basePrice += 5000;
    if (config.options.usbHub) basePrice += 12000;
    if (config.options.lighting) basePrice += 20000;
    if (config.options.speakerphone) basePrice += 30000;
    if (config.options.idLock) basePrice += 8000;
    if (config.options.charger) basePrice += 10000;
    if (config.options.audioSystem) basePrice += 35000;
    if (config.options.wireShelf) basePrice += 8000;
    if (config.options.voiceAssistant) basePrice += 25000;

    return basePrice;
  };

  // Animate price when config changes
  useEffect(() => {
    setAnimatePrice(true);
    const timer = setTimeout(() => setAnimatePrice(false), 300);
    return () => clearTimeout(timer);
  }, [config]);

  const totalPrice = calculatePrice();

  const handleAddToCart = () => {
    const configuredProduct = {
      id: `config-${Date.now()}`,
      name: `Настроенный стол ${config.material === 'oak' ? 'Дуб' : config.material === 'walnut' ? 'Орех' : 'Палисандр'}`,
      price: totalPrice,
      configuration: config,
    };

    addToCart(configuredProduct);
    
    // Show success message
    alert('Конфигурация добавлена в корзину!');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className={`transition-all duration-300 ${animatePrice ? 'scale-110' : 'scale-100'}`}>
          <div className="text-sm text-gray-600 mb-1">Итоговая стоимость:</div>
          <div className={`font-playfair text-3xl font-bold transition-colors duration-300 ${
            animatePrice ? 'text-accent' : 'text-primary'
          }`}>
            {totalPrice.toLocaleString()} ₽
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Цена может измениться в зависимости от выбранных опций
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={onSave}
            variant="outline"
            className="px-6 py-3"
          >
            Сохранить конфигурацию
          </Button>
          <Button 
            onClick={handleAddToCart}
            className="btn-primary px-6 py-3"
          >
            Добавить в корзину
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfigPrice;
