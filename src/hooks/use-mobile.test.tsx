import { renderHook, act } from '@testing-library/react'
import { useIsMobile } from './use-mobile'

// Basic mock for matchMedia that supports add/removeEventListener
function createMatchMedia() {
  let listener: ((e: MediaQueryListEvent) => void) | null = null
  const mql: MediaQueryList = {
    matches: false,
    media: '(max-width: 767px)',
    onchange: null,
    addEventListener: (_event, cb) => {
      listener = cb as any
    },
    removeEventListener: () => {
      listener = null
    },
    dispatchEvent: () => false,
    addListener: () => {},
    removeListener: () => {},
  } as any
  return { mql, trigger: () => listener && listener({ matches: mql.matches } as any) }
}

describe('useIsMobile', () => {
  const origMatchMedia = window.matchMedia
  const origInnerWidth = window.innerWidth

  afterEach(() => {
    Object.defineProperty(window, 'matchMedia', { value: origMatchMedia })
    Object.defineProperty(window, 'innerWidth', { value: origInnerWidth, writable: true })
  })

  it('returns true when window width is below breakpoint', () => {
    const { mql } = createMatchMedia()
    Object.defineProperty(window, 'matchMedia', { value: () => mql })
    Object.defineProperty(window, 'innerWidth', { value: 500, writable: true })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('reacts to viewport changes', () => {
    const { mql, trigger } = createMatchMedia()
    Object.defineProperty(window, 'matchMedia', { value: () => mql })

    // start wide desktop
    Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true })
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)

    // switch to mobile width and notify listener
    act(() => {
      Object.defineProperty(window, 'innerWidth', { value: 600, writable: true })
      trigger()
    })
    expect(result.current).toBe(true)
  })
}) 