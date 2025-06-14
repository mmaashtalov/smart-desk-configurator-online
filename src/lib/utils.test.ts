import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  cn,
  formatDate,
  formatNumber,
  formatCurrency,
  generateId,
  debounce,
  throttle,
  getDeviceType,
  getTrafficSource
} from './utils'

// Utility to temporarily override global properties
const withOverride = <T extends object, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K],
  fn: () => void
) => {
  const original = obj[key]
  Object.defineProperty(obj, key, { configurable: true, writable: true, value })
  try {
    fn()
  } finally {
    Object.defineProperty(obj, key, {
      configurable: true,
      writable: true,
      value: original,
    })
  }
}

describe('utils.ts', () => {
  it('cn merges class names', () => {
    expect(cn('foo', undefined, 'bar')).toBe('foo bar')
  })

  it('formatDate returns localized string', () => {
    const result = formatDate('2020-01-02')
    expect(result).toContain('2020')
    expect(result.toLowerCase()).toContain('январ') // месяц по-русски
  })

  it('formatNumber adds group separators', () => {
    expect(formatNumber(1234567)).toMatch(/1\D?234\D?567/)
  })

  it('formatCurrency outputs RUB sign', () => {
    expect(formatCurrency(1999)).toMatch(/₽/)
  })

  it('generateId creates unique 9-char ids', () => {
    const id1 = generateId()
    const id2 = generateId()
    expect(id1).toHaveLength(9)
    expect(id2).toHaveLength(9)
    expect(id1).not.toBe(id2)
  })

  describe('debounce', () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => vi.useRealTimers())

    it('invokes function after wait', () => {
      const spy = vi.fn()
      const debounced = debounce(spy, 200)
      debounced('first')
      debounced('second')
      vi.advanceTimersByTime(199)
      expect(spy).not.toHaveBeenCalled()
      vi.advanceTimersByTime(1)
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith('second')
    })
  })

  describe('throttle', () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => vi.useRealTimers())

    it('limits function calls to one per interval', () => {
      const spy = vi.fn()
      const throttled = throttle(spy, 100)
      throttled()
      throttled()
      expect(spy).toHaveBeenCalledTimes(1)
      vi.advanceTimersByTime(100)
      throttled()
      expect(spy).toHaveBeenCalledTimes(2)
    })
  })

  describe('getDeviceType', () => {
    it('detects mobile/tablet/desktop', () => {
      withOverride(window, 'innerWidth', 500 as any, () => {
        expect(getDeviceType()).toBe('mobile')
      })
      withOverride(window, 'innerWidth', 800 as any, () => {
        expect(getDeviceType()).toBe('tablet')
      })
      withOverride(window, 'innerWidth', 1280 as any, () => {
        expect(getDeviceType()).toBe('desktop')
      })
    })
  })

  describe('getTrafficSource', () => {
    it('returns correct source based on referrer', () => {
      withOverride(document, 'referrer', 'https://www.google.com' as any, () => {
        expect(getTrafficSource()).toBe('google')
      })
      withOverride(document, 'referrer', 'https://vk.com' as any, () => {
        expect(getTrafficSource()).toBe('vkontakte')
      })
      withOverride(document, 'referrer', '' as any, () => {
        expect(getTrafficSource()).toBe('direct')
      })
    })
  })
}) 