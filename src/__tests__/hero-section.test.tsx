import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';

// Mock react-router-dom to handle the Link component
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Link: (props: any) => <a {...props} href={props.to}>{props.children}</a>,
  };
});

const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('HeroSection', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('displays the first slide initially', () => {
    renderWithRouter(<HeroSection />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Создавайте свой идеальный стол/i);
  });

  it('cycles to the next slide after 7 seconds', () => {
    renderWithRouter(<HeroSection />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Создавайте свой идеальный стол/i);

    act(() => {
        vi.advanceTimersByTime(7000);
    });

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Мастерство/i);
  });

  it('changes slide when an indicator is clicked', () => {
    renderWithRouter(<HeroSection />);
    
    const slide2Indicator = screen.getByRole('button', { name: /Перейти к слайду 2/i });
    act(() => {
        fireEvent.click(slide2Indicator);
    });

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Мастерство/i);

    const slide3Indicator = screen.getByRole('button', { name: /Перейти к слайду 3/i });
    act(() => {
        fireEvent.click(slide3Indicator);
    });

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Индивидуальность/i);
  });

  it('jumps to the correct slide on indicator click regardless of current slide', () => {
    renderWithRouter(<HeroSection />);
    
    // Jump from 1 to 3
    const slide3Indicator = screen.getByRole('button', { name: /Перейти к слайду 3/i });
    act(() => {
        fireEvent.click(slide3Indicator);
    });

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Индивидуальность/i);
  });

  it('resets the autoplay timer on indicator click', () => {
    renderWithRouter(<HeroSection />);
    
    act(() => {
        vi.advanceTimersByTime(6000);
    });

    // At 6s, we are still on slide 1.
    // Clicking an indicator should reset the 7s timer.
    const slide2Indicator = screen.getByRole('button', { name: /Перейти к слайду 2/i });
    act(() => {
        fireEvent.click(slide2Indicator);
    });
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Мастерство/i);

    // After another 6.9s, we should still be on slide 2.
    act(() => {
        vi.advanceTimersByTime(6999);
    });
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Мастерство/i);

    // Only after 7s total should it switch to slide 3.
    act(() => {
        vi.advanceTimersByTime(1);
    });
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Индивидуальность/i);
  });
});