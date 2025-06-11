import { createClient } from '@supabase/supabase-js'
import { PageSEO, SEOData } from '@/types'

// IMPORTANT: Replace with your actual Supabase URL and Anon Key
// You should store these in environment variables (.env file)
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

if (supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
  console.warn('Supabase URL or Anon Key is not set. Please update your environment variables.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Real Supabase API for SEO data.
 */
export const supabaseSeoApi = {
  /**
   * Fetches all page SEO configurations from the 'seo_meta' table.
   * Corresponds to GET /api/seo
   */
  getAllPagesSEO: async (): Promise<PageSEO[]> => {
    const { data, error } = await supabase.from('seo_meta').select('*')

    if (error) {
      console.error('Error fetching SEO data from Supabase:', error)
      throw new Error(error.message)
    }

    // The data from Supabase needs to be mapped to our PageSEO type.
    // This is a basic mapping, assuming column names match the PageSEO properties.
    return data as PageSEO[]
  },

  /**
   * Updates or inserts SEO data for a specific page path in the 'seo_meta' table.
   * Corresponds to POST /api/seo
   */
  updatePageSEO: async (path: string, seoData: Partial<SEOData>): Promise<PageSEO> => {
    // In Supabase, you usually 'upsert' to update or create.
    // We'll find the record by 'path'.
    // The SEO data is often stored in a JSONB column. Let's assume the column is named 'seo'.
    
    // First, fetch the existing record to get its ID
    const { data: existing, error: fetchError } = await supabase
      .from('seo_meta')
      .select('id, seo')
      .eq('path', path)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = "Row not found"
        console.error('Error fetching page for update:', fetchError)
        throw fetchError
    }

    const updatedSeoPayload = { ...existing?.seo, ...seoData };
    
    const { data, error } = await supabase
      .from('seo_meta')
      .upsert({ 
        path: path, 
        seo: updatedSeoPayload,
        updated_at: new Date().toISOString(),
        // If it's a new record, you might need to provide other default values
        ...(existing ? { id: existing.id } : { 
            // You might need to define defaults for a new record
            // For example: is_active: true, created_at: new Date().toISOString()
        })
      })
      .select()
      .single()

    if (error) {
      console.error('Error updating SEO data in Supabase:', error)
      throw new Error(error.message)
    }

    return data as PageSEO
  },
} 