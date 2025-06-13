import React from 'react'
import { useSEOPage } from '@/hooks/useSEO'
import { useEventTracking } from '@/hooks/useAnalytics'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, CheckCircle, Star, Zap, Shield, Truck, Phone, Mail, MapPin } from 'lucide-react'

export function HomePage() {
  const { trackClick, trackFormSubmit } = useEventTracking()
  
  useSEOPage('/', {
    title: 'Офис Интеллект - Премиальные умные столы',
    description: 'Премиальные умные столы из дубового шпона с электроприводом и масляным покрытием. Эргономика, технологии и натуральные материалы.',
    keywords: ['умные столы', 'офисная мебель', 'эргономика', 'дубовый шпон', 'электропривод'],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Офис Интеллект",
      "description": "Премиальные умные столы из дубового шпона",
      "url": window.location.origin,
      "logo": `${window.location.origin}/logo.png`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+7-495-123-45-67",
        "contactType": "customer service"
      }
    }
  })

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    trackFormSubmit('contact-form', { source: 'homepage' })
    // Handle form submission
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-gray-900 leading-tight">
                  Премиальные{' '}
                  <span className="text-gradient-gold">умные столы</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Дубовый шпон с электроприводом и масляным покрытием. 
                  Эргономика, технологии и натуральные материалы в трёх тонах.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-wood-primary hover:bg-wood-secondary text-white"
                  onClick={() => trackClick('hero-cta-catalog')}
                >
                  Смотреть каталог
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => trackClick('hero-cta-consultation')}
                >
                  Получить консультацию
                </Button>
              </div>

              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">4.9/5 отзывов</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">500+</span> довольных клиентов
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-wood-primary to-wood-secondary rounded-2xl shadow-2xl">
                <div className="absolute inset-4 bg-white rounded-xl shadow-inner flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-wood-primary rounded-full mx-auto flex items-center justify-center">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-600 font-medium">Умный стол</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="products" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-gray-900 mb-4">
              Почему выбирают нас
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Мы создаем не просто мебель, а инновационные решения для современного офиса
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Электропривод',
                description: 'Плавная регулировка высоты одним нажатием кнопки'
              },
              {
                icon: Shield,
                title: 'Дубовый шпон',
                description: 'Натуральные материалы премиум качества'
              },
              {
                icon: CheckCircle,
                title: 'Масляное покрытие',
                description: 'Защита и естественная красота дерева'
              },
              {
                icon: Star,
                title: 'Три тона',
                description: 'Выберите идеальный оттенок для вашего интерьера'
              },
              {
                icon: Truck,
                title: 'Доставка и установка',
                description: 'Профессиональная доставка и сборка по всей России'
              },
              {
                icon: Shield,
                title: 'Гарантия 5 лет',
                description: 'Полная гарантия на все компоненты и механизмы'
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-wood-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-wood-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-gray-900">
                О компании Офис Интеллект
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Мы специализируемся на создании премиальной офисной мебели, 
                которая сочетает в себе традиционные материалы и современные технологии.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Наши умные столы изготавливаются из натурального дубового шпона 
                с использованием экологически чистых масляных покрытий. 
                Каждый стол оснащен надежным электроприводом для регулировки высоты.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-wood-primary">500+</div>
                  <div className="text-gray-600">Довольных клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-wood-primary">5</div>
                  <div className="text-gray-600">Лет гарантии</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-wood-primary to-wood-secondary rounded-2xl shadow-2xl">
                <div className="absolute inset-4 bg-white rounded-xl shadow-inner flex items-center justify-center">
                  <p className="text-gray-600 font-medium">Производство</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-gray-900 mb-4">
                Свяжитесь с нами
              </h2>
              <p className="text-xl text-gray-600">
                Получите персональную консультацию и расчет стоимости
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Контактная информация
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-wood-primary/10 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-wood-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Телефон</p>
                        <p className="text-gray-600">+7 (495) 123-45-67</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-wood-primary/10 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-wood-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-600">info@office-intellect.ru</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-wood-primary/10 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-wood-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Адрес</p>
                        <p className="text-gray-600">Москва, ул. Примерная, д. 123</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <form onSubmit={handleContactSubmit}>
                <Card>
                  <CardContent className="p-8 space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Имя
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-wood-primary focus:border-wood-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input 
                        type="email" 
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-wood-primary focus:border-wood-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Сообщение
                      </label>
                      <textarea 
                        id="message"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-wood-primary focus:border-wood-primary"
                      ></textarea>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-wood-primary hover:bg-wood-secondary text-white"
                    >
                      Отправить
                    </Button>
                  </CardContent>
                </Card>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 