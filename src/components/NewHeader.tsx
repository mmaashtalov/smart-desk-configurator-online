import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Settings, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useEventTracking } from '@/hooks/useAnalytics'

export function NewHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const { trackClick } = useEventTracking()
  const navigate = useNavigate()

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
    trackClick('mobile-menu-toggle')
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    trackClick('logout')
  }

  const handleAdminClick = () => {
    trackClick('admin-panel-access')
  }

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={() => trackClick('logo')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-wood-primary to-wood-secondary rounded-lg"></div>
            <span className="hidden sm:inline text-xl font-playfair font-semibold text-gray-900">
              Офис Интеллект
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => trackClick('nav-home')}
            >
              Главная
            </Link>
            <Link 
              to="/catalog" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => trackClick('nav-catalog')}
            >
              Каталог
            </Link>
            <Link 
              to="/configurator" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => trackClick('nav-configurator')}
            >
              Конфигуратор
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => trackClick('nav-about')}
            >
              О нас
            </Link>
            <Link 
              to="/projects" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => trackClick('nav-projects')}
            >
              Проекты
            </Link>
            <Link 
              to="/contacts" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => trackClick('nav-contact')}
            >
              Контакты
            </Link>
            
            {isAuthenticated && user?.role === 'admin' && (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/admin" 
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={handleAdminClick}
                >
                  <Settings className="w-4 h-4" />
                  <span>Админ</span>
                </Link>
                <Link 
                  to="/admin/analytics" 
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => trackClick('analytics-access')}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Аналитика</span>
                </Link>
              </div>
            )}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Привет, {user?.name}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                >
                  Выйти
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  navigate('/admin')
                  trackClick('login-button')
                }}
              >
                Войти
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            onClick={handleMenuToggle}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => {
                  setIsMenuOpen(false)
                  trackClick('mobile-nav-home')
                }}
              >
                Главная
              </Link>
              <Link 
                to="/catalog" 
                className="text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => {
                  setIsMenuOpen(false)
                  trackClick('mobile-nav-catalog')
                }}
              >
                Каталог
              </Link>
              <Link 
                to="/configurator" 
                className="text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => {
                  setIsMenuOpen(false)
                  trackClick('mobile-nav-configurator')
                }}
              >
                Конфигуратор
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => {
                  setIsMenuOpen(false)
                  trackClick('mobile-nav-about')
                }}
              >
                О нас
              </Link>
              <Link 
                to="/projects" 
                className="text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => {
                  setIsMenuOpen(false)
                  trackClick('mobile-nav-projects')
                }}
              >
                Проекты
              </Link>
              <Link 
                to="/contacts" 
                className="text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => {
                  setIsMenuOpen(false)
                  trackClick('mobile-nav-contact')
                }}
              >
                Контакты
              </Link>
              
              {isAuthenticated && user?.role === 'admin' && (
                <>
                  <Link 
                    to="/admin" 
                    className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false)
                      handleAdminClick()
                    }}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Админ панель</span>
                  </Link>
                  <Link 
                    to="/admin/analytics" 
                    className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false)
                      trackClick('mobile-analytics-access')
                    }}
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Аналитика</span>
                  </Link>
                </>
              )}
              
              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Привет, {user?.name}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setIsMenuOpen(false)
                        handleLogout()
                      }}
                      className="w-full"
                    >
                      Выйти
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setIsMenuOpen(false)
                      navigate('/admin')
                      trackClick('mobile-login-button')
                    }}
                    className="w-full"
                  >
                    Войти
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 