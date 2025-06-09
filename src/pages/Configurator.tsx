import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import ConfigVisualization from '@/components/configurator/ConfigVisualization';
import ConfigForm from '@/components/configurator/ConfigForm';
import ConfigPrice from '@/components/configurator/ConfigPrice';
import ConfigModal from '@/components/configurator/ConfigModal';
import { ConfigurationState } from '@/types/configurator';

const Configurator = () => {
  const [config, setConfig] = useState<ConfigurationState>({
    width: 80,
    length: 160,
    material: 'oak',
    tableBase: 'lift',
    storage: 'none',
    options: {
      wireless: false,
      phoneHolder: false,
      usbHub: false,
      lighting: false,
      speakerphone: false,
      idLock: false,
      charger: false,
      audioSystem: false,
      wireShelf: false,
      voiceAssistant: false
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState('');

  // Auto-save configuration
  useEffect(() => {
    const autoSave = {
      ...config,
      timestamp: Date.now()
    };
    localStorage.setItem('tableConfigAutoSave', JSON.stringify(autoSave));
  }, [config]);

  // Load saved configuration on mount
  useEffect(() => {
    const saved = localStorage.getItem('tableConfigAutoSave');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Check if saved config is less than 24 hours old
        if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
          setConfig(parsed);
          setShowNotification('success');
          setTimeout(() => setShowNotification(''), 3000);
        }
      } catch (error) {
        console.log('Failed to load saved configuration');
      }
    }
  }, []);

  const updateConfig = (updates: Partial<ConfigurationState>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const handleSaveConfig = () => {
    setIsModalOpen(true);
  };

  const handleAddToCart = () => {
    // This functionality is now handled in ConfigPrice component
    console.log('Add to cart handled by ConfigPrice component');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-neutral pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-primary mb-4">
              Конфигуратор стола
            </h1>
            <p className="font-roboto text-gray-600 max-w-2xl mx-auto">
              Создайте свой идеальный умный стол. Выберите размеры, материалы и дополнительные опции
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Visualization */}
            <div className="order-1">
              <ConfigVisualization config={config} />
            </div>

            {/* Configuration Form */}
            <div className="order-2">
              <ConfigForm config={config} onConfigChange={updateConfig} />
            </div>
          </div>

          {/* Price and Actions */}
          <ConfigPrice 
            config={config} 
            onSave={handleSaveConfig}
            onAddToCart={handleAddToCart}
          />

          {/* Modal */}
          <ConfigModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            config={config}
          />

          {/* Notifications */}
          {showNotification && (
            <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
              showNotification === 'success' ? 'bg-green-500 text-white' :
              showNotification === 'error' ? 'bg-red-500 text-white' :
              showNotification === 'cart' ? 'bg-blue-500 text-white' : ''
            }`}>
              {showNotification === 'success' && 'Восстановлена предыдущая конфигурация'}
              {showNotification === 'error' && 'Пожалуйста, выберите все обязательные параметры'}
              {showNotification === 'cart' && 'Товар добавлен в корзину'}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Configurator;
