
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/04e60487-5280-4438-a1dc-95d891024624.png" 
                alt="Офис Интеллект" 
                className="w-8 h-8"
              />
              <span className="font-playfair font-bold text-lg">Офис Интеллект</span>
            </div>
            <p className="text-gray-300 text-sm">
              Премиальные умные столы из дубового шпона с электроприводом и масляным покрытием
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">VK</a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">Instagram</a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">YouTube</a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-roboto font-semibold text-lg">Навигация</h3>
            <ul className="space-y-2">
              <li><Link to="/catalog" className="text-gray-300 hover:text-accent transition-colors">Каталог</Link></li>
              <li><Link to="/configurator" className="text-gray-300 hover:text-accent transition-colors">Конфигуратор</Link></li>
              <li><Link to="/projects" className="text-gray-300 hover:text-accent transition-colors">Проекты</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-accent transition-colors">О компании</Link></li>
              <li><Link to="/contacts" className="text-gray-300 hover:text-accent transition-colors">Контакты</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="font-roboto font-semibold text-lg">Продукция</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-accent transition-colors">Умные столы</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent transition-colors">Тумбы</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent transition-colors">Стеллажи</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent transition-colors">Стеновые панели</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent transition-colors">Аксессуары</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-roboto font-semibold text-lg">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-gray-300">+7 (495) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-gray-300">info@office-intellect.ru</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-accent mt-1" />
                <span className="text-gray-300">
                  Москва, ул. Примерная, д. 1<br />
                  Шоурум 50 м²
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Офис Интеллект. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
