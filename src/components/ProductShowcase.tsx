import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { ProductImageSlider } from '@/components/ProductImageSlider';

const ProductShowcase = () => {
  const initialProducts = [
    {
      id: 1,
      name: "Умный стол Arctic",
      description: "Дубовый шпон в тоне Арктик с электроприводом",
      price: "от 85 000 ₽",
      images: [
        "https://picsum.photos/600/400?random=1",
        "https://picsum.photos/600/400?random=2",
        "https://picsum.photos/600/400?random=3",
      ],
      features: ["Регулировка высоты", "Беспроводная зарядка", "USB-хаб"]
    },
    {
      id: 2,
      name: "Умный стол Sandal",
      description: "Дубовый шпон в тоне Сандал с интегрированной тумбой",
      price: "от 145 000 ₽",
      images: [
        "https://picsum.photos/600/400?random=4",
        "https://picsum.photos/600/400?random=5",
        "https://picsum.photos/600/400?random=6",
      ],
      features: ["Интегрированная тумба", "Подсветка", "Акустическая система"]
    },
    {
      id: 3,
      name: "Умный стол Wenge",
      description: "Дубовый шпон в тоне Венге с полным набором опций",
      price: "от 165 000 ₽",
      images: [
        "https://picsum.photos/600/400?random=7",
        "https://picsum.photos/600/400?random=8",
        "https://picsum.photos/600/400?random=9",
      ],
      features: ["Биометрический замок", "Голосовой ассистент", "Конференц-система"]
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
          {products.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in"
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

              <div className="p-6">
                <h3 className="font-playfair text-xl font-bold text-primary mb-2">
                  {product.name}
                </h3>
                <p className="font-roboto text-gray-600 mb-4">
                  {product.description}
                </p>

                <div className="space-y-2 mb-6">
                  {product.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex space-x-2">
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
