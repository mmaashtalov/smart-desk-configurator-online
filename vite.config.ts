import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { URL, fileURLToPath } from 'node:url';
import { componentTagger } from "lovable-tagger";
import fs from 'node:fs';
import path from 'node:path';

const seoApiPlugin = () => ({
  name: 'seo-api-plugin',
  configureServer(server) {
    const seoDataPath = path.resolve(__dirname, 'seo-data');

    server.middlewares.use((req, res, next) => {
      if (req.url.startsWith('/api/seo/')) {
        const resource = req.url.split('/')[3];
        const fileMap = {
          'meta': 'meta.json',
          'robots': 'robots.txt',
          'sitemap': 'sitemap.json',
          'opengraph': 'opengraph.json',
          'redirects': 'redirects.json',
          'clean-params': 'clean-params.json',
        };
        const fileName = fileMap[resource];

        if (!fileName) {
          res.statusCode = 404;
          return res.end('Not Found');
        }

        const filePath = path.join(seoDataPath, fileName);

        if (req.method === 'GET') {
          fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
              res.statusCode = 500;
              return res.end('Error reading file');
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
  }
});

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