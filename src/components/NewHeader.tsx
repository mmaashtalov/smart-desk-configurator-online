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
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="8" fill="#1a1a1a"></rect>
                  <path d="M16.216 23.5v-5.22c0-1.07.31-1.9.94-2.48.63-.58 1.48-.87 2.55-.87.96 0 1.77.25 2.42.76.65.5 1.12 1.25 1.42 2.24h3.04c-.33-1.63-.95-3-1.87-4.1-.92-1.1-2.06-1.9-3.42-2.38v-2.1h-2.6v2.1c-1.6.3-2.9.98-3.9 2.04-1.01 1.05-1.51 2.4-1.51 4.05v6.56h2.95zM12.716 8.5v5.22c0 1.07-.31 1.9-.94 2.48-.63-.58-1.48-.87-2.55-.87-.96 0-1.77-.25-2.42-.76-.65-.5-1.12 1.25-1.42 2.24H2.346c.33-1.63.95-3 1.87-4.1.92-1.1 2.06-1.9 3.42-2.38v-2.1h2.6v2.1c1.6.3 2.9.98 3.9 2.04 1.01 1.05 1.51 2.4 1.51 4.05v-6.56h-2.95z" fill="#fff"></path>
              </svg>
              <span className="font-bold text-lg text-gray-800">Офис Интеллект</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => trackClick('nav-home')}>Главная</Link>
            <Link to="/configurator" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => trackClick('nav-configurator')}>Конфигуратор</Link>
            <Link to="/gallery" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => trackClick('nav-gallery')}>Галерея</Link>
            <Link to="/marketplace" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => trackClick('nav-marketplace')}>Биржа</Link>
            <Link to="/blog" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => trackClick('nav-blog')}>Блог</Link>
            <Link to="/contacts" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => trackClick('nav-contacts')}>Контакты</Link>
          </nav>

          {/* Auth and Admin Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                {user?.roles?.includes('admin') && (
                  <Link to="/admin/panel" onClick={handleAdminClick}>
                    <Button variant="ghost" size="icon"><Settings className="h-5 w-5" /></Button>
                  </Link>
                )}
                 <Link to="/analytics-dashboard">
                   <Button variant="ghost" size="icon"><BarChart3 className="h-5 w-5" /></Button>
                 </Link>
                <Button onClick={handleLogout} variant="outline">Выйти</Button>
              </>
            ) : (
              <Link to="/login">
                <Button>Войти</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button onClick={handleMenuToggle} variant="ghost" size="icon">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" onClick={handleMenuToggle}>Главная</Link>
            <Link to="/configurator" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" onClick={handleMenuToggle}>Конфигуратор</Link>
            <Link to="/gallery" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" onClick={handleMenuToggle}>Галерея</Link>
            <Link to="/marketplace" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" onClick={handleMenuToggle}>Биржа</Link>
            <Link to="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" onClick={handleMenuToggle}>Блог</Link>
            <Link to="/contacts" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" onClick={handleMenuToggle}>Контакты</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="px-5">
                <div className="flex items-center space-x-2 mb-2">
                  {user?.roles?.includes('admin') && (
                    <Link to="/admin/panel" className="flex-1" onClick={handleAdminClick}>
                       <Button variant="ghost" className="w-full justify-start"><Settings className="h-5 w-5 mr-2" /> Админ</Button>
                    </Link>
                  )}
                  <Link to="/analytics-dashboard" className="flex-1">
                     <Button variant="ghost" className="w-full justify-start"><BarChart3 className="h-5 w-5 mr-2" /> Аналитика</Button>
                   </Link>
                </div>
                <Button onClick={handleLogout} variant="outline" className="w-full">Выйти</Button>
              </div>
            ) : (
              <div className="px-5">
                <Link to="/login" className="block w-full">
                  <Button className="w-full">Войти</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}