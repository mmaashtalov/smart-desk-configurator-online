import { supabase } from './supabase';
import { MarketplaceListing } from '@/types/marketplace';
import { MOCK_LISTINGS } from '@/data/marketplace';
import { v4 as uuidv4 } from 'uuid';

export interface PaginatedListings {
  listings: MarketplaceListing[];
  total: number;
}

/**
 * Fetch marketplace listings with pagination. Falls back to mock data in dev.
 * @param page     1-based page index
 * @param pageSize Items per page (default 9)
 */
export const fetchMarketplaceListings = async (
  page = 1,
  pageSize = 9
): Promise<PaginatedListings> => {
  try {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await supabase
      .from('marketplace_listings')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    return {
      listings: (data as MarketplaceListing[]) ?? [],
      total: count ?? 0,
    };
  } catch (e) {
    console.warn('[Marketplace] Using mock data because Supabase query failed:', e);
    return { listings: MOCK_LISTINGS, total: MOCK_LISTINGS.length };
  }
};

/**
 * Upload a single image to Supabase Storage bucket `marketplace` and return its public URL.
 */
export const uploadListingImage = async (file: File): Promise<string> => {
  const ext = file.name.split('.').pop() ?? 'jpg';
  const filePath = `${uuidv4()}.${ext}`;

  const { error } = await supabase.storage
    .from('marketplace')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from('marketplace').getPublicUrl(filePath);

  return publicUrl;
};

/**
 * Create a new listing in Supabase. Requires user to be authenticated (RLS enforced).
 */
export const createMarketplaceListing = async (
  payload: Omit<MarketplaceListing, 'id' | 'createdAt'>
): Promise<MarketplaceListing> => {
  const { data, error } = await supabase
    .from('marketplace_listings')
    .insert({
      ...payload,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;

  const listing = {
    ...(data as Record<string, unknown>),
    createdAt: (data as any).created_at ?? (data as any).createdAt,
  } as MarketplaceListing;
  return listing;
}; 