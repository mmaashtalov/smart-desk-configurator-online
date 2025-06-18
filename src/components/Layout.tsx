import React from 'react';
import { Outlet } from 'react-router-dom';
import { NewHeader } from './NewHeader';
import { Footer } from './Footer';
import { usePageTracking } from '@/hooks/useAnalytics'

const Layout: React.FC = () => {
  usePageTracking()

  return (
    <div className="flex flex-col min-h-screen">
      <NewHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
export { Layout };

