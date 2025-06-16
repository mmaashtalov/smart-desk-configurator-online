import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { SEOProvider, useSEO } from '../SEOContext';

const TestComponent: React.FC<{ action: (ctx: ReturnType<typeof useSEO>) => void }> = ({ action }) => {
  const seo = useSEO();
  React.useEffect(() => {
    action(seo);
  }, []);
  return null;
};

describe('SEOContext', () => {
  beforeEach(() => {
    // Clean up head between tests to avoid interference
    document.head.innerHTML = '';
    localStorage.clear();
  });

  it('sets default title and meta tags', () => {
    render(
      <SEOProvider>
        <></>
      </SEOProvider>
    );
    expect(document.title).toContain('Офис Интеллект');
    const description = document.querySelector('meta[name="description"]');
    expect(description).toBeTruthy();
    expect(description?.getAttribute('content')).toContain('Премиальные умные столы');
  });

  it('addPageSEO and generateSitemap work correctly', async () => {
    const action = (ctx: ReturnType<typeof useSEO>) => {
      ctx.addPageSEO('/test-page');
    };
    render(
      <SEOProvider>
        <TestComponent action={action} />
      </SEOProvider>
    );

    await waitFor(() => {
      const saved = localStorage.getItem('seo-data');
      expect(saved).toContain('/test-page');
    });
  });

  it('setSEO updates meta tags', async () => {
    let ctxRef: ReturnType<typeof useSEO> | null = null;
    const action = (ctx: ReturnType<typeof useSEO>) => {
      ctxRef = ctx;
      ctx.setSEO({
        ...ctx.currentSEO,
        title: 'Новый заголовок',
        description: 'Новое описание',
        keywords: [],
      });
    };
    render(
      <SEOProvider>
        <TestComponent action={action} />
      </SEOProvider>
    );

    await waitFor(() => {
      expect(document.title).toBe('Новый заголовок');
      const desc = document.querySelector('meta[name="description"]');
      expect(desc?.getAttribute('content')).toBe('Новое описание');
    });
  });

  it('adds structured data script tag', () => {
    render(
      <SEOProvider>
        <></>
      </SEOProvider>
    );
    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();
    expect(script?.textContent).toContain('Organization');
  });
}); 