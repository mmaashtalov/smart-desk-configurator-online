import { ConfigurationState, MaterialOption, BaseOption, StorageOption, AdditionalOption } from '@/types/configurator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';

interface ConfigFormProps {
  config: ConfigurationState;
  onConfigChange: (updates: Partial<ConfigurationState>) => void;
}

const ConfigForm = ({ config, onConfigChange }: ConfigFormProps) => {
  const { setCurrentConfiguration, setIsOpen } = useChat();

  const handleHelpClick = (topic: string) => {
    setCurrentConfiguration({ ...config, helpTopic: topic });
    setIsOpen(true);
  };

  const materials: MaterialOption[] = [
    {
      value: 'oak',
      label: 'Дуб',
      description: 'классический выбор для руководителя',
      price: 0
    },
    {
      value: 'walnut',
      label: 'Американский орех',
      description: 'премиум качество',
      price: 60000
    },
    {
      value: 'rosewood',
      label: 'Палисандр',
      description: 'эксклюзив',
      price: 80000
    }
  ];

  const bases: BaseOption[] = [
    {
      value: 'lift',
      label: 'Подъёмное',
      description: 'регулировка высоты',
      price: 55000
    },
    {
      value: 'liftClosed',
      label: 'Подъёмное закрытое',
      description: 'с панелями',
      price: 85000
    },
    {
      value: 'staticP',
      label: 'Статичное "П"',
      description: 'надёжность',
      price: 20000
    },
    {
      value: 'staticZ',
      label: 'Статичное "Z"',
      description: 'современный дизайн',
      price: 45000
    }
  ];

  const storageOptions: StorageOption[] = [
    {
      value: 'none',
      label: 'Без тумбы',
      description: '',
      price: 0
    },
    {
      value: 'hanging',
      label: 'Подвесная',
      description: 'экономия места',
      price: 25000
    },
    {
      value: 'mobile',
      label: 'Подкатная',
      description: 'мобильность',
      price: 25000
    },
    {
      value: 'integratedS',
      label: 'Интегрированная S',
      description: 'компактное хранение',
      price: 55000
    },
    {
      value: 'integratedM',
      label: 'Интегрированная M',
      description: 'максимальное хранение',
      price: 85000
    }
  ];

  const additionalOptions: AdditionalOption[] = [
    {
      key: 'wireless',
      label: 'Беспроводная зарядка',
      description: '+15 000 ₽',
      price: 15000,
      tooltip: 'Встроенная беспроводная зарядка Qi'
    },
    {
      key: 'phoneHolder',
      label: 'Подставка для телефона',
      description: '+5 000 ₽',
      price: 5000,
      tooltip: 'Фиксирует смартфон на уровне глаз'
    },
    {
      key: 'usbHub',
      label: 'USB-хаб',
      description: '+12 000 ₽',
      price: 12000,
      tooltip: 'Дополнительные USB-разъёмы по бокам столешницы'
    },
    {
      key: 'lighting',
      label: 'Подсветка',
      description: '+20 000 ₽',
      price: 20000,
      tooltip: 'Регулируемая LED-подсветка по задней кромке'
    },
    {
      key: 'speakerphone',
      label: 'Встроенная конференц-система',
      description: '+30 000 ₽',
      price: 30000,
      tooltip: 'Микрофон и динамики с шумоподавлением для Zoom/Teams'
    },
    {
      key: 'idLock',
      label: 'Биометрический замок',
      description: '+8 000 ₽',
      price: 8000,
      tooltip: 'Считыватель отпечатков пальцев для сейфовой секции'
    },
    {
      key: 'charger',
      label: 'Зарядный блок бесперебойного питания',
      description: '+10 000 ₽',
      price: 10000,
      tooltip: 'Встроенный ИБП 500 VA для защиты электроники'
    },
    {
      key: 'audioSystem',
      label: 'Акустическая система',
      description: '+35 000 ₽',
      price: 35000,
      tooltip: 'Накладные динамики высокого качества'
    },
    {
      key: 'wireShelf',
      label: 'Проводная полка',
      description: '+8 000 ₽',
      price: 8000,
      tooltip: 'Дополнительная полка с кабель-менеджментом'
    },
    {
      key: 'voiceAssistant',
      label: 'Голосовой ассистент',
      description: '+25 000 ₽',
      price: 25000,
      tooltip: 'Интеграция с Alexa/Google Home для управления столом'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="font-playfair text-xl font-bold text-primary mb-6">
          Настройка стола
        </h3>

        <form className="space-y-6">
          {/* Dimensions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-roboto font-semibold text-primary">Размеры стола</h4>
              <Button variant="ghost" size="icon" onClick={() => handleHelpClick('dimensions')}>
                <HelpCircle className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ширина: <span className="font-bold">{config.width} см</span>
              </label>
              <Slider
                value={[config.width]}
                onValueChange={(value) => onConfigChange({ width: value[0] })}
                min={45}
                max={120}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Длина: <span className="font-bold">{config.length} см</span>
              </label>
              <Slider
                value={[config.length]}
                onValueChange={(value) => onConfigChange({ length: value[0] })}
                min={90}
                max={250}
                step={10}
                className="w-full"
              />
            </div>
          </div>

          {/* Material */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Материал
              </label>
              <Button variant="ghost" size="icon" onClick={() => handleHelpClick('material')}>
                <HelpCircle className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
            <Select value={config.material} onValueChange={(value) => onConfigChange({ material: value as any })}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите материал" />
              </SelectTrigger>
              <SelectContent>
                {materials.map((material) => (
                  <SelectItem key={material.value} value={material.value}>
                    <div className="flex justify-between items-center w-full">
                      <span>{material.label}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        {material.description}
                        {material.price > 0 && ` (+${material.price.toLocaleString()} ₽)`}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Table Base */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Подстолье
              </label>
              <Button variant="ghost" size="icon" onClick={() => handleHelpClick('tableBase')}>
                <HelpCircle className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
            <Select value={config.tableBase} onValueChange={(value) => onConfigChange({ tableBase: value as any })}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите подстолье" />
              </SelectTrigger>
              <SelectContent>
                {bases.map((base) => (
                  <SelectItem key={base.value} value={base.value}>
                    <div className="flex justify-between items-center w-full">
                      <span>{base.label}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        {base.description} (+{base.price.toLocaleString()} ₽)
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Storage */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Система хранения
              </label>
              <Button variant="ghost" size="icon" onClick={() => handleHelpClick('storage')}>
                <HelpCircle className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
            <Select value={config.storage} onValueChange={(value) => onConfigChange({ storage: value as any })}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите систему хранения" />
              </SelectTrigger>
              <SelectContent>
                {storageOptions.map((storage) => (
                  <SelectItem key={storage.value} value={storage.value}>
                    <div className="flex justify-between items-center w-full">
                      <span>{storage.label}</span>
                      {storage.price > 0 && (
                        <span className="text-sm text-gray-500 ml-2">
                          {storage.description} (+{storage.price.toLocaleString()} ₽)
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Additional Options */}
          <div>
            <div className="flex items-center justify-between">
              <h4 className="font-roboto font-semibold text-primary mb-4">Дополнительные опции</h4>
              <Button variant="ghost" size="icon" onClick={() => handleHelpClick('options')}>
                <HelpCircle className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
            <div className="relative h-88">
              <div className="h-full overflow-y-auto pr-2 space-y-3">
                <TooltipProvider>
                  {additionalOptions.map((option) => (
                    <div key={option.key} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <Checkbox
                        id={option.key}
                        checked={config.options[option.key]}
                        onCheckedChange={(checked) =>
                          onConfigChange({
                            options: {
                              ...config.options,
                              [option.key]: checked as boolean
                            }
                          })
                        }
                      />
                      <div className="flex-1">
                        <label htmlFor={option.key} className="text-sm font-medium text-gray-700 cursor-pointer">
                          {option.label}
                        </label>
                        <div className="text-sm text-gray-500">{option.description}</div>
                      </div>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{option.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  ))}
                </TooltipProvider>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfigForm;
