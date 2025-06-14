import React, { useState } from 'react';
import { initialProducts, Product } from '@/lib/productData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Edit, Trash2, XCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ImageFormModal } from '@/components/ui/ImageFormModal';
import { logger } from '@/services/logger.service';

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProductData, setNewProductData] = useState<Partial<Product>>({});
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageModalMode, setImageModalMode] = useState<'add' | 'delete'>('add');
  const [currentImageForModal, setCurrentImageForModal] = useState<string | undefined>(undefined);
  const [currentProductForImageModal, setCurrentProductForImageModal] = useState<Product | null>(null);

  const handleAddProduct = () => {
    setNewProductData({
      name: '',
      category: '',
      price: 0,
      images: ['https://picsum.photos/200/200?random=' + Date.now()],
      description: '',
      features: [],
      inStock: true,
      isNew: true,
    });
    setIsAddModalOpen(true);
    logger.info('Attempting to add a new product');
  };

  const handleSaveNewProduct = () => {
    if (newProductData.name && newProductData.category && newProductData.price !== undefined) {
      const newId = Math.max(...products.map(p => p.id)) + 1;
      const productToAdd: Product = {
        id: newId,
        name: newProductData.name,
        category: newProductData.category,
        price: newProductData.price,
        images: newProductData.images || ['https://picsum.photos/200/200?random=' + newId],
        description: newProductData.description || '',
        features: newProductData.features || [],
        inStock: newProductData.inStock !== undefined ? newProductData.inStock : true,
        isNew: newProductData.isNew !== undefined ? newProductData.isNew : true,
      };
      setProducts([...products, productToAdd]);
      setIsAddModalOpen(false);
      setNewProductData({});
      logger.info('New product saved successfully', { productId: newId, productName: productToAdd.name });
    } else {
      logger.warn('Failed to save new product: missing required fields', { newProductData });
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    logger.info('Product updated successfully', { productId: updatedProduct.id, productName: updatedProduct.name });
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    logger.info('Product deleted successfully', { productId: id });
  };

  const handleImageAddClick = (product: Product) => {
    setCurrentProductForImageModal(product);
    setImageModalMode('add');
    setIsImageModalOpen(true);
    logger.info('Attempting to add image for product', { productId: product.id, productName: product.name });
  };

  const handleImageDeleteClick = (product: Product, imageUrl: string) => {
    setCurrentProductForImageModal(product);
    setCurrentImageForModal(imageUrl);
    setImageModalMode('delete');
    setIsImageModalOpen(true);
    logger.info('Attempting to delete image from product', { productId: product.id, productName: product.name, imageUrl });
  };

  const handleImageModalConfirm = (imageUrl?: string) => {
    if (currentProductForImageModal && imageModalMode === 'add' && imageUrl) {
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === currentProductForImageModal.id
            ? { ...p, images: [...p.images, imageUrl] }
            : p
        )
      );
      logger.info('Image added successfully', { productId: currentProductForImageModal.id, imageUrl });
    } else if (currentProductForImageModal && imageModalMode === 'delete' && currentImageForModal) {
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === currentProductForImageModal.id
            ? { ...p, images: p.images.filter(img => img !== currentImageForModal) }
            : p
        )
      );
      logger.info('Image deleted successfully', { productId: currentProductForImageModal.id, imageUrl: currentImageForModal });
    }
    setIsImageModalOpen(false);
    setCurrentImageForModal(undefined);
    setCurrentProductForImageModal(null);
  };

  const handleImageModalClose = () => {
    setIsImageModalOpen(false);
    setCurrentImageForModal(undefined);
    setCurrentProductForImageModal(null);
    logger.info('Image modal closed');
  };

  return (
    <div className="mt-8">
      <h2 className="font-playfair text-3xl font-bold text-primary mb-6">
        Управление продуктами
      </h2>
      <Button onClick={handleAddProduct} className="mb-6">
        <PlusCircle className="w-4 h-4 mr-2" /> Добавить новый продукт
      </Button>

      <div className="bg-white rounded-lg shadow-md p-6">
        {products.map(product => (
          <div key={product.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
            <div className="flex items-center gap-4">
              <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.category} - {product.price.toLocaleString()} ₽</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => handleEditProduct(product)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="destructive" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Добавить новый продукт</DialogTitle>
            <DialogDescription>Заполните детали для нового продукта.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Название продукта</label>
              <Input
                type="text"
                value={newProductData.name || ''}
                onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Категория</label>
              <Input
                type="text"
                value={newProductData.category || ''}
                onChange={(e) => setNewProductData({ ...newProductData, category: e.target.value })}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Цена</label>
              <Input
                type="number"
                value={newProductData.price || 0}
                onChange={(e) => setNewProductData({ ...newProductData, price: parseFloat(e.target.value) })}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Описание</label>
              <textarea
                value={newProductData.description || ''}
                onChange={(e) => setNewProductData({ ...newProductData, description: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Изображения</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {newProductData.images?.map((img, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <img src={img} alt="Product" className="w-full h-full object-cover rounded-md" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={() => setNewProductData(prev => ({
                        ...prev,
                        images: prev.images?.filter((_, i) => i !== index),
                      }))}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button size="sm" onClick={() => {
                setCurrentProductForImageModal({ ...newProductData, id: -1 } as Product); // Use a dummy ID for new product
                setImageModalMode('add');
                setIsImageModalOpen(true);
              }}>
                <PlusCircle className="w-4 h-4 mr-2" /> Добавить изображение
              </Button>
            </div>
            {/* Add other fields as needed */}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Отмена</Button>
            <Button onClick={handleSaveNewProduct}>Сохранить продукт</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Modal */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Редактировать продукт</DialogTitle>
            <DialogDescription>Измените детали продукта.</DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Название продукта</label>
                <Input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Категория</label>
                <Input
                  type="text"
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Цена</label>
                <Input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Описание</label>
                <textarea
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Особенности (через запятую)</label>
                <textarea
                  value={editingProduct.features.join(', ' ) || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, features: e.target.value.split(',').map(f => f.trim()) })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={editingProduct.inStock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                  className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                />
                <label htmlFor="inStock" className="text-sm font-medium text-gray-700">В наличии</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isNew"
                  checked={editingProduct.isNew}
                  onChange={(e) => setEditingProduct({ ...editingProduct, isNew: e.target.checked })}
                  className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                />
                <label htmlFor="isNew" className="text-sm font-medium text-gray-700">Новинка</label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Изображения</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editingProduct.images?.map((img, index) => (
                    <div key={index} className="relative w-24 h-24">
                      <img src={img} alt="Product" className="w-full h-full object-cover rounded-md" />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        onClick={() => setEditingProduct(prev => prev ? ({
                          ...prev,
                          images: prev.images?.filter((_, i) => i !== index) || [],
                        }) : null)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button size="sm" onClick={() => {
                  setCurrentProductForImageModal(editingProduct);
                  setImageModalMode('add');
                  setIsImageModalOpen(true);
                }}>
                  <PlusCircle className="w-4 h-4 mr-2" /> Добавить изображение
                </Button>
              </div>
              {/* Add other fields as needed */}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingProduct(null)}>Отмена</Button>
            <Button onClick={() => editingProduct && handleSaveProduct(editingProduct)}>Сохранить изменения</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ImageFormModal
        isOpen={isImageModalOpen}
        onClose={handleImageModalClose}
        onConfirm={handleImageModalConfirm}
        mode={imageModalMode}
        currentImageUrl={currentImageForModal}
      />
    </div>
  );
};

export default ProductManagement; 