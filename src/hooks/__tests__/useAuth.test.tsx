import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useAuth } from '../useAuth';
import { supabase } from '@/services/supabase';
import type { Session, User, AuthChangeEvent, Subscription } from '@supabase/supabase-js';

// --- Мокируем зависимости ---
vi.mock('@/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));
vi.mock('@/services/supabase');
const mockedSupabase = vi.mocked(supabase, true);
// --- Конец моков ---

describe('useAuth', () => {
  // Переменная для хранения callback'а, который передается в onAuthStateChange
  let authStateChangeCallback: ((event: AuthChangeEvent, session: Session | null) => void) | null = null;

  // --- Хелперы для создания мок-данных ---
  const createMockUser = (email: string): User => ({
    id: 'user-123', email, app_metadata: {}, user_metadata: {}, aud: 'authenticated', created_at: new Date().toISOString(),
  });
  const createMockSession = (user: User): Session => ({
    access_token: 'mock-access-token', refresh_token: 'mock-refresh-token', expires_in: 3600, token_type: 'bearer', user,
  });
  // --- Конец хелперов ---

  beforeEach(() => {
    vi.clearAllMocks();
    authStateChangeCallback = null; // Сбрасываем перед каждым тестом

    // Мокируем onAuthStateChange так, чтобы он "захватывал" переданный ему callback
    mockedSupabase.auth.onAuthStateChange.mockImplementation((callback: (event: AuthChangeEvent, session: Session | null) => void) => {
      authStateChangeCallback = callback;
      return { data: { subscription: { unsubscribe: vi.fn() } as unknown as Subscription } };
    });

    // По умолчанию сессии нет
    mockedSupabase.auth.getSession.mockResolvedValue({ data: { session: null }, error: null });
    
    // Мок ответа от 'profiles'
    mockedSupabase.from.mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: { roles: ['user'] }, error: null }),
        }),
      }),
    } as any);
  });

  it('initially not authenticated and not loading', async () => {
    const { result } = renderHook(() => useAuth());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('login with correct credentials succeeds', async () => {
    const mockUser = createMockUser('admin@office-intellect.ru');
    const mockSession = createMockSession(mockUser);
    
    mockedSupabase.auth.signInWithPassword.mockResolvedValue({ data: { session: mockSession, user: mockUser }, error: null });

    const { result } = renderHook(() => useAuth());

    // Ждем, пока хук инициализируется и установит слушатель
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.login('admin@office-intellect.ru', 'admin123');
      // Имитируем, что supabase вызвал наш callback после успешного входа
      if (authStateChangeCallback) {
        authStateChangeCallback('SIGNED_IN', mockSession);
      }
    });

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user?.email).toBe('admin@office-intellect.ru');
    });
  });

  it('login with wrong credentials fails', async () => {
    const mockError = new Error('Invalid login credentials');
    mockedSupabase.auth.signInWithPassword.mockRejectedValue(mockError);

    const { result } = renderHook(() => useAuth());
    
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await expect(result.current.login('wrong@example.com', 'bad')).rejects.toThrow(mockError);
    });

    expect(result.current.isAuthenticated).toBe(false);
  });

  it('logout clears auth state', async () => {
    const { result } = renderHook(() => useAuth());
    const mockUser = createMockUser('admin@office-intellect.ru');
    const mockSession = createMockSession(mockUser);

    // Ждем, пока хук инициализируется
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Сначала имитируем состояние "залогинен"
    await act(async () => {
        if (authStateChangeCallback) {
          authStateChangeCallback('SIGNED_IN', mockSession);
        }
    });
    
    await waitFor(() => expect(result.current.isAuthenticated).toBe(true));

    // Мокируем успешный выход
    mockedSupabase.auth.signOut.mockResolvedValue({ error: null });
    
    // Вызываем logout и имитируем событие SIGNED_OUT
    await act(async () => {
      await result.current.logout();
      if (authStateChangeCallback) {
        authStateChangeCallback('SIGNED_OUT', null);
      }
    });

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
    });
  });
});