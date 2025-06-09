import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useEventTracking } from '@/hooks/useAnalytics';
import { useToast } from '@/components/ui/use-toast';

export function AdminDashboard() {
  const { user } = useAuth();
  const { trackClick } = useEventTracking();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCardClick = (path: string, cardName: string) => {
    trackClick(cardName);
    if (path) {
      navigate(path);
    } else {
      toast({
        title: 'В разработке',
        description: `Раздел "${cardName}" находится в стадии разработки.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-playfair font-bold text-gray-900">
            Панель управления
          </h1>
          <p className="text-gray-600 mt-2">
            Добро пожаловать, {user?.name || 'Администратор'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleCardClick('/admin/seo', 'SEO Настройки')}
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">SEO</span>
                </div>
                <span>SEO Настройки</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Управление мета-тегами, sitemap, robots.txt и структурированными данными
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleCardClick('', 'Аналитика')}
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-semibold">📊</span>
                </div>
                <span>Аналитика</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Просмотр статистики посещений, событий и поведения пользователей
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleCardClick('/admin/settings', 'Настройки')}
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-semibold">⚙️</span>
                </div>
                <span>Настройки</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Общие настройки сайта и системы управления
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Быстрые действия
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2"
              onClick={() => handleCardClick('/admin/seo', 'Настроить SEO')}
            >
              <span className="text-lg">🔍</span>
              <span>Настроить SEO</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2"
              onClick={() => handleCardClick('', 'Посмотреть статистику')}
            >
              <span className="text-lg">📈</span>
              <span>Посмотреть статистику</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2"
              onClick={() => handleCardClick('', 'Экспорт данных')}
            >
              <span className="text-lg">📥</span>
              <span>Экспорт данных</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2"
              onClick={() => handleCardClick('', 'Резервная копия')}
            >
              <span className="text-lg">💾</span>
              <span>Резервная копия</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

