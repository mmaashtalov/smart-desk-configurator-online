/// <reference types="vitest/globals" />
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import AuthModal from './AuthModal';
import { AppContext } from '../contexts/AppContext';
import { AppContextType } from '@/types/app';
import { ReactNode } from 'react';

const mockLogin = vi.fn();
const mockLogout = vi.fn();

const TestAppProvider = ({ children, user, login, logout }: { children: ReactNode, user: any, login: any, logout: any }) => {
  const value: Partial<AppContextType> = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };
  return <AppContext.Provider value={value as AppContextType}>{children}</AppContext.Provider>;
};


const renderWithProvider = (component: React.ReactElement, user = null) => {
  return render(
    <TestAppProvider user={user} login={mockLogin} logout={mockLogout}>
      {component}
    </TestAppProvider>
  );
};

describe('AuthModal', () => {
  beforeEach(() => {
    mockLogin.mockClear();
    mockLogout.mockClear();
  });

  it('should attempt to log in with correct credentials', async () => {
    mockLogin.mockResolvedValue(true);
    const handleClose = vi.fn();

    renderWithProvider(<AuthModal isOpen={true} onClose={handleClose} />, null);
    
    await act(async () => {
      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText('Пароль'), { target: { value: 'password' } });
      fireEvent.click(screen.getByRole('button', { name: 'Войти' }));
    });

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password');
      expect(handleClose).toHaveBeenCalled();
    });
  });

  it('should show an error with incorrect credentials', async () => {
    mockLogin.mockResolvedValue(false);
    const handleClose = vi.fn();
    
    renderWithProvider(<AuthModal isOpen={true} onClose={handleClose} />, null);

    await act(async () => {
      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'wrong@example.com' } });
      fireEvent.change(screen.getByLabelText('Пароль'), { target: { value: 'wrong' } });
      fireEvent.click(screen.getByRole('button', { name: 'Войти' }));
    });
    
    await waitFor(() => {
      expect(screen.getByText('Неверный email или пароль')).toBeInTheDocument();
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  it('should switch to registration form', () => {
    renderWithProvider(<AuthModal isOpen={true} onClose={() => {}} />, null);
    
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /Нет аккаунта\? Зарегистрируйтесь/i }));
    });
    
    expect(screen.getByText('Регистрация')).toBeInTheDocument();
    expect(screen.getByLabelText('Подтвердите пароль')).toBeInTheDocument();
  });

  it('should show an error if passwords do not match on registration', async () => {
    renderWithProvider(<AuthModal isOpen={true} onClose={() => {}} />, null);
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Нет аккаунта\? Зарегистрируйтесь/i }));
      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText('Пароль'), { target: { value: 'password' } });
      fireEvent.change(screen.getByLabelText('Подтвердите пароль'), { target: { value: 'wrongpassword' } });
      fireEvent.click(screen.getByRole('button', { name: 'Зарегистрироваться' }));
    });
    
    await waitFor(() => {
      expect(screen.getByText('Пароли не совпадают')).toBeInTheDocument();
    });
  });
}); 