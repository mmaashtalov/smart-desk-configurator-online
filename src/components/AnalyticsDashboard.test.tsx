/// <reference types="vitest/globals" />
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { AnalyticsContext } from '@/contexts/AnalyticsContext';
import { useEventTracking } from '@/hooks/useAnalytics';

vi.mock('@/hooks/useAnalytics', () => ({
  useEventTracking: () => ({
    trackClick: vi.fn(),
  }),
}));

const mockGetMetrics = vi.fn();
const mockGetEvents = vi.fn();
const mockExportData = vi.fn();
const mockClearData = vi.fn();

const renderWithProvider = (component) => {
  return render(
    <MemoryRouter>
      <AnalyticsContext.Provider value={{
        getMetrics: mockGetMetrics,
        getEvents: mockGetEvents,
        exportData: mockExportData,
        clearData: mockClearData,
        trackEvent: vi.fn(),
        trackPageView: vi.fn(),
      }}>
        {component}
      </AnalyticsContext.Provider>
    </MemoryRouter>
  );
};

describe('AnalyticsDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetMetrics.mockReturnValue({ pageViews: 100, uniqueVisitors: 50, bounceRate: 25 });
    mockGetEvents.mockReturnValue([]);
  });

  it('renders correctly', () => {
    renderWithProvider(<AnalyticsDashboard />);
    expect(screen.getByText('Аналитика')).toBeInTheDocument();
  });

  it('loads data on mount and when date range changes', () => {
    renderWithProvider(<AnalyticsDashboard />);
    expect(mockGetMetrics).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('30 дней'));
    expect(mockGetMetrics).toHaveBeenCalledTimes(2);
  });

  it('calls exportData on export button click', () => {
    renderWithProvider(<AnalyticsDashboard />);
    fireEvent.click(screen.getByText('Экспорт'));
    expect(mockExportData).toHaveBeenCalled();
  });

  it('calls clearData on clear button click', () => {
    window.confirm = vi.fn(() => true);
    renderWithProvider(<AnalyticsDashboard />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Очистить' }));

    expect(mockClearData).toHaveBeenCalled();
  });
}); 