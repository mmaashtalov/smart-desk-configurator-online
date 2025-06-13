import { useApp } from '@/contexts/AppContext';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';

const Favorites = () => {
  const { favorites, removeFromFavorites, addToCart } = useApp();

  // Mock favorite items - in real app this would fetch from API based on favorites IDs
  const favoriteItems = [
    { id: '1', name: 'Умный стол Classic', price: 85000, image: '/api/placeholder/300/200' },
    { id: '2', name: 'Стол с подъемным механизмом', price: 140000, image: '/api/placeholder/300/200' },
  ].filter(item => favorites.includes(item.id));

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-neutral pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-primary mb-4">
              Избранное
            </h1>
            <p className="font-roboto text-gray-600">
              Ваши сохраненные товары ({favorites.length})
            </p>
          </div>

          {favoriteItems.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Пока нет избранных товаров
              </h3>
              <p className="text-gray-500 mb-6">
                Добавляйте понравившиеся товары в избранное для быстрого доступа
              </p>
              <Button className="btn-primary" onClick={() => window.location.href = '/catalog'}>
                Перейти в каталог
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteItems.map((item) => (
                <div key={item.id} className="product-card">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full aspect-video h-auto object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromFavorites(item.id)}
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-700"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-playfair text-xl font-semibold mb-2">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {item.price.toLocaleString()} ₽
                      </span>
                      <Button
                        onClick={() => handleAddToCart(item)}
                        className="btn-primary flex items-center gap-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        В корзину
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Favorites;
