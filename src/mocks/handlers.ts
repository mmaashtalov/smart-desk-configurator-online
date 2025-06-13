import { http, HttpResponse, passthrough } from 'msw';

const mockMeta = {
  title: 'Главная страница',
  description: 'Лучший конфигуратор столов',
  h1: 'Соберите стол своей мечты',
  verification: {
    google: 'google-verification-code',
    yandex: 'yandex-verification-code',
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

const initialSettings = {
  siteName: 'SmartDesk',
  tagline: 'Инновационные столы для вашего комфорта',
  contactEmail: 'support@smartdesk.com',
  phone: '+7 (999) 123-45-67',
  address: 'г. Москва, ул. Примерная, д. 1',
  socialLinks: {
    vk: 'https://vk.com/smartdesk',
    telegram: 'https://t.me/smartdesk',
    instagram: 'https://instagram.com/smartdesk',
  }
};

const initialBlogPosts = [
  {
    id: '1',
    title: 'Первый пост в блоге',
    slug: 'pervyy-post-v-bloge',
    content: '<h2>Добро пожаловать!</h2><p>Это содержимое вашего первого поста в блоге. Вы можете редактировать его в админ-панели.</p>',
    featuredImage: 'https://via.placeholder.com/800x400.png?text=Featured+Image',
    author: 'Admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    seo: {
      metaTitle: 'Первый пост в блоге - SEO Заголовок',
      metaDescription: 'SEO описание для первого поста в блоге.',
    },
    openGraph: {
      title: 'Первый пост в блоге - OG Заголовок',
      description: 'OG описание для первого поста в блоге.',
      image: 'https://via.placeholder.com/1200x630.png?text=OG+Image',
    },
    status: 'published',
  },
];

export const handlers = [
  // Meta
  http.get('/api/seo/meta', () => {
    return HttpResponse.json(mockMeta);
  }),
  http.post('/api/seo/meta', async ({ request }) => {
    const newData = await request.json();
    console.log('MSW: Received POST data:', newData);
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
  
  // Settings
  http.get('/api/seo/settings', () => {
    return HttpResponse.json(initialSettings);
  }),
  http.post('/api/seo/settings', async ({ request }) => {
    const newSettings = await request.json();
    console.log('Updated settings:', newSettings);
    return new HttpResponse(null, { status: 200 });
  }),
  
  // Blog Posts
  http.get('/api/seo/blog-posts', ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (id) {
      const post = initialBlogPosts.find(p => p.id === id);
      return HttpResponse.json(post);
    }
    return HttpResponse.json(initialBlogPosts);
  }),
  http.post('/api/seo/blog-posts', async ({ request }) => {
    const newPost = await request.json();
    console.log('New/Updated post:', newPost);
    return new HttpResponse(null, { status: 200 });
  }),

  // Passthrough for root path to prevent MSW interception warnings
  http.get('/', () => passthrough()),

  // Passthrough for Unsplash images to prevent MSW interception warnings
  http.get('https://images.unsplash.com/*', () => passthrough()),
];