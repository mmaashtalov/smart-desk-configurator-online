import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { SEOData, PageSEO } from '@/types'

interface SEOContextType {
  currentSEO: SEOData
  updateSEO: (seo: Partial<SEOData>) => void
  getPageSEO: (path: string) => PageSEO | null
  updatePageSEO: (path: string, seo: Partial<SEOData>) => void
  getAllPagesSEO: () => PageSEO[]
  generateSitemap: () => string
  generateRobotsTxt: () => string
}

const SEOContext = createContext<SEOContextType | undefined>(undefined)

const defaultSEO: SEOData = {
  title: 'Офис Интеллект - Премиальные умные столы',
  description: 'Премиальные умные столы из дубового шпона с электроприводом и масляным покрытием. Эргономика, технологии и натуральные материалы.',
  keywords: ['умные столы', 'офисная мебель', 'эргономика', 'дубовый шпон', 'электропривод'],
  ogTitle: 'Офис Интеллект - Премиальные умные столы',
  ogDescription: 'Премиальные умные столы из дубового шпона с электроприводом и масляным покрытием в трёх тонах',
  ogImage: 'https://lovable.dev/opengraph-image-p98pqg.png',
  twitterCard: 'summary_large_image',
  twitterSite: '@office_intellect',
  robots: 'index, follow',
}

export function SEOProvider({ children }: { children: ReactNode }) {
  const [currentSEO, setCurrentSEO] = useState<SEOData>(defaultSEO)
  const [pagesSEO, setPagesSEO] = useState<PageSEO[]>([])

  useEffect(() => {
    // Load SEO data from localStorage
    const savedSEO = localStorage.getItem('seo-data')
    if (savedSEO) {
      try {
        const parsed = JSON.parse(savedSEO)
        setPagesSEO(parsed)
      } catch (error) {
        console.error('Error loading SEO data:', error)
      }
    }
  }, [])

  useEffect(() => {
    // Save SEO data to localStorage
    localStorage.setItem('seo-data', JSON.stringify(pagesSEO))
  }, [pagesSEO])

  useEffect(() => {
    // Update document head
    document.title = currentSEO.title
    
    // Update meta tags
    updateMetaTag('description', currentSEO.description)
    updateMetaTag('keywords', currentSEO.keywords.join(', '))
    updateMetaTag('robots', currentSEO.robots || 'index, follow')
    
    // Update Open Graph tags
    updateMetaTag('og:title', currentSEO.ogTitle || currentSEO.title, 'property')
    updateMetaTag('og:description', currentSEO.ogDescription || currentSEO.description, 'property')
    updateMetaTag('og:image', currentSEO.ogImage || '', 'property')
    updateMetaTag('og:type', 'website', 'property')
    
    // Update Twitter tags
    updateMetaTag('twitter:card', currentSEO.twitterCard || 'summary_large_image')
    updateMetaTag('twitter:site', currentSEO.twitterSite || '')
    updateMetaTag('twitter:image', currentSEO.ogImage || '')
    
    // Update canonical link
    updateCanonicalLink(currentSEO.canonical)
    
    // Update structured data
    if (currentSEO.structuredData) {
      updateStructuredData(currentSEO.structuredData)
    }
  }, [currentSEO])

  const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
    let element = document.querySelector(`meta[${attribute}="${name}"]`)
    if (!element) {
      element = document.createElement('meta')
      element.setAttribute(attribute, name)
      document.head.appendChild(element)
    }
    element.setAttribute('content', content)
  }

  const updateCanonicalLink = (href?: string) => {
    let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!element && href) {
      element = document.createElement('link')
      element.rel = 'canonical'
      document.head.appendChild(element)
    }
    if (element && href) {
      element.href = href
    } else if (element && !href) {
      element.remove()
    }
  }

  const updateStructuredData = (data: Record<string, any>) => {
    let element = document.querySelector('script[type="application/ld+json"]')
    if (!element) {
      element = document.createElement('script')
      element.type = 'application/ld+json'
      document.head.appendChild(element)
    }
    element.textContent = JSON.stringify(data)
  }

  const updateSEO = (seo: Partial<SEOData>) => {
    setCurrentSEO(prev => ({ ...prev, ...seo }))
  }

  const getPageSEO = (path: string): PageSEO | null => {
    return pagesSEO.find(page => page.path === path) || null
  }

  const updatePageSEO = (path: string, seo: Partial<SEOData>) => {
    setPagesSEO(prev => {
      const existingIndex = prev.findIndex(page => page.path === path)
      const now = new Date().toISOString()
      
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          seo: { ...updated[existingIndex].seo, ...seo },
          updatedAt: now
        }
        return updated
      } else {
        const newPage: PageSEO = {
          id: Math.random().toString(36).substr(2, 9),
          path,
          seo: { ...defaultSEO, ...seo },
          isActive: true,
          createdAt: now,
          updatedAt: now
        }
        return [...prev, newPage]
      }
    })
  }

  const getAllPagesSEO = (): PageSEO[] => {
    return pagesSEO
  }

  const generateSitemap = (): string => {
    const baseUrl = window.location.origin
    const pages = pagesSEO.filter(page => page.isActive)
    
    const urls = pages.map(page => `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${page.updatedAt.split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>${urls}
</urlset>`
  }

  const generateRobotsTxt = (): string => {
    const baseUrl = window.location.origin
    return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`
  }

  return (
    <SEOContext.Provider value={{
      currentSEO,
      updateSEO,
      getPageSEO,
      updatePageSEO,
      getAllPagesSEO,
      generateSitemap,
      generateRobotsTxt
    }}>
      {children}
    </SEOContext.Provider>
  )
}

export function useSEO() {
  const context = useContext(SEOContext)
  if (context === undefined) {
    throw new Error('useSEO must be used within a SEOProvider')
  }
  return context
}

