
import { useState } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Catalog = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');

  const products = [
    {
      id: 1,
      name: "Умный стол Arctic Premium",
      category: "table",
      price: 85000,
      originalPrice: 95000,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "Дубовый шпон в тоне Арктик с электроприводом и беспроводной зарядкой",
      features: ["Регулировка высоты 65-125 см", "Беспроводная зарядка Qi", "USB-хаб", "Память позиций"],
      inStock: true,
      isNew: true
    },
    {
      id: 2,
      name: "Тумба подкатная Sandal",
      category: "cabinet",
      price: 25000,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "Подкатная тумба из дубового шпона в тоне Сандал",
      features: ["3 выдвижных ящика", "Центральный замок", "Мягкий ход"],
      inStock: true,
      isNew: false
    },
    {
      id: 3,
      name: "Стеллаж модульный Wenge",
      category: "shelf",
      price: 45000,
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "Модульный стеллаж из дубового шпона в тоне Венге",
      features: ["Регулируемые полки", "Скрытые крепления", "Модульная система"],
      inStock: false,
      isNew: false
    },
    {
      id: 4,
      name: "Умный стол Sandal Executive",
      category: "table",
      price: 165000,
      image: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "Премиальный стол с полным набором опций",
      features: ["Биометрический замок", "Акустическая система", "Конференц-система", "Голосовой ассистент"],
      inStock: true,
      isNew: true
    },
    {
      id: 5,
      name: "Стеновая панель Arctic",
      category: "panel",
      price: 15000,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "Стеновая панель из дубового шпона с LED-подсветкой",
      features: ["Встроенная подсветка", "Текстурированная поверхность", "Звукоизоляция"],
      inStock: true,
      isNew: false
    },
    {
      id: 6,
      name: "Тумба интегрированная Wenge",
      category: "cabinet",
      price: 55000,
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "Интегрированная тумба размера M с дополнительными возможностями",
      features: ["Встроенный сейф", "Отделение для системного блока", "Кабель-менеджмент"],
      inStock: true,
      isNew: false
    }
  ];

  const categories = [
    { value: 'all', label: 'Все категории' },
    { value: 'table', label: 'Столы' },
    { value: 'cabinet', label: 'Тумбы' },
    { value: 'shelf', label: 'Стеллажи' },
    { value: 'panel', label: 'Стеновые панели' }
  ];

  const priceRanges = [
    { value: 'all', label: 'Любая цена' },
    { value: '0-50000', label: 'До 50 000 ₽' },
    { value: '50000-100000', label: '50 000 - 100 000 ₽' },
    { value: '100000-200000', label: '100 000 - 200 000 ₽' },
    { value: '200000+', label: 'От 200 000 ₽' }
  ];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    
    let priceMatch = true;
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
      if (max) {
        priceMatch = product.price >= parseInt(min) && product.price <= parseInt(max);
      } else {
        priceMatch = product.price >= parseInt(min);
      }
    }
    
    return categoryMatch && priceMatch;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-neutral pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-primary mb-4">
              Каталог продукции
            </h1>
            <p className="font-roboto text-gray-600">
              Выберите идеальное решение для вашего офиса
            </p>
          </div>

          {/* Filters and Controls */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Категория" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Цена" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="font-roboto text-gray-600">
              Найдено товаров: <span className="font-semibold">{filteredProducts.length}</span>
            </p>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-8 mb-12 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64 flex-shrink-0' : ''}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`object-cover transition-transform duration-300 hover:scale-105 ${
                      viewMode === 'list' ? 'w-full h-full' : 'w-full h-64'
                    }`}
                  />
                  {product.isNew && (
                    <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Новинка
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-semibold">Нет в наличии</span>
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1">
                  <h3 className="font-playfair text-xl font-bold text-primary mb-2">
                    {product.name}
                  </h3>
                  <p className="font-roboto text-gray-600 mb-4">
                    {product.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {product.features.slice(0, viewMode === 'list' ? 4 : 3).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="font-roboto text-2xl font-bold text-primary">
                        {product.price.toLocaleString()} ₽
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 text-gray-500 line-through">
                          {product.originalPrice.toLocaleString()} ₽
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={`flex gap-2 ${viewMode === 'list' ? 'flex-row' : 'flex-col sm:flex-row'}`}>
                    <Button className="flex-1 config-button" disabled={!product.inStock}>
                      Подробнее
                    </Button>
                    <Button className="add-to-cart" disabled={!product.inStock}>
                      В корзину
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="font-roboto text-gray-500 text-lg">
                По заданным фильтрам товары не найдены
              </p>
              <Button 
                className="mt-4" 
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange('all');
                }}
              >
                Сбросить фильтры
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;
