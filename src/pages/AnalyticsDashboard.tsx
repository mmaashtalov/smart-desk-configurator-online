import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Eye, MousePointerClick, TrendingUp } from 'lucide-react';

const AnalyticsDashboard = () => {
  // Mock data for demonstration
  const stats = [
    { title: 'Total Visitors', value: '1,254', icon: <Users className="h-6 w-6 text-gray-500" /> },
    { title: 'Page Views', value: '12,897', icon: <Eye className="h-6 w-6 text-gray-500" /> },
    { title: 'Click-Through Rate', value: '2.3%', icon: <MousePointerClick className="h-6 w-6 text-gray-500" /> },
    { title: 'Conversion Rate', value: '1.1%', icon: <TrendingUp className="h-6 w-6 text-gray-500" /> },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Дашборд аналитики</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
       <div className="mt-8 border-dashed border-2 border-gray-300 rounded-lg p-8 text-center">
        <p className="text-gray-500">Здесь будут размещены дополнительные графики и отчеты.</p>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 