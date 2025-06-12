/// <reference types="vitest/globals" />
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import CartModal from './CartModal';
import { AppContext } from '../contexts/AppContext';
import { AppContextType, CartItem } from '@/types/app';
import { ReactNode } from 'react';

const mockUpdateQuantity = vi.fn();
const mockRemoveFromCart = vi.fn();
const mockClearCart = vi.fn();

const TestAppProvider = ({ children, cartItems }: { children: ReactNode, cartItems: CartItem[] }) => {
  const value: Partial<AppContextType> = {
    cartItems,
    updateQuantity: mockUpdateQuantity,
    removeFromCart: mockRemoveFromCart,
    clearCart: mockClearCart,
    cartTotal: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    cartCount: cartItems.reduce((count, item) => count + item.quantity, 0),
  };
  return <AppContext.Provider value={value as AppContextType}>{children}</AppContext.Provider>;
};

const renderWithProvider = (component: React.ReactElement, cartItems: CartItem[]) => {
  return render(
    <TestAppProvider cartItems={cartItems}>
      {component}
    </TestAppProvider>
  );
};

const mockCartItems: CartItem[] = [
  { id: '1', name: 'Test Item 1', price: 100, quantity: 2, image: 'test1.jpg' },
  { id: '2', name: 'Test Item 2', price: 200, quantity: 1, image: 'test2.jpg' },
];

describe('CartModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display empty cart message', () => {
    renderWithProvider(<CartModal isOpen={true} onClose={() => {}} />, []);
    expect(screen.getByText('Корзина пуста')).toBeInTheDocument();
  });

  it('should display cart items', () => {
    renderWithProvider(<CartModal isOpen={true} onClose={() => {}} />, mockCartItems);
    expect(screen.getByText('Test Item 1')).toBeInTheDocument();
    expect(screen.getByText('Test Item 2')).toBeInTheDocument();
  });

  it('should call updateQuantity when plus/minus buttons are clicked', () => {
    renderWithProvider(<CartModal isOpen={true} onClose={() => {}} />, mockCartItems);

    // Click plus for item 1
    fireEvent.click(screen.getByLabelText('Увеличить количество Test Item 1'));
    expect(mockUpdateQuantity).toHaveBeenCalledWith('1', 3);

    // Click minus for item 1
    fireEvent.click(screen.getByLabelText('Уменьшить количество Test Item 1'));
    expect(mockUpdateQuantity).toHaveBeenCalledWith('1', 1);
  });

  it('should call removeFromCart when remove button is clicked', () => {
    renderWithProvider(<CartModal isOpen={true} onClose={() => {}} />, mockCartItems);
    fireEvent.click(screen.getByLabelText('Удалить Test Item 1'));
    expect(mockRemoveFromCart).toHaveBeenCalledWith('1');
  });

  it('should call clearCart when clear button is clicked', () => {
    renderWithProvider(<CartModal isOpen={true} onClose={() => {}} />, mockCartItems);
    fireEvent.click(screen.getByRole('button', { name: 'Очистить корзину' }));
    expect(mockClearCart).toHaveBeenCalled();
  });
}); 