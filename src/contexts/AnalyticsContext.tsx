import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { AnalyticsEvent, AnalyticsMetrics } from '@/types'
import { generateId, getDeviceType, getTrafficSource } from '@/lib/utils'

interface AnalyticsContextType {
  trackEvent: (type: AnalyticsEvent['type'], page: string, element?: string, data?: Record<string, any>) => void
  trackPageView: (page: string) => void
  getMetrics: (startDate?: string, endDate?: string) => AnalyticsMetrics
  getEvents: (startDate?: string, endDate?: string) => AnalyticsEvent[]
  clearData: () => void
  exportData: () => string
}

export const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<AnalyticsEvent[]>([])
  const [sessionId] = useState(() => generateId())

  useEffect(() => {
    // Load analytics data from localStorage
    const savedEvents = localStorage.getItem('analytics-events')
    if (savedEvents) {
      try {
        const parsed = JSON.parse(savedEvents)
        setEvents(parsed)
      } catch (error) {
        console.error('Error loading analytics data:', error)
      }
    }
  }, [])

  useEffect(() => {
    // Save analytics data to localStorage
    localStorage.setItem('analytics-events', JSON.stringify(events))
  }, [events])

  const trackPageView = useCallback((page: string) => {
    trackEvent('page_view', page, undefined, {
      referrer: document.referrer,
      title: document.title,
    })
  }, [])

  useEffect(() => {
    // Track initial page view
    trackPageView(window.location.pathname)
    
    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        trackPageView(window.location.pathname)
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [trackPageView])

  const trackEvent = useCallback((
    type: AnalyticsEvent['type'],
    page: string,
    element?: string,
    data?: Record<string, any>
  ) => {
    const event: AnalyticsEvent = {
      id: generateId(),
      type,
      page,
      element,
      data: {
        ...data,
        deviceType: getDeviceType(),
        trafficSource: getTrafficSource(),
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
      sessionId,
    }

    setEvents(prev => [...prev, event])
  }, [sessionId])

  const getMetrics = (startDate?: string, endDate?: string): AnalyticsMetrics => {
    let filteredEvents = events
    
    if (startDate || endDate) {
      filteredEvents = events.filter(event => {
        const eventDate = new Date(event.timestamp)
        const start = startDate ? new Date(startDate) : new Date(0)
        const end = endDate ? new Date(endDate) : new Date()
        return eventDate >= start && eventDate <= end
      })
    }

    const pageViews = filteredEvents.filter(e => e.type === 'page_view').length
    const uniqueVisitors = new Set(filteredEvents.map(e => e.sessionId)).size
    
    // Calculate bounce rate (sessions with only one page view)
    const sessionPageViews = filteredEvents
      .filter(e => e.type === 'page_view')
      .reduce((acc, event) => {
        acc[event.sessionId] = (acc[event.sessionId] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    
    const bouncedSessions = Object.values(sessionPageViews).filter(count => count === 1).length
    const bounceRate = uniqueVisitors > 0 ? (bouncedSessions / uniqueVisitors) * 100 : 0

    // Calculate average session duration (simplified)
    const avgSessionDuration = 300 // 5 minutes placeholder

    // Top pages
    const pageViewCounts = filteredEvents
      .filter(e => e.type === 'page_view')
      .reduce((acc, event) => {
        acc[event.page] = (acc[event.page] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    
    const topPages = Object.entries(pageViewCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([page, views]) => ({ page, views }))

    // Top events
    const eventCounts = filteredEvents
      .reduce((acc, event) => {
        const key = event.element || event.type
        acc[key] = (acc[key] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    
    const topEvents = Object.entries(eventCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([event, count]) => ({ event, count }))

    // Device types
    const deviceCounts = filteredEvents
      .reduce((acc, event) => {
        const device = event.data?.deviceType || 'unknown'
        acc[device] = (acc[device] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    
    const deviceTypes = Object.entries(deviceCounts)
      .map(([type, count]) => ({ type, count }))

    // Traffic sources
    const sourceCounts = filteredEvents
      .filter(e => e.type === 'page_view')
      .reduce((acc, event) => {
        const source = event.data?.trafficSource || 'unknown'
        acc[source] = (acc[source] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    
    const trafficSources = Object.entries(sourceCounts)
      .map(([source, count]) => ({ source, count }))

    return {
      pageViews,
      uniqueVisitors,
      bounceRate,
      avgSessionDuration,
      topPages,
      topEvents,
      deviceTypes,
      trafficSources,
    }
  }

  const getEvents = (startDate?: string, endDate?: string): AnalyticsEvent[] => {
    if (!startDate && !endDate) return events
    
    return events.filter(event => {
      const eventDate = new Date(event.timestamp)
      const start = startDate ? new Date(startDate) : new Date(0)
      const end = endDate ? new Date(endDate) : new Date()
      return eventDate >= start && eventDate <= end
    })
  }

  const clearData = () => {
    setEvents([])
    localStorage.removeItem('analytics-events')
  }

  const exportData = (): string => {
    return JSON.stringify(events, null, 2)
  }

  return (
    <AnalyticsContext.Provider value={{
      trackEvent,
      trackPageView,
      getMetrics,
      getEvents,
      clearData,
      exportData,
    }}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }
  return context
}

