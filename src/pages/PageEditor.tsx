import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Page } from '@/types/page';
import { ArrowLeft } from 'lucide-react';
import { logger } from '@/services/logger.service';

const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
};
  

export const PageEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<Partial<Page>>({
    title: '',
    slug: '',
    content: '',
    seo: { metaTitle: '', metaDescription: '' },
    status: 'draft',
  });
  const [loading, setLoading] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch('/seo-data/pages.json')
        .then((res) => res.json())
        .then((pages) => {
          const currentPage = pages.find((p: Page) => p.id === id);
          if (currentPage) {
            setPage(currentPage);
          } else {
            toast.error('Страница не найдена');
            logger.warn('Page not found', { pageId: id });
            navigate('/admin/pages');
          }
        })
        .catch((err) => {
          toast.error('Не удалось загрузить данные страницы');
          logger.error('Failed to load page data', err, { pageId: id });
        })
        .finally(() => setLoading(false));
    }
  }, [id, navigate]);

  const handleChange = (field: string, value: any) => {
    let newPageData: Partial<Page> = { ...page, [field]: value };
    
    if (field === 'title' && autoSlug) {
      newPageData.slug = generateSlug(value);
    }
    
    setPage(newPageData);
  };
  
  const handleSeoChange = (field: string, value: string) => {
    setPage({ ...page, seo: { ...page.seo, [field]: value } });
  };

  const handleSave = () => {
    setLoading(true);
    // TODO: Replace with actual API call to save data
    console.log('Сохранение страницы:', page);
    toast.success(`Страница "${page.title}" успешно сохранена!`);
    setTimeout(() => {
      setLoading(false);
      navigate('/admin/pages');
    }, 1000);
  };

  if (loading && id) {
    return <div>Загрузка редактора...</div>;
  }
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold">{id ? 'Редактировать страницу' : 'Создать новую страницу'}</h1>
        </div>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Заголовок страницы</Label>
                <Input
                  id="title"
                  value={page.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Введите заголовок"
                />
              </div>
              <div>
                <Label htmlFor="content">Содержимое</Label>
                <ReactQuill
                  theme="snow"
                  value={page.content}
                  onChange={(value) => handleChange('content', value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
                <CardTitle>Публикация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div>
                    <Label htmlFor="status">Статус</Label>
                    <Select onValueChange={(value) => handleChange('status', value)} value={page.status}>
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Выберите статус" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="published">Опубликовано</SelectItem>
                            <SelectItem value="draft">Черновик</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>SEO Настройки</CardTitle>
              <CardDescription>URL, мета-заголовок и описание</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-slug">Генерировать URL автоматически</Label>
                <Switch id="auto-slug" checked={autoSlug} onCheckedChange={setAutoSlug} />
              </div>
              <div>
                <Label htmlFor="slug">URL (slug)</Label>
                <Input
                  id="slug"
                  value={page.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  placeholder="naprimer-about-us"
                  disabled={autoSlug}
                />
              </div>
              <div>
                <Label htmlFor="metaTitle">Мета-заголовок</Label>
                <Input
                  id="metaTitle"
                  value={page.seo?.metaTitle}
                  onChange={(e) => handleSeoChange('metaTitle', e.target.value)}
                  placeholder="SEO заголовок для поисковиков"
                />
              </div>
              <div>
                <Label htmlFor="metaDescription">Мета-описание</Label>
                <Input
                  id="metaDescription"
                  value={page.seo?.metaDescription}
                  onChange={(e) => handleSeoChange('metaDescription', e.target.value)}
                  placeholder="Краткое описание для поисковиков"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}; 