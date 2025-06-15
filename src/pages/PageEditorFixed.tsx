import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/github.css';
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
import { pageService } from '@/services/page.service';
import { useDebounce } from '@/hooks/useDebounce';

const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
};
  
export const PageEditorFixed: React.FC = () => {
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
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [checkingSlug, setCheckingSlug] = useState(false);
  const quillRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    if (id) {
      // Supabase fetch
      (async () => {
        try {
          setLoading(true);
          const currentPage = await pageService.getPage(id);
          if (currentPage) {
            setPage(currentPage);
            setLoading(false);
            return;
          }
        } catch (err) {
          toast.error('Не удалось загрузить данные страницы');
          logger.error('Failed to load page data', err instanceof Error ? err : new Error(String(err)), { pageId: id });
        }
      })();
    }
  }, [id]);

  // Debounced slug uniqueness validation
  const debouncedSlug = useDebounce(page.slug, 500);

  useEffect(() => {
    if (!debouncedSlug) {
      setSlugAvailable(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        setCheckingSlug(true);
        const unique = await pageService.isSlugUnique(debouncedSlug, id);
        if (!cancelled) setSlugAvailable(unique);
      } catch {
        /* ignore */
      } finally {
        if (!cancelled) setCheckingSlug(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [debouncedSlug, id]);

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

  const handleSave = async () => {
    try {
      setLoading(true);
      if (!page.title) {
        toast.error('Заголовок обязателен');
        return;
      }

      if (checkingSlug) {
        toast.error('Дождитесь проверки URL');
        return;
      }

      if (slugAvailable === false) {
        toast.error('URL уже занят');
        return;
      }

      if (id) {
        await pageService.updatePage(id, page as Page);
        toast.success('Страница обновлена');
      } else {
        await pageService.createPage({
          ...(page as Page),
          status: page.status ?? 'draft',
        });
        toast.success('Страница создана');
      }
      navigate('/admin/pages');
    } catch (err) {
      toast.error('Ошибка сохранения');
      logger.error('Failed to save page', err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const range = quillRef.current?.getEditor().getSelection(true);
          if (range && e.target?.result) {
            quillRef.current?.getEditor().insertEmbed(range.index, 'image', e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    };
  };

  const htmlHandler = () => {
    const html = window.prompt('Введите HTML код');
    if (html && quillRef.current) {
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection(true);
      editor.clipboard.dangerouslyPasteHTML(range.index, html);
    }
  };

  const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'html'],
        ['clean'],
      ],
      handlers: {
        image: imageHandler,
        html: htmlHandler,
      },
    },
    syntax: { hljs },
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'link', 'image',
  ];

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
        <Button onClick={handleSave} disabled={loading || checkingSlug || slugAvailable === false}>
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
                    ref={quillRef}
                    theme="snow"
                    value={page.content}
                    onChange={(value) => handleChange('content', value)}
                    modules={quillModules}
                    formats={quillFormats}
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
                {checkingSlug && (
                  <p className="text-xs text-gray-500 mt-1">Проверка…</p>
                )}
                {slugAvailable === false && !checkingSlug && (
                  <p className="text-xs text-red-600 mt-1">Такой URL уже существует</p>
                )}
                {slugAvailable === true && !checkingSlug && (
                  <p className="text-xs text-green-600 mt-1">URL свободен</p>
                )}
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

          <Card>
            <CardHeader>
              <CardTitle>Предпросмотр</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose max-w-none border rounded p-4 bg-white"
                dangerouslySetInnerHTML={{ __html: page.content || '<p><em>Нет контента</em></p>' }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
