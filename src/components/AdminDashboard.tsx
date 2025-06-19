import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { ContentManagement } from './admin/ContentManagement';
import { ProductManagement } from './admin/ProductManagement';
import { GalleryManagement } from './admin/GalleryManagement';

export function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-playfair font-bold text-gray-900">
            Панель управления
          </h1>
          <p className="text-gray-600 mt-2">
            Добро пожаловать, {user?.email || 'Администратор'}
          </p>
        </div>

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Контент</TabsTrigger>
            <TabsTrigger value="products">Товары</TabsTrigger>
            <TabsTrigger value="gallery">Галерея</TabsTrigger>
          </TabsList>
          <TabsContent value="content">
            <ContentManagement />
          </TabsContent>
          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>
          <TabsContent value="gallery">
            <GalleryManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

