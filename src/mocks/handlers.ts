import { http, HttpResponse } from 'msw';

const initialMeta = {
  title: 'Initial Meta Title',
  description: 'Initial meta description.',
  h1: 'Initial H1 Header',
  verification: {
    google: 'google-verification-code-123',
    yandex: 'yandex-verification-code-456',
  },
};

const initialRobots = `User-agent: *
Allow: /
`;

const initialRedirects = [
  { from: '/old-path-1', to: '/new-path-1' },
  { from: '/old-path-2', to: '/new-path-2' },
];

const initialCleanParams = ['utm_source', 'utm_medium'];

const initialOpenGraph = {
  title: 'Initial OG Title',
  description: 'Initial OG description.',
  image: 'https://example.com/initial-og-image.jpg',
};

export const handlers = [
  // Meta
  http.get('/api/seo/meta', () => {
    return HttpResponse.json(initialMeta);
  }),
  http.post('/api/seo/meta', () => {
    return new HttpResponse(null, { status: 200 });
  }),

  // Robots
  http.get('/api/seo/robots', () => {
    return HttpResponse.text(initialRobots);
  }),
  http.post('/api/seo/robots', () => {
    return new HttpResponse(null, { status: 200 });
  }),
  
  // Redirects
  http.get('/api/seo/redirects', () => {
    return HttpResponse.json(initialRedirects);
  }),
  http.post('/api/seo/redirects', () => {
    return new HttpResponse(null, { status: 200 });
  }),
  
  // Clean Params
  http.get('/api/seo/clean-params', () => {
    return HttpResponse.json(initialCleanParams);
  }),
  http.post('/api/seo/clean-params', () => {
    return new HttpResponse(null, { status: 200 });
  }),
  
  // OpenGraph
  http.get('/api/seo/opengraph', () => {
    return HttpResponse.json(initialOpenGraph);
  }),
  http.post('/api/seo/opengraph', () => {
    return new HttpResponse(null, { status: 200 });
  }),

  // Sitemap
  http.post('/api/seo/generate-sitemap', () => {
    return new HttpResponse(null, { status: 200 });
  }),
]; 