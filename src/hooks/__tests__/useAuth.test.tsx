import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '../useAuth'
import { logger } from '@/services/logger.service'

// Mock logger to silence output
vi.spyOn(logger, 'info').mockImplementation(() => {})
vi.spyOn(logger, 'warn').mockImplementation(() => {})
vi.spyOn(logger, 'error').mockImplementation(() => {})

const clearStorage = () => {
  localStorage.clear()
}

describe('useAuth', () => {
  beforeEach(clearStorage)
  afterEach(clearStorage)

  it('initially not authenticated', () => {
    const { result } = renderHook(() => useAuth())
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBeNull()
    expect(result.current.loading).toBe(false)
  })

  it('login with correct credentials succeeds', async () => {
    const { result } = renderHook(() => useAuth())
    await act(async () => {
      const res = await result.current.login('admin@office-intellect.ru', 'admin123')
      expect(res.success).toBe(true)
    })
    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.user?.email).toBe('admin@office-intellect.ru')
    // Ensure token stored
    expect(localStorage.getItem('auth-token')).toBe('mock-token')
  })

  it('login with wrong credentials fails', async () => {
    const { result } = renderHook(() => useAuth())
    let response: any
    await act(async () => {
      response = await result.current.login('wrong@example.com', 'bad')
    })
    expect(response.success).toBe(false)
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('logout clears auth state', async () => {
    const { result } = renderHook(() => useAuth())
    await act(async () => {
      await result.current.login('admin@office-intellect.ru', 'admin123')
    })
    expect(result.current.isAuthenticated).toBe(true)
    act(() => {
      result.current.logout()
    })
    expect(result.current.isAuthenticated).toBe(false)
    expect(localStorage.getItem('auth-token')).toBeNull()
  })
}) 