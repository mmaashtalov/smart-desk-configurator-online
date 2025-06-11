import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { URL, fileURLToPath } from 'node:url';
import { componentTagger } from "lovable-tagger";
import fs from 'node:fs';
import path from 'node:path';
import RSS from 'rss';

const seoApiPlugin = () => {
  const seoDataPath = path.resolve(__dirname, 'seo-data');
  const trackingScriptsPath = path.resolve(seoDataPath, 'tracking.json');
  const blogPostsPath = path.resolve(seoDataPath, 'blog-posts.json');
  const siteSettingsPath = path.resolve(seoDataPath, 'settings.json');

  const getJsonFileContent = (filePath) => {
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(content || '[]');
      }
    } catch (e) {
      console.error(`Error reading ${filePath}:`, e);
    }
    return [];
  };

  return {
    name: 'seo-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/rss.xml') {
          try {
            const siteSettings = getJsonFileContent(siteSettingsPath);
            const posts = getJsonFileContent(blogPostsPath);
            const siteUrl = 'http://localhost:8080'; // Should be dynamic in production

            const feed = new RSS({
              title: siteSettings.siteName || 'Blog',
              description: siteSettings.tagline || 'Blog Description',
              feed_url: `${siteUrl}/rss.xml`,
              site_url: siteUrl,
              language: 'ru',
            });

            posts
              .filter(p => p.status === 'published')
              .forEach(post => {
                feed.item({
                  title: post.title,
                  description: post.seo.metaDescription,
                  url: `${siteUrl}/blog/${post.slug}`,
                  guid: post.id,
                  date: post.createdAt,
                  author: post.author,
                });
              });
            
            const xml = feed.xml({ indent: true });
            res.setHeader('Content-Type', 'application/rss+xml');
            res.end(xml);
            return;

          } catch (e) {
            console.error('Error generating RSS feed:', e);
            res.statusCode = 500;
            res.end('Error generating RSS feed.');
            return;
          }
        }
        
        if (req.url === '/api/seo/tracking') {
          if (req.method === 'GET') {
            const scripts = getJsonFileContent(trackingScriptsPath);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(scripts));
            return;
          }
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', () => {
              fs.writeFileSync(trackingScriptsPath, body, 'utf-8');
              res.statusCode = 200;
              res.end('Tracking scripts saved.');
            });
            return;
          }
        }

        if (req.url.startsWith('/api/seo/')) {
          const resource = req.url.split('/')[3];
          const fileMap = {
            'meta': 'meta.json',
            'robots': 'robots.txt',
            'sitemap': 'sitemap.json',
            'opengraph': 'opengraph.json',
            'redirects': 'redirects.json',
            'clean-params': 'clean-params.json',
            'settings': 'settings.json',
            'blog-posts': 'blog-posts.json'
          };
          const resourceName = resource.split('?')[0]; // Handle query params
          const fileName = fileMap[resourceName];

          if (!fileName) {
            res.statusCode = 404;
            return res.end('Not Found');
          }

          const filePath = path.join(seoDataPath, fileName);

          if (req.method === 'GET') {
            fs.readFile(filePath, 'utf-8', (err, data) => {
              if (err) {
                res.statusCode = 500;
                res.end('Error reading file');
                return;
              }
              res.setHeader('Content-Type', fileName.endsWith('.json') ? 'application/json' : 'text/plain');
              res.end(data);
            });
          } else if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', () => {
              fs.writeFile(filePath, body, 'utf-8', (err) => {
                if (err) {
                  res.statusCode = 500;
                  return res.end('Error writing file');
                }
                res.statusCode = 200;
                res.end('File updated successfully');
              });
            });
          } else {
            next();
          }
        } else {
          next();
        }
      });
    },
    transformIndexHtml(html) {
      const scripts = getJsonFileContent(trackingScriptsPath);
      const scriptTags = scripts.map(s => s.script).join('\\n');
      return html.replace('</head>', `${scriptTags}\\n</head>`);
    }
  }
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    seoApiPlugin(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
}));