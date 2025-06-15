import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

// Mock heavy dependencies
vi.mock('react-quill-new', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="quill-mock" />,
  }
})

vi.mock('@/services/page.service', async () => {
  return {
    pageService: {
      getPage: vi.fn().mockResolvedValue(undefined),
      isSlugUnique: vi.fn().mockResolvedValue(true),
    },
  }
})

import { PageEditorFixed } from '@/pages/PageEditorFixed'

describe('PageEditorFixed', () => {
  it('renders create page heading when no id param', async () => {
    render(
      <MemoryRouter initialEntries={["/admin/pages/new"]}>
        <Routes>
          <Route path="/admin/pages/new" element={<PageEditorFixed />} />
        </Routes>
      </MemoryRouter>
    )

    expect(
      await screen.findByRole('heading', { name: /Создать новую страницу/i })
    ).toBeInTheDocument()
  })
}) 