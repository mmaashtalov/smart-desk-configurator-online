import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import { ChatProvider } from './contexts/ChatContext';
import { SEOProvider } from './contexts/SEOContext';
import { AnalyticsProvider } from './contexts/AnalyticsContext';

async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return
  }
 
  const { worker } = await import('./mocks/browser')
 
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}

const renderApp = () => {
  createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <HelmetProvider>
        <SEOProvider>
          <AnalyticsProvider>
            <ChatProvider>
              <App />
            </ChatProvider>
          </AnalyticsProvider>
        </SEOProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
};

if (import.meta.env.MODE === 'development') {
  enableMocking().then(renderApp);
} else {
  renderApp();
}
