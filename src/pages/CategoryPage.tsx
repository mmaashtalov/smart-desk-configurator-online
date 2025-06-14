import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { CATEGORIES, PRODUCTS } from '@/data/catalog'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import { Button } from '@/components/ui/button'
import { CategoryTabs } from '@/components/catalog/CategoryTabs'

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>()

  const category = CATEGORIES.find((cat) => cat.id === categoryId)

  if (!category) {
    return <Layout><div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold">Категория не найдена</h1><p>Извините, запрашиваемая категория не существует.</p><Link to="/catalog"><Button className="mt-4">Вернуться в каталог</Button></Link></div></Layout>
  }

  const products = PRODUCTS.filter((product) => product.category === category.id)

  return (
    <Layout>
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-playfair text-center">
          {category.name}
        </h1>
        <p className="text-center text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          {category.description}
        </p>

        <CategoryTabs />

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">В этой категории пока нет товаров.</p>
            <Link to="/catalog"><Button className="mt-6">Вернуться ко всем категориям</Button></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg shadow-md overflow-hidden flex flex-col">
                <Link to={`/catalog/${category.id}/${product.id}`} className="block relative overflow-hidden group">
                  <ImageWithFallback
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.price && (
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      {product.price.toLocaleString('ru-RU')} ₽
                    </div>
                  )}
                  {product.rentPrice && (
                    <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      {product.rentPrice.toLocaleString('ru-RU')} ₽/мес
                    </div>
                  )}
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold mb-2 flex-grow">
                    <Link to={`/catalog/${category.id}/${product.id}`} className="hover:text-accent transition-colors duration-200">
                      {product.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
                  <div className="mt-auto">
                    <ul className="text-gray-700 text-sm mb-4 list-disc list-inside">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                      {product.features.length > 2 && <li className="text-gray-500">и другие...</li>}
                    </ul>
                    <Link to={`/catalog/${category.id}/${product.id}`}>
                      <Button variant="outline" className="w-full">Подробнее</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  )
}

export default CategoryPage 