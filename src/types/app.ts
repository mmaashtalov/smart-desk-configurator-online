export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  configuration?: any;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: 'admin' | 'user';
}

export interface AppContextType {
  // Cart
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Favorites
  favorites: string[];
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: any[];
  isSearching: boolean;

  // Auth
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}
