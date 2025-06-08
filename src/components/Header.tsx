
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart, Heart, User, Menu, X, Gem } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import SearchModal from './SearchModal';
import CartModal from './CartModal';
import AuthModal from './AuthModal';

const Header = () => {
  const navigate = useNavigate();
  const { cartCount, user, favorites } = useApp();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Главная', href: '/' },
    { label: 'Коллекция', href: '/catalog' },
    { label: 'Конфигуратор', href: '/configurator' },
    { label: 'Мастерская', href: '/about' },
    { label: 'Проекты', href: '/projects' },
    { label: 'Контакты', href: '/contacts' },
  ];

  return (
    <>
      <header className="bg-luxury-white/95 backdrop-blur-xl border-b border-luxury-platinum/20 sticky top-0 z-50 shadow-luxury">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-gold rounded-sm flex items-center justify-center shadow-gold transition-all duration-300 group-hover:scale-105">
                <Gem className="text-luxury-black h-5 w-5" />
              </div>
              <div className="hidden sm:block">
                <span className="font-playfair font-medium text-xl text-luxury-black tracking-tight">
                  Офис Интеллект
                </span>
                <div className="text-xs text-luxury-platinum tracking-widest uppercase">
                  Premium Tables
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-12">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="relative text-luxury-charcoal hover:text-luxury-black transition-colors duration-300 font-inter font-medium tracking-wide group"
                >
                  {item.label}
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="text-luxury-charcoal hover:text-luxury-black hover:bg-luxury-pearl/50 transition-all duration-300 w-12 h-12"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Favorites */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/favorites')}
                className="text-luxury-charcoal hover:text-luxury-black hover:bg-luxury-pearl/50 transition-all duration-300 relative w-12 h-12"
              >
                <Heart className="h-5 w-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-inter font-medium shadow-gold">
                    {favorites.length}
                  </span>
                )}
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="text-luxury-charcoal hover:text-luxury-black hover:bg-luxury-pearl/50 transition-all duration-300 relative w-12 h-12"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-inter font-medium shadow-gold">
                    {cartCount}
                  </span>
                )}
              </Button>

              {/* User Account */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsAuthOpen(true)}
                className="text-luxury-charcoal hover:text-luxury-black hover:bg-luxury-pearl/50 transition-all duration-300 w-12 h-12"
              >
                <User className="h-5 w-5" />
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-luxury-charcoal hover:text-luxury-black hover:bg-luxury-pearl/50 transition-all duration-300 w-12 h-12"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-luxury-platinum/20 py-6 luxury-fade-in">
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 text-luxury-charcoal hover:text-luxury-black hover:bg-luxury-pearl/30 rounded-lg transition-all duration-300 font-inter font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

export default Header;
