import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MetaEditor } from './seo/MetaEditor';
import { RobotsEditor } from './seo/RobotsEditor';
import { SitemapEditor } from './seo/SitemapEditor';
import { OpenGraphEditor } from './seo/OpenGraphEditor';
import { RedirectsEditor } from './seo/RedirectsEditor';
import { CleanParamsEditor } from './seo/CleanParamsEditor';

export function SEOSettings() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-4">
        <Link to="/admin">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад
          </Button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">SEO-панель</h1>
      <Tabs defaultValue="meta">
        <TabsList>
          <TabsTrigger value="meta">Meta</TabsTrigger>
          <TabsTrigger value="robots">Robots</TabsTrigger>
          <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
          <TabsTrigger value="opengraph">OpenGraph</TabsTrigger>
          <TabsTrigger value="redirects">Редиректы</TabsTrigger>
          <TabsTrigger value="clean-params">Clean-param</TabsTrigger>
        </TabsList>
        <TabsContent value="meta">
          <MetaEditor />
        </TabsContent>
        <TabsContent value="robots">
          <RobotsEditor />
        </TabsContent>
        <TabsContent value="sitemap">
          <SitemapEditor />
        </TabsContent>
        <TabsContent value="opengraph">
          <OpenGraphEditor />
        </TabsContent>
        <TabsContent value="redirects">
          <RedirectsEditor />
        </TabsContent>
        <TabsContent value="clean-params">
          <CleanParamsEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
}

