import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { logger } from '../logger.service'

// Helper to capture console output
const createConsoleMock = () => {
  const original = {
    debug: console.debug,
    info: console.info,
    warn: console.warn,
    error: console.error,
  }
  const mocks = {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  }
  beforeEach(() => {
    Object.assign(console, mocks)
  })
  afterEach(() => {
    Object.assign(console, original)
  })
  return mocks
}

describe('logger.service', () => {
  const mocks = createConsoleMock()

  it('logs debug message', () => {
    logger.debug('test debug', { foo: 'bar' })
    expect(mocks.debug).toHaveBeenCalledTimes(1)
    const arg = mocks.debug.mock.calls[0][0] as string
    const parsed = JSON.parse(arg)
    expect(parsed.level).toBe('DEBUG')
    expect(parsed.message).toBe('test debug')
    expect(parsed.context.foo).toBe('bar')
  })

  it('logs info message', () => {
    logger.info('hello')
    expect(mocks.info).toHaveBeenCalledTimes(1)
    const parsed = JSON.parse(mocks.info.mock.calls[0][0] as string)
    expect(parsed.level).toBe('INFO')
  })

  it('logs warn message', () => {
    logger.warn('warn msg')
    expect(mocks.warn).toHaveBeenCalledTimes(1)
    const parsed = JSON.parse(mocks.warn.mock.calls[0][0] as string)
    expect(parsed.level).toBe('WARN')
  })

  it('logs error message and stack', () => {
    const err = new Error('fail')
    logger.error('something failed', err)
    expect(mocks.error).toHaveBeenCalledTimes(1)
    const parsed = JSON.parse(mocks.error.mock.calls[0][0] as string)
    expect(parsed.level).toBe('ERROR')
    expect(parsed.context.error.message).toBe('fail')
  })
}) 