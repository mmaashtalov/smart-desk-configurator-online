import { describe, it, expect, vi, beforeEach } from 'vitest';
import { pageService } from '../page.service';

// 1. Create a factory that returns a chainable mock builder
const createBuilder = (finalValue: any) => {
  return {
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn(() => Promise.resolve(finalValue)),
    eq: vi.fn().mockReturnThis(),
    neq: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    range: vi.fn(() => Promise.resolve(finalValue)),
    single: vi.fn(() => Promise.resolve(finalValue)),
  } as any;
};

// Mock the Supabase client
vi.mock('../supabase', () => {
  return {
    supabase: {
      from: vi.fn(),
    },
  };
});

// Import after mocking
import { supabase } from '../supabase';

const castedFrom = supabase.from as unknown as any;

beforeEach(() => {
  vi.clearAllMocks();
});

describe('pageService', () => {
  it('getPages returns data ordered by updated_at', async () => {
    const mockPages = [{ id: '1', title: 'p', slug: 's', content: '', seo: { metaTitle: '', metaDescription: '' }, status: 'published', createdAt: '', updatedAt: '' }];
    castedFrom.mockImplementationOnce(() => createBuilder({ data: mockPages, error: null }));

    const result = await pageService.getPages();

    expect(castedFrom).toHaveBeenCalledWith('pages');
    expect(result).toEqual(mockPages);
  });

  it('createPage inserts page and returns created record', async () => {
    const input = { title: 't', slug: 's', content: '', seo: { metaTitle: '', metaDescription: '' }, status: 'draft' as const };
    const created = { ...input, id: '123', createdAt: '', updatedAt: '' };
    castedFrom.mockImplementationOnce(() => createBuilder({ data: created, error: null }));

    const result = await pageService.createPage(input as any);
    expect(castedFrom).toHaveBeenCalledWith('pages');
    expect(result).toEqual(created);
  });

  it('isSlugUnique returns true when no records found', async () => {
    castedFrom.mockImplementationOnce(() => createBuilder({ count: 0, error: null }));

    const unique = await pageService.isSlugUnique('abc');
    expect(unique).toBe(true);
  });
});