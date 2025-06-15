import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { pageService } from '@/services/page.service';
import { Page } from '@/types/page';
import NotFound from './NotFound';

export const PageView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await pageService.getPageBySlug(slug!);
        setPage(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetch();
  }, [slug]);

  if (loading) return <div className="container mx-auto p-4">Загрузка...</div>;
  if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  if (!page) return <NotFound />;

  return (
    <div className="container mx-auto p-6 prose dark:prose-invert">
      <h1>{page.title}</h1>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
}; 