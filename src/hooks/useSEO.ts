import { useState, useEffect } from 'react'
import { useSEO as useSEOContext } from '@/contexts/SEOContext'

export function useSEOPage(path: string, defaultSEO?: Partial<import('@/types').SEOData>) {
  const { getPageSEO, updateSEO, updatePageSEO } = useSEOContext()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const pageSEO = getPageSEO(path)
    
    if (pageSEO) {
      updateSEO(pageSEO.seo)
    } else if (defaultSEO) {
      updateSEO(defaultSEO)
      updatePageSEO(path, defaultSEO)
    }
    
    setIsLoading(false)
  }, [path, defaultSEO, getPageSEO, updateSEO, updatePageSEO])

  return { isLoading }
}

