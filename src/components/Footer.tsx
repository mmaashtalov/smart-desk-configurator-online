import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useEventTracking } from '@/hooks/useAnalytics'

export function Footer() {
  const { trackClick } = useEventTracking()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/assets/logo-icon.svg" alt="Офис Интеллект" className="w-8 h-8" />
              <span className="text-xl font-playfair font-semibold">
                Офис Интеллект
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Премиальные умные столы из дубового шпона с электроприводом и масляным покрытием. 
              Эргономика, технологии и натуральные материалы для современного офиса.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-wood-secondary" />
                <a 
                  href="tel:+74951234567" 
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => trackClick('footer-phone')}
                >
                  +7 (495) 123-45-67
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-wood-secondary" />
                <a 
                  href="mailto:info@office-intellect.ru" 
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => trackClick('footer-email')}
                >
                  info@office-intellect.ru
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-wood-secondary" />
                <span className="text-gray-300">
                  Москва, ул. Примерная, д. 123
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => trackClick('footer-home')}
                >
                  Главная
                </Link>
              </li>
              <li>
                <Link 
                  to="/#products" 
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => trackClick('footer-products')}
                >
                  Продукция
                </Link>
              </li>
              <li>
                <Link 
                  to="/#about" 
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => trackClick('footer-about')}
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link 
                  to="/#contact" 
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => trackClick('footer-contact')}
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Услуги</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-300">Консультация</span>
              </li>
              <li>
                <span className="text-gray-300">Доставка</span>
              </li>
              <li>
                <span className="text-gray-300">Установка</span>
              </li>
              <li>
                <span className="text-gray-300">Гарантия</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Офис Интеллект. Все права защищены.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link 
              to="/privacy" 
              className="text-gray-400 hover:text-white text-sm transition-colors"
              onClick={() => trackClick('footer-privacy')}
            >
              Политика конфиденциальности
            </Link>
            <Link 
              to="/terms" 
              className="text-gray-400 hover:text-white text-sm transition-colors"
              onClick={() => trackClick('footer-terms')}
            >
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

