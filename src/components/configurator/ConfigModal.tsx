
import { ConfigurationState } from '@/types/configurator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Share2, Download, Printer, QrCode } from 'lucide-react';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ConfigurationState;
}

const ConfigModal = ({ isOpen, onClose, config }: ConfigModalProps) => {
  const calculatePrice = () => {
    let basePrice = 85000;

    if (config.material === 'walnut') basePrice += 60000;
    if (config.material === 'rosewood') basePrice += 80000;

    if (config.tableBase === 'lift') basePrice += 55000;
    if (config.tableBase === 'liftClosed') basePrice += 85000;
    if (config.tableBase === 'staticP') basePrice += 20000;
    if (config.tableBase === 'staticZ') basePrice += 45000;

    if (config.storage === 'hanging' || config.storage === 'mobile') basePrice += 25000;
    if (config.storage === 'integratedS') basePrice += 55000;
    if (config.storage === 'integratedM') basePrice += 85000;

    Object.entries(config.options).forEach(([key, selected]) => {
      if (!selected) return;
      const prices: Record<string, number> = {
        wireless: 15000,
        phoneHolder: 5000,
        usbHub: 12000,
        lighting: 20000,
        speakerphone: 30000,
        idLock: 8000,
        charger: 10000,
        audioSystem: 35000,
        wireShelf: 8000,
        voiceAssistant: 25000
      };
      basePrice += prices[key] || 0;
    });

    return basePrice;
  };

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

  const selectedOptions = Object.entries(config.options)
    .filter(([_, selected]) => selected)
    .map(([key, _]) => {
      const labels: Record<string, string> = {
        wireless: 'Беспроводная зарядка',
        phoneHolder: 'Подставка для телефона',
        usbHub: 'USB-хаб',
        lighting: 'Подсветка',
        speakerphone: 'Конференц-система',
        idLock: 'Биометрический замок',
        charger: 'ИБП',
        audioSystem: 'Акустическая система',
        wireShelf: 'Проводная полка',
        voiceAssistant: 'Голосовой ассистент'
      };
      return labels[key];
    });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Моя конфигурация стола',
        text: `Конфигурация стола: ${getMaterialLabel(config.material)}, ${config.width}×${config.length} см`,
        url: window.location.href
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // This would integrate with jsPDF library
    console.log('Downloading PDF...');
  };

  const handleQRCode = () => {
    // This would generate QR code
    console.log('Generating QR code...');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl text-primary">
            Спецификация стола
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Configuration Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">Размеры:</span>
              <div className="font-semibold">{config.width} × {config.length} см</div>
            </div>
            <div>
              <span className="font-medium text-gray-600">Материал:</span>
              <div className="font-semibold">{getMaterialLabel(config.material)}</div>
            </div>
            <div>
              <span className="font-medium text-gray-600">Подстолье:</span>
              <div className="font-semibold">{getBaseLabel(config.tableBase)}</div>
            </div>
            <div>
              <span className="font-medium text-gray-600">Хранение:</span>
              <div className="font-semibold">{getStorageLabel(config.storage)}</div>
            </div>
          </div>

          {/* Selected Options */}
          {selectedOptions.length > 0 && (
            <div>
              <span className="font-medium text-gray-600 block mb-2">Дополнительные опции:</span>
              <div className="flex flex-wrap gap-2">
                {selectedOptions.map((option, index) => (
                  <span key={index} className="bg-accent/10 text-accent text-sm px-3 py-1 rounded-full">
                    {option}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="border-t pt-4">
            <div className="text-right">
              <span className="text-gray-600">Итоговая стоимость:</span>
              <div className="font-playfair text-3xl font-bold text-primary">
                {calculatePrice().toLocaleString()} ₽
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-4 border-t">
            <Button onClick={handleShare} variant="outline" size="sm" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Поделиться
            </Button>
            <Button onClick={handleDownloadPDF} variant="outline" size="sm" className="hidden md:flex items-center gap-2">
              <Download className="h-4 w-4" />
              Скачать PDF
            </Button>
            <Button onClick={handlePrint} variant="outline" size="sm" className="hidden md:flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Распечатать
            </Button>
            <Button onClick={handleQRCode} variant="outline" size="sm" className="hidden md:flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              QR-код
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigModal;
