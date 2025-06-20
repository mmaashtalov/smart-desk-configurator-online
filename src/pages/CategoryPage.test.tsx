import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CategoryPage from './CategoryPage';
import { AnalyticsProvider } from '../contexts/AnalyticsContext';

// Мокаем useNavigate, чтобы отслеживать вызовы
const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedUseNavigate,
    };
});

// Мокаем данные, чтобы тест был изолированным
vi.mock('../data/catalog', () => ({
  CATEGORIES: [
    { id: 'test-category', name: 'Тестовая категория', description: 'Описание тестовой категории', path: '/catalog/test-category', image: '' },
    { id: 'empty-category', name: 'Пустая категория', description: 'Описание пустой категории', path: '/catalog/empty-category', image: '' },
  ],
  PRODUCTS: [
    {
      id: 'test-product-1',
      category: 'test-category',
      title: 'Тестовый стул 1',
      description: 'Описание тестового стула 1',
      images: ['/images/test1.jpg'],
      features: ['Фича 1', 'Фича 2'],
      price: 9999,
      seo: { metaTitle: 'Test Product 1', metaDescription: 'Test Description 1' },
    },
    {
      id: 'test-product-2',
      category: 'test-category',
      title: 'Тестовый стул 2',
      description: 'Описание тестового стула 2',
      images: ['/images/test2.jpg'],
      features: ['Фича 3', 'Фича 4'],
      price: 12345,
      seo: { metaTitle: 'Test Product 2', metaDescription: 'Test Description 2' },
    },
  ],
}));

// Хелпер для рендера компонента с роутером и провайдером
const renderCategoryPage = (categoryId: string) => {
  return render(
    <AnalyticsProvider>
      <MemoryRouter initialEntries={[`/catalog/${categoryId}`]}>
        <Routes>
          <Route path="/catalog/:categoryId" element={<CategoryPage />} />
        </Routes>
      </MemoryRouter>
    </AnalyticsProvider>
  );
};

describe('CategoryPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

  it('должен рендерить товары для выбранной категории', () => {
    renderCategoryPage('test-category');

    expect(screen.getByRole('heading', { name: /Тестовая категория/i })).toBeInTheDocument();
    expect(screen.getByText('Тестовый стул 1')).toBeInTheDocument();
    expect(screen.getByText('Тестовый стул 2')).toBeInTheDocument();
  });

  it('должен показывать сообщение, если в категории нет товаров', () => {
    renderCategoryPage('empty-category');
    expect(screen.getByRole('heading', { name: /Пустая категория/i })).toBeInTheDocument();
    expect(screen.getByText(/В этой категории пока нет товаров/i)).toBeInTheDocument();
  });

  it('должен вызывать navigate на /404 для несуществующей категории', () => {
    renderCategoryPage('non-existent-category');
    expect(mockedUseNavigate).toHaveBeenCalledWith('/404', { replace: true });
  });
});