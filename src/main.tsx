import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import { ChatProvider } from './contexts/ChatContext';
import { SEOProvider } from './contexts/SEOContext';
import { AnalyticsProvider } from './contexts/AnalyticsContext';

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
