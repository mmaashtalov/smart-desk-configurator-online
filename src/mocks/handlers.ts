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
  {
    id: '2',
    title: 'Тестовая статья №2',
    slug: 'testovaya-statya-2',
    content: '<h2>Контент статьи 2</h2><p>Демонстрационный текст для статьи 2.</p>',
    featuredImage: 'https://via.placeholder.com/800x400.png?text=Post+2',
    author: 'Admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    seo: { metaTitle: 'Тестовая статья 2 - SEO Заголовок', metaDescription: 'SEO описание для тестовой статьи 2.' },
    openGraph: { title: 'Тестовая статья 2 - OG Заголовок', description: 'OG описание для тестовой статьи 2.', image: 'https://via.placeholder.com/1200x630.png?text=OG+2' },
    status: 'published',
  },
  {
    id: '3',
    title: 'Тестовая статья №3',
    slug: 'testovaya-statya-3',
    content: '<h2>Контент статьи 3</h2><p>Демонстрационный текст для статьи 3.</p>',
    featuredImage: 'https://via.placeholder.com/800x400.png?text=Post+3',
    author: 'Admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    seo: { metaTitle: 'Тестовая статья 3 - SEO Заголовок', metaDescription: 'SEO описание для тестовой статьи 3.' },
    openGraph: { title: 'Тестовая статья 3 - OG Заголовок', description: 'OG описание для тестовой статьи 3.', image: 'https://via.placeholder.com/1200x630.png?text=OG+3' },
    status: 'published',
  },
  {
    id: '4',
    title: 'Тестовая статья №4',
    slug: 'testovaya-statya-4',
    content: '<h2>Контент статьи 4</h2><p>Демонстрационный текст для статьи 4.</p>',
    featuredImage: 'https://via.placeholder.com/800x400.png?text=Post+4',
    author: 'Admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    seo: { metaTitle: 'Тестовая статья 4 - SEO Заголовок', metaDescription: 'SEO описание для тестовой статьи 4.' },
    openGraph: { title: 'Тестовая статья 4 - OG Заголовок', description: 'OG описание для тестовой статьи 4.', image: 'https://via.placeholder.com/1200x630.png?text=OG+4' },
    status: 'published',
  },
  {
    id: '5',
    title: 'Тестовая статья №5',
    slug: 'testovaya-statya-5',
    content: '<h2>Контент статьи 5</h2><p>Демонстрационный текст для статьи 5.</p>',
    featuredImage: 'https://via.placeholder.com/800x400.png?text=Post+5',
    author: 'Admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    seo: { metaTitle: 'Тестовая статья 5 - SEO Заголовок', metaDescription: 'SEO описание для тестовой статьи 5.' },
    openGraph: { title: 'Тестовая статья 5 - OG Заголовок', description: 'OG описание для тестовой статьи 5.', image: 'https://via.placeholder.com/1200x630.png?text=OG+5' },
    status: 'published',
  },
  {
    id: '6',
    title: 'Тестовая статья №6',
    slug: 'testovaya-statya-6',
    content: '<h2>Контент статьи 6</h2><p>Демонстрационный текст для статьи 6.</p>',
    featuredImage: 'https://via.placeholder.com/800x400.png?text=Post+6',
    author: 'Admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    seo: { metaTitle: 'Тестовая статья 6 - SEO Заголовок', metaDescription: 'SEO описание для тестовой статьи 6.' },
    openGraph: { title: 'Тестовая статья 6 - OG Заголовок', description: 'OG описание для тестовой статьи 6.', image: 'https://via.placeholder.com/1200x630.png?text=OG+6' },
    status: 'published',
  },
  {
    id: '7',
    title: 'Тестовая статья №7',
    slug: 'testovaya-statya-7',
    content: '<h2>Контент статьи 7</h2><p>Демонстрационный текст для статьи 7.</p>',
    featuredImage: 'https://via.placeholder.com/800x400.png?text=Post+7',
    author: 'Admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    seo: { metaTitle: 'Тестовая статья 7 - SEO Заголовок', metaDescription: 'SEO описание для тестовой статьи 7.' },
    openGraph: { title: 'Тестовая статья 7 - OG Заголовок', description: 'OG описание для тестовой статьи 7.', image: 'https://via.placeholder.com/1200x630.png?text=OG+7' },
    status: 'published',
  },
  {
    id: '8',
    title: 'Тестовая статья №8',
    slug: 'testovaya-statya-8',
    content: '<h2>Контент статьи 8</h2><p>Демонстрационный текст для статьи 8.</p>',
    featuredImage: 'https://via.placeholder.com/800x400.png?text=Post+8',
    author: 'Admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    seo: { metaTitle: 'Тестовая статья 8 - SEO Заголовок', metaDescription: 'SEO описание для тестовой статьи 8.' },
    openGraph: { title: 'Тестовая статья 8 - OG Заголовок', description: 'OG описание для тестовой статьи 8.', image: 'https://via.placeholder.com/1200x630.png?text=OG+8' },
    status: 'published',
  },
  {
    id: '9',
    title: 'Тестовая статья №9',
    slug: 'testovaya-statya-9',
    content: '<h2>Контент статьи 9</h2><p>Демонстрационный текст для статьи 9.</p>',
    featuredImage: 'https://via.placeholder.com/800x400.png?text=Post+9',
    author: 'Admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    seo: { metaTitle: 'Тестовая статья 9 - SEO Заголовок', metaDescription: 'SEO описание для тестовой статьи 9.' },
    openGraph: { title: 'Тестовая статья 9 - OG Заголовок', description: 'OG описание для тестовой статьи 9.', image: 'https://via.placeholder.com/1200x630.png?text=OG+9' },
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