import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { initialProducts, Product } from '@/lib/productData'; // Import Product interface and initialProducts
import { ProductImageSlider } from '@/components/ProductImageSlider'; // Assuming you want a slider on the detail page

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const product = initialProducts.find(p => p.id === parseInt(id || '0'));

  if (!product) {
    return <Layout><div className="text-center py-10">Product not found.</div></Layout>;
  }

  // Dummy functions for image management on detail page - can be expanded later
  const handleAddImage = (imageUrl: string) => {
    console.log(`Add image ${imageUrl} to product ${product.name}`);
    // In a real app, you'd update state or send to backend
  };

  const handleDeleteImage = (imageUrl: string) => {
    console.log(`Delete image ${imageUrl} from product ${product.name}`);
    // In a real app, you'd update state or send to backend
  };

  return (
    <Layout>
      <div className="min-h-screen bg-neutral pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image Slider */}
            <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
              <ProductImageSlider
                images={product.images}
                productName={product.name}
                onAddImage={handleAddImage}
                onDeleteImage={handleDeleteImage}
                className="absolute inset-0"
              />
            </div>

            {/* Product Details */}
            <div>
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-4">
                {product.name}
              </h1>
              <p className="font-roboto text-gray-700 text-lg mb-4">
                {product.description}
              </p>
              <p className="font-roboto text-2xl font-semibold text-accent mb-8">
                Цена: {product.price.toLocaleString()} ₽
                {product.originalPrice && (
                  <span className="ml-3 text-gray-500 line-through text-xl">
                    {product.originalPrice.toLocaleString()} ₽
                  </span>
                )}
              </p>

              <h2 className="font-playfair text-2xl font-bold text-primary mb-3">Особенности:</h2>
              <ul className="list-disc list-inside font-roboto text-gray-700 mb-8">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <div className="flex items-center gap-4">
                <span className={`font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'В наличии' : 'Нет в наличии'}
                </span>
                {product.isNew && (
                  <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">Новинка</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail; 