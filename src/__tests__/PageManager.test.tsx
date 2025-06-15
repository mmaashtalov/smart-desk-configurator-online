import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

vi.mock('@/services/page.service', async () => {
  const mockPages = [
    { id: '1', title: 'Hello', slug: 'hello', status: 'published', updatedAt: new Date().toISOString() },
    { id: '2', title: 'World', slug: 'world', status: 'draft', updatedAt: new Date().toISOString() },
  ]
  return {
    pageService: {
      getPages: vi.fn().mockResolvedValue({ data: mockPages, total: 2 }),
      deletePage: vi.fn().mockResolvedValue(null),
    },
  }
})

import { PageManager } from '@/pages/PageManager'

describe('PageManager', () => {
  it('renders list of pages and filters by search', async () => {
    render(
      <MemoryRouter initialEntries={["/admin/pages"]}>
        <Routes>
          <Route path="/admin/pages" element={<PageManager />} />
        </Routes>
      </MemoryRouter>
    )

    // Wait for rows
    expect(await screen.findByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('World')).toBeInTheDocument()

    // Search for Hello
    const searchInput = screen.getByPlaceholderText(/Поиск/i)
    fireEvent.change(searchInput, { target: { value: 'Hel' } })

    // wait for debounce (300ms)
    await new Promise((r) => setTimeout(r, 350))

    expect(await screen.findByText('Hello')).toBeInTheDocument()
    expect(screen.queryByText('World')).not.toBeInTheDocument()
  })
})