import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AnalyticsPageProps {
  children: React.ReactNode;
}

export function AnalyticsPage({ children }: AnalyticsPageProps) {
  const location = useLocation();
  const activeTab = location.pathname.split('/')[3] || 'dashboard';

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4">
        <Link to="/admin">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад в админ-панель
          </Button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">Аналитика</h1>

      <Tabs value={activeTab}>
        <TabsList>
          <Link to="/admin/analytics">
            <TabsTrigger value="dashboard">Дашборд</TabsTrigger>
          </Link>
          <Link to="/admin/analytics/integrations">
            <TabsTrigger value="integrations">Интеграции</TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>

      <div className="mt-8">
        {children}
      </div>
    </div>
  );
}
