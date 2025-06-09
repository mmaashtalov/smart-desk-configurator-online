export interface SEOData {
  title: string
  description: string
  keywords: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  twitterCard?: 'summary' | 'summary_large_image'
  twitterSite?: string
  canonical?: string
  robots?: string
  structuredData?: Record<string, any>
}

export interface PageSEO {
  id: string
  path: string
  seo: SEOData
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface AnalyticsEvent {
  id: string
  type:
    | 'page_view'
    | 'click'
    | 'form_submit'
    | 'custom'
    | 'chat_opened'
    | 'user_message_sent'
    | 'assistant_message_received'
  page: string
  element?: string
  data?: Record<string, any>
  timestamp: string
  sessionId: string
  userId?: string
}

export interface AnalyticsMetrics {
  pageViews: number
  uniqueVisitors: number
  bounceRate: number
  avgSessionDuration: number
  topPages: Array<{ page: string; views: number }>
  topEvents: Array<{ event: string; count: number }>
  deviceTypes: Array<{ type: string; count: number }>
  trafficSources: Array<{ source: string; count: number }>
}

export interface User {
  id: string
  email: string
  role: 'admin' | 'user'
  name: string
  avatar?: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  features: string[]
  specifications: Record<string, string>
  category: string
  isActive: boolean
}

