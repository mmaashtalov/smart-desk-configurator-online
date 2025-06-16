import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { SEOData, PageSEO } from '@/types'

interface SEOContextData {
  currentSEO: SEOData
  setSEO: (seo: SEOData) => void
  getPageSEO: (path: string) => PageSEO | undefined
  updatePageSEO: (path: string, seo: Partial<SEOData>) => void
  getAllPagesSEO: () => PageSEO[]
  generateSitemap: () => string
  generateRobotsTxt: () => string
  pages: PageSEO[]
  addPageSEO: (path: string) => void
  removePageSEO: (path: string) => void
  updatePagePath: (oldPath: string, newPath: string) => void
  verification: { google: string; yandex: string }
  updateVerification: (codes: { google: string; yandex: string }) => void
  cleanParam: string
  updateCleanParam: (value: string) => void
}

const SEOContext = createContext<SEOContextData | undefined>(undefined)

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
};

export const SEOProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentSEO, setCurrentSEO] = useState<SEOData>(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return {
      ...defaultSEO,
      structuredData: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": `${origin}/#organization`,
            "name": "Офис Интеллект",
            "url": `${origin}/`,
            "logo": `${origin}/assets/logo.svg`,
            "sameAs": [
              "https://vk.com/officeintellect",
              "https://t.me/officeintellect"
            ]
          },
          {
            "@type": "WebSite",
            "@id": `${origin}/#website`,
            "url": `${origin}/`,
            "name": "Офис Интеллект",
            "publisher": {
              "@id": `${origin}/#organization`
            },
            "potentialAction": [{
              "@type": "SearchAction",
              "target": `${origin}/?s={search_term_string}`,
              "query-input": "required name=search_term_string"
            }]
          }
        ]
      }
    };
  });
  const [pages, setPages] = useState<PageSEO[]>(() => {
    try {
      const savedData = localStorage.getItem('seo-data');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (error) {
      console.error('Error loading SEO data:', error);
    }
    return [];
  });
  const [verification, setVerification] = useState(() => {
    try {
      const savedVerification = localStorage.getItem('seo-verification');
      if (savedVerification) {
        return JSON.parse(savedVerification);
      }
    } catch (error) {
      console.error('Error loading verification data:', error);
    }
    return { google: '', yandex: '' };
  });
  const [cleanParam, setCleanParam] = useState(() => {
    try {
      const saved = localStorage.getItem('seo-clean-param');
      return saved ? JSON.parse(saved) : '';
    } catch (error) {
      console.error('Error loading Clean-param data:', error);
      return '';
    }
  });

  useEffect(() => {
    localStorage.setItem('seo-data', JSON.stringify(pages));
  }, [pages]);
  
  useEffect(() => {
    localStorage.setItem('seo-verification', JSON.stringify(verification));
    updateMetaTag('google-site-verification', verification.google);
    updateMetaTag('yandex-verification', verification.yandex);
  }, [verification]);

  useEffect(() => {
    localStorage.setItem('seo-clean-param', JSON.stringify(cleanParam));
  }, [cleanParam]);

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
    let element = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
    if (!element) {
      element = document.createElement('script')
      element.type = 'application/ld+json'
      document.head.appendChild(element)
    }
    element.textContent = JSON.stringify(data)
  }

  const getPageSEO = (path: string): PageSEO | undefined => {
    return pages.find(page => page.path === path);
  };

  const updatePageSEO = (path: string, seo: Partial<SEOData>) => {
    setPages(prev =>
      prev.map(p =>
        p.path === path
          ? { ...p, seo: { ...p.seo, ...seo }, updatedAt: new Date().toISOString() }
          : p
      )
    );
  };

  const addPageSEO = (path: string) => {
    if (pages.some(p => p.path === path)) {
      alert(`Page with path "${path}" already exists.`);
      return;
    }
    const now = new Date().toISOString();
    const newPage: PageSEO = {
      id: `page-${Date.now()}`,
      path,
      seo: {
        title: path,
        description: `Description for ${path}`,
        keywords: [],
        ogTitle: path,
        ogDescription: `Description for ${path}`,
        ogImage: '',
        twitterCard: 'summary_large_image',
        twitterSite: '',
        canonical: path,
        robots: 'index, follow',
      },
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };
    setPages(prev => [...prev, newPage]);
  };

  const removePageSEO = (path: string) => {
    setPages(prev => prev.filter(p => p.path !== path));
  };

  const updatePagePath = (oldPath: string, newPath: string) => {
    if (pages.some(p => p.path === newPath && p.path !== oldPath)) {
      alert(`Page with path "${newPath}" already exists.`);
      return;
    }
    setPages(prev =>
      prev.map(p =>
        p.path === oldPath ? { ...p, path: newPath, updatedAt: new Date().toISOString() } : p
      )
    );
  };

  const getAllPagesSEO = (): PageSEO[] => {
    return pages;
  };

  const generateSitemap = (): string => {
    const baseUrl = window.location.origin
    const activePages = pages.filter(page => page.isActive)
    
    const urls = activePages.map(page => `
    <url>
        <loc>${baseUrl}${page.path}</loc>
        <lastmod>${page.updatedAt || new Date().toISOString()}</lastmod>
        <priority>0.8</priority>
    </url>`).join('')

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
</urlset>`
  };

  const generateRobotsTxt = (): string => {
    const disallowed = pages
      .filter(page => !page.isActive || page.seo.robots?.includes('noindex'))
      .map(page => `Disallow: ${page.path}`)
      .join('\n');
    
    const cleanParamDirectives = cleanParam
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(line => `Clean-param: ${line.trim()}`)
      .join('\n');

    return `User-agent: *
${disallowed}
${cleanParamDirectives ? `${cleanParamDirectives}\n` : ''}Allow: /

Sitemap: ${window.location.origin}/sitemap.xml`;
  };

  const value = {
    currentSEO,
    setSEO: setCurrentSEO,
    getPageSEO,
    updatePageSEO,
    getAllPagesSEO,
    generateSitemap,
    generateRobotsTxt,
    pages,
    addPageSEO,
    removePageSEO,
    updatePagePath,
    verification,
    updateVerification: setVerification,
    cleanParam,
    updateCleanParam: setCleanParam
  };

  return <SEOContext.Provider value={value}>{children}</SEOContext.Provider>;
};

export function useSEO() {
  const context = useContext(SEOContext)
  if (context === undefined) {
    throw new Error('useSEO must be used within a SEOProvider')
  }
  return context
}

