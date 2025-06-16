import { describe, it, expect, afterEach } from 'vitest'
import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { AnalyticsProvider, useAnalytics } from '../AnalyticsContext'

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AnalyticsProvider>{children}</AnalyticsProvider>
)

afterEach(() => {
  localStorage.clear()
})

describe('AnalyticsContext', () => {
  it('trackPageView records an event', () => {
    const { result } = renderHook(() => useAnalytics(), { wrapper })
    act(() => {
      result.current.trackPageView('/about')
    })
    const events = result.current.getEvents()
    expect(events.length).toBeGreaterThanOrEqual(1)
    expect(events[events.length - 1].page).toBe('/about')
    expect(events[events.length - 1].type).toBe('page_view')
  })

  it('trackEvent and metrics calculations work', () => {
    const { result } = renderHook(() => useAnalytics(), { wrapper })
    act(() => {
      result.current.trackEvent('click', '/home', 'buy-button')
      result.current.trackEvent('click', '/home', 'buy-button')
    })

    const metrics = result.current.getMetrics()
    expect(metrics.topEvents[0].event).toBe('buy-button')
    expect(metrics.topEvents[0].count).toBe(2)
  })

  it('clearData removes events', () => {
    const { result } = renderHook(() => useAnalytics(), { wrapper })
    act(() => {
      result.current.trackPageView('/test')
    })
    expect(result.current.getEvents().length).toBeGreaterThan(0)
    act(() => {
      result.current.clearData()
    })
    expect(result.current.getEvents().length).toBe(0)
  })
}) 