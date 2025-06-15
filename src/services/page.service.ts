import { supabase } from './supabase';
import { Page } from '@/types/page';

/**
 * Service-layer helpers for interacting with the `pages` table in Supabase.
 * All methods throw if Supabase returns an error so they can be handled by the caller.
 */
// Function implementation with overloads
export async function getPages(): Promise<Page[]>;
export async function getPages(options: { page?: number; limit?: number; sortBy?: keyof Page | 'updated_at' | 'created_at'; ascending?: boolean }): Promise<{ data: Page[]; total: number }>;
export async function getPages(options?: {
  page?: number; // 1-based
  limit?: number;
  sortBy?: keyof Page | 'updated_at' | 'created_at';
  ascending?: boolean;
}): Promise<any> {
  const { page = 1, limit = 10, sortBy = 'updated_at', ascending = false } = options || {};

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from('pages')
    .select('*', { count: 'exact' })
    .order(sortBy, { ascending })
    .range(from, to);

  if (error) throw error;

  if (!options) {
    return (data || []) as Page[];
  }

  return { data: data || [], total: count || 0 };
}

export const pageService = {
  getPages,

  async getPage(id: string): Promise<Page | null> {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // not found
      throw error;
    }

    return data;
  },

  async createPage(page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>): Promise<Page> {
    const { data, error } = await supabase
      .from('pages')
      .insert(page)
      .select()
      .single();

    if (error) throw error;
    return data as Page;
  },

  async updatePage(id: string, updates: Partial<Page>): Promise<Page> {
    const { data, error } = await supabase
      .from('pages')
      .update({ ...updates, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Page;
  },

  async deletePage(id: string): Promise<void> {
    const { error } = await supabase.from('pages').delete().eq('id', id);
    if (error) throw error;
  },

  async isSlugUnique(slug: string, excludeId?: string): Promise<boolean> {
    let query = supabase
      .from('pages')
      .select('id', { count: 'exact', head: true })
      .eq('slug', slug);

    if (excludeId) {
      query = query.neq('id', excludeId);
    }

    const { count, error } = await query;
    if (error) throw error;
    return (count || 0) === 0;
  },

  async getPageBySlug(slug: string): Promise<Page | null> {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  },
};