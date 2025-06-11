import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function SitemapEditor() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSitemap = () => {
    setIsGenerating(true);
    // This is a mock implementation.
    // In a real application, you would make an API call here.
    // Example:
    // fetch('/api/seo/generate-sitemap', { method: 'POST' })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Sitemap generation failed');
    //     }
    //     return response.json();
    //   })
    //   .then(() => {
    //     toast.success('Sitemap generated successfully!');
    //   })
    //   .catch(error => {
    //     toast.error(error.message);
    //   })
    //   .finally(() => {
    //     setIsGenerating(false);
    //   });

    setTimeout(() => {
      setIsGenerating(false);
      toast.success('Sitemap generated successfully! (Mock)');
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sitemap Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>Нажмите на кнопку ниже, чтобы сгенерировать или обновить `sitemap.xml` для вашего сайта.</p>
        <Button onClick={handleGenerateSitemap} disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate Sitemap'}
        </Button>
      </CardContent>
    </Card>
  );
} 