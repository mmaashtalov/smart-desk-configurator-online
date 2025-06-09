import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAnalytics } from '@/contexts/AnalyticsContext'

export function usePageTracking() {
  const location = useLocation()
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    trackPageView(location.pathname)
  }, [location.pathname, trackPageView])
}

export function useEventTracking() {
  const { trackEvent } = useAnalytics()

  const trackClick = (element: string, data?: Record<string, any>) => {
    trackEvent('click', window.location.pathname, element, data)
  }

  const trackFormSubmit = (formName: string, data?: Record<string, any>) => {
    trackEvent('form_submit', window.location.pathname, formName, data)
  }

  const trackCustomEvent = (eventName: string, data?: Record<string, any>) => {
    trackEvent('custom', window.location.pathname, eventName, data)
  }

  return {
    trackClick,
    trackFormSubmit,
    trackCustomEvent,
  }
}

