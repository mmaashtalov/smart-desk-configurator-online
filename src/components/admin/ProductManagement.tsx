import React, { useState } from 'react';
import { initialProducts, Product } from '@/lib/productData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddProduct = () => {
    // Dummy add product functionality
    const newId = Math.max(...products.map(p => p.id)) + 1;
    const newProduct: Product = {
      id: newId,
      name: `Новый продукт ${newId}`,
      category: "new",
      price: 0,
      images: ["https://picsum.photos/200/200?random=" + newId],
      description: "Описание нового продукта.",
      features: [],
      inStock: true,
      isNew: true,
    };
    setProducts([...products, newProduct]);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
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

      {editingProduct && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="font-playfair text-2xl font-bold text-primary mb-4">Редактировать продукт</h3>
          <div className="space-y-4">
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
            <div className="flex gap-4">
              <Button onClick={() => handleSaveProduct(editingProduct)}>Сохранить</Button>
              <Button variant="outline" onClick={() => setEditingProduct(null)}>Отмена</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement; 