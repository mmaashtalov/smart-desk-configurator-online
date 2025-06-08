
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Gem, Award, Star } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-luxury-black text-luxury-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-luxury-gold rounded-full" />
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-luxury-gold" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-8 lg:col-span-1">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-gold rounded-sm flex items-center justify-center shadow-gold">
                  <Gem className="text-luxury-black h-5 w-5" />
                </div>
                <div>
                  <span className="font-playfair font-medium text-xl tracking-tight">
                    Офис Интеллект
                  </span>
                  <div className="text-xs text-luxury-gold tracking-widest uppercase">
                    Premium Tables
                  </div>
                </div>
              </div>
              <p className="luxury-body text-luxury-white/80 leading-relaxed">
                Создаем исключительные умные столы для тех, кто ценит совершенство, мастерство и инновации.
              </p>
            </div>

            {/* Awards */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-luxury-gold" />
                <span className="text-sm text-luxury-white/70">Премия дизайна 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-luxury-gold fill-current" />
                <span className="text-sm text-luxury-white/70">Сертификат качества ISO</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-luxury-charcoal hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 rounded-lg flex items-center justify-center group">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-luxury-charcoal hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 rounded-lg flex items-center justify-center group">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-luxury-charcoal hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 rounded-lg flex items-center justify-center group">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h3 className="font-playfair text-xl font-medium text-luxury-white">Навигация</h3>
            <ul className="space-y-4">
              {[
                { label: 'Коллекция', href: '/catalog' },
                { label: 'Конфигуратор', href: '/configurator' },
                { label: 'Проекты', href: '/projects' },
                { label: 'Мастерская', href: '/about' },
                { label: 'Контакты', href: '/contacts' }
              ].map((item) => (
                <li key={item.href}>
                  <Link 
                    to={item.href} 
                    className="text-luxury-white/70 hover:text-luxury-gold transition-colors duration-300 font-inter relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-luxury-gold group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div className="space-y-6">
            <h3 className="font-playfair text-xl font-medium text-luxury-white">Коллекции</h3>
            <ul className="space-y-4">
              {[
                'Executive Collection',
                'Smart Office Series',
                'Luxury Workspace',
                'Innovation Line',
                'Bespoke Creations'
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-luxury-white/70 hover:text-luxury-gold transition-colors duration-300 font-inter relative group">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-luxury-gold group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="font-playfair text-xl font-medium text-luxury-white">Контакты</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-luxury-gold" />
                  <span className="text-luxury-white/80 font-inter">+7 (495) 123-45-67</span>
                </div>
                <div className="text-xs text-luxury-white/50 ml-7">Ежедневно 9:00 — 21:00</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-luxury-gold" />
                  <span className="text-luxury-white/80 font-inter">concierge@office-intellect.ru</span>
                </div>
                <div className="text-xs text-luxury-white/50 ml-7">VIP-консультации</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-luxury-gold mt-1" />
                  <div>
                    <span className="text-luxury-white/80 font-inter block">
                      Москва, Тверская улица, 15
                    </span>
                    <span className="text-luxury-white/80 font-inter block">
                      Флагманский шоурум 200 м²
                    </span>
                    <div className="text-xs text-luxury-white/50 mt-1">Только по записи</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-luxury-charcoal mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-luxury-white/60 font-inter text-sm">
              © 2024 Офис Интеллект. Все права защищены.
            </p>
            <div className="flex space-x-8 text-sm">
              <a href="#" className="text-luxury-white/60 hover:text-luxury-gold transition-colors duration-300">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-luxury-white/60 hover:text-luxury-gold transition-colors duration-300">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
