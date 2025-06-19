import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/services/supabase';
import { logger } from '@/services/logger.service';
import { Session, User } from '@supabase/supabase-js';

// Расширяем тип User, чтобы включить наши кастомные роли
interface UserWithRoles extends User {
  roles?: string[];
}

// Функция для получения профиля
async function getUserProfile(user: User | null): Promise<UserWithRoles | null> {
  if (!user) return null;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('roles')
    .eq('id', user.id)
    .single();
  
  if (error) {
    // Не блокируем пользователя, если профиль не найден (например, сразу после регистрации)
    // Просто логируем ошибку, если это не "No rows found"
    if (error.message && !error.message.includes('No rows found')) {
        logger.error('Error fetching user profile', error);
    }
    return { ...user, roles: [] };
  }
  
  const finalUser = {
    ...user,
    roles: profile?.roles || [],
  };

  return finalUser;
}


export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserWithRoles | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSession = useCallback(async () => {
    setLoading(true);
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      logger.error('Error getting session', error);
      setLoading(false);
      return;
    }

    setSession(session);
    const userWithProfile = await getUserProfile(session?.user ?? null);
    setUser(userWithProfile);
    setLoading(false);
  }, []);
  
  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        getUserProfile(session?.user ?? null).then(setUser);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [fetchSession]);

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setSession(null);
  };
  
  const isAuthenticated = !!session?.user;

  return {
    session,
    user,
    isAuthenticated,
    login,
    logout,
    loading
  };
}