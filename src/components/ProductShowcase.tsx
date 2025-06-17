import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { ProductImageSlider } from '@/components/ProductImageSlider';

const ProductShowcase = () => {
  const initialProducts = [
    {
      id: 6,
      name: "Smart Desk Primary R+",
      description: "Массив дуба / американского ореха с регулируемой высотой 60–125 см",
      price: "от 160 000 ₽",
      images: [
        "/images/Prymary R+/5370657970456752821.jpg",
        "/images/Prymary R+/5370657970456752820.jpg"
      ],
      features: [
        "Массив дуба / американского ореха/ палисандра",
        "Цвет по каталогу",
        "Регулируемая высота от 60 до 125 см",
        "Пенал для канцелярии",
        "Полка для проводов",
        "Органайзер",
        "Подставка под телефон",
        "Bluetooth аудиосистема",
        "Ящик с замком по отпечатку пальца",
        "USB Hub (USB 3.0 и USB-C)",
        "Беспроводная зарядка",
        "Разъёмы HDMI, USB, 220V",
        "Сетевой фильтр",
        "Натуральная кожа"
      ]
    },
    {
      id: 1,
      name: "Smart Desk Primary",
      description: "Массив дуба / американского ореха с регулируемой высотой 60–125 см",
      price: "от 120 000 ₽",
      images: [
        "/images/Primary/4.jpg.webp",
        "/images/Primary/10.jpg.webp",
        "/images/Primary/7.jpg.webp",
        "/images/Primary/5.jpg.webp",
      ],
      features: [
        "Массив дуба / американского ореха",
        "Цвет по каталогу",
        "Регулируемая высота от 60 до 125 см",
        "Пенал для канцелярии",
        "Полка для проводов",
        "Органайзер",
        "Подставка под телефон",
        "Bluetooth аудиосистема",
        "Ящик с замком по отпечатку пальца",
        "USB Hub (USB-A и USB-C)",
        "Беспроводная зарядка",
        "Разъёмы HDMI, USB, 220V",
        "Сетевой фильтр"
      ]
    },
    {
      id: 4,
      name: "Smart Desk Primary+",
      description: "Массив дуба / американского ореха с регулируемой высотой 60–125 см",
      price: "от 155 000 ₽",
      images: [
        "/images/Primary+/1.jpg.webp",
        "/images/Primary+/13.jpg.webp",
        "/images/Primary+/8.jpg.webp",
        "/images/Primary+/2.jpg.webp",
      ],
      features: [
        "Массив дуба / американского ореха",
        "Цвет по каталогу",
        "Регулируемая высота от 60 до 125 см",
        "Пенал для канцелярии",
        "Полка для проводов",
        "Органайзер",
        "Подставка под телефон",
        "Bluetooth аудиосистема",
        "Ящик с замком по отпечатку пальца",
        "USB Hub (USB-A и USB-C)",
        "Беспроводная зарядка",
        "Разъёмы HDMI, USB, 220V",
        "Сетевой фильтр"
      ]
    },
    {
      id: 2,
      name: "Smart Desk Medium",
      description: "Массив дуба или ореха с регулируемой высотой 60–125 см",
      price: "от 135 000 ₽",
      images: [
        "/images/Medium/2.jpg.webp",
        "/images/Medium/1.jpg.webp",
        "/images/Medium/3.jpg",
      ],
      features: [
        "Массив + шпон дуба или ореха",
        "Цвет по каталогу",
        "Регулируемая высота от 60 до 125 см",
        "Пенал для канцелярии",
        "Органайзер для проводов",
        "Сетевой фильтр с защитой от скачков напряжения",
        "Выдвижной ящик",
        "USB Hub (Разъёмы USB-A и USB-C)"
      ]
    },
    {
      id: 3,
      name: "Smart Desk Tab 3.0",
      description: "Массив дуба или ореха с регулировкой высоты 60–125 см",
      price: "от 140 000 ₽",
      images: [
        "/images/Tab 3/3.jpg",
        "/images/Tab 3/2.jpg.webp"
      ],
      features: [
        "Массив + шпон дуба или ореха",
        "Цвет по каталогу",
        "Регулируемая высота от 60 до 125 см",
        "Пенал для канцелярии",
        "Органайзер для проводов",
        "Сетевой фильтр с защитой от скачков напряжения",
        "Выдвижной ящик",
        "USB Hub (Разъёмы USB-A и USB-C)"
      ]
    },
    {
      id: 5,
      name: "Smart Desk Tab 4.0",
      description: "Массив дуба или ореха с регулируемой высотой 60–125 см и подстольем Z-типа",
      price: "от 150 000 ₽",
      images: [
        "/images/Tab 4/11.jpg",
        "/images/Tab 4/9.jpg",
        "/images/Tab 4/2.jpg.webp",
      ],
      features: [
        "Массив и шпон дуба или ореха",
        "Цвет по каталогу",
        "Подстолье Z-типа",
        "Пенал для канцелярии",
        "Органайзер для проводов",
        "Сетевой фильтр с защитой от скачков напряжения",
        "Выдвижной ящик",
        "USB Hub (Разъёмы USB-A и USB-C)"
      ]
    }
  ];

  const [products, setProducts] = useState(initialProducts);

  const handleAddImage = (productId: number, url: string) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, images: [...(p.images || []), url] } : p));
  };

  const handleDeleteImage = (productId: number, url: string) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, images: (p.images || []).filter(i => i !== url) } : p));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-primary mb-4">
            Популярные модели
          </h2>
          <p className="font-roboto text-lg text-gray-600 max-w-2xl mx-auto">
            Выберите готовое решение или создайте свой уникальный стол в конфигураторе
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.slice(0, 3).map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in flex flex-col h-full"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative w-full h-72 rounded-t-2xl">
                <ProductImageSlider
                  images={product.images}
                  productName={product.name}
                  onAddImage={(url) => handleAddImage(product.id, url)}
                  onDeleteImage={(url) => handleDeleteImage(product.id, url)}
                  className="absolute inset-0 z-10"
                />
                <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.price}
                </div>
              </div>

              <div className="p-6 flex flex-col h-full">
                <h3 className="font-playfair text-xl font-bold text-primary mb-2">
                  {product.name}
                </h3>
                <p className="font-roboto text-gray-600 mb-4">
                  {product.description}
                </p>

                <div className="space-y-2 mb-6 flex-1">
                  {product.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex space-x-2 mt-auto">
                  <Button className="flex-1 config-button">
                    Подробнее
                  </Button>
                  <Button className="add-to-cart">
                    В корзину
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/catalog">
            <Button size="lg" variant="outline" className="group">
              Смотреть весь каталог
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
