import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppContextType, CartItem, User } from '@/types/app';

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedFavorites = localStorage.getItem('favorites');
    const savedUser = localStorage.getItem('user');

    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart from localStorage');
      }
    }

    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Failed to load favorites from localStorage');
      }
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to load user from localStorage');
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Cart functions
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Favorites functions
  const addToFavorites = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(prev => prev.filter(favId => favId !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.includes(id);
  };

  // Search functions
  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate search with delay
      const searchTimer = setTimeout(() => {
        // Mock search results - in real app this would be API call
        const mockResults = [
          { id: '1', name: 'Умный стол Classic', price: 85000, type: 'table' },
          { id: '2', name: 'Стол с подъемным механизмом', price: 140000, type: 'table' },
          { id: '3', name: 'Подвесная тумба', price: 25000, type: 'storage' },
        ].filter(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(mockResults);
        setIsSearching(false);
      }, 500);

      return () => clearTimeout(searchTimer);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery]);

  // Auth functions
  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app this would be API call
    if (email && password) {
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        avatar: `https://avatar.vercel.sh/${email}`,
        role: email === 'admin@example.com' ? 'admin' : 'user',
      };
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value: AppContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
