import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; // import styles
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

// This type should be shared
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft';
  seo: { metaTitle: string; metaDescription: string };
  openGraph: { title: string; description: string; };
}

export const BlogPostEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    content: '',
    status: 'draft',
    seo: { metaTitle: '', metaDescription: '' },
    openGraph: { title: '', description: '' },
  });
  const [loading, setLoading] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`/api/seo/blog-posts?id=${id}`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            setPost(data);
            if (data.slug) {
              setAutoSlug(false);
            }
          }
          setLoading(false);
        })
        .catch(() => toast.error('Failed to load post.'));
    }
  }, [id]);

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/\\s+/g, '-').replace(/[^\\w-]+/g, '');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    setPost(prev => {
      let newPost;
      if (keys.length > 1) {
        newPost = {
          ...prev,
          [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
        };
      } else {
        newPost = { ...prev, [name]: value };
      }

      if (name === 'title' && autoSlug) {
        newPost.slug = generateSlug(value);
      }

      return newPost;
    });
  };

  const handleContentChange = (content: string) => {
    setPost(prev => ({ ...prev, content }));
  };
  
  const handleStatusChange = (status: 'published' | 'draft') => {
    setPost(prev => ({ ...prev, status }));
  };

  const handleSave = () => {
    const dataToSave = { ...post };
    if (autoSlug || !post.slug) {
        dataToSave.slug = generateSlug(post.title);
    }
    
    fetch('/api/seo/blog-posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSave),
    }).then(res => {
      if (res.ok) {
        toast.success('Post saved successfully!');
        navigate('/admin/blog');
      } else {
        toast.error('Failed to save post.');
      }
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold">{id ? 'Редактировать статью' : 'Создать новую статью'}</h1>
        </div>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                <CardTitle>Основной контент</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Заголовок статьи</Label>
                    <Input id="title" name="title" value={post.title} onChange={handleChange} placeholder="Введите заголовок" />
                </div>
                <div className="space-y-2">
                    <Label>Содержимое статьи</Label>
                    <ReactQuill theme="snow" value={post.content} onChange={handleContentChange} />
                </div>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            <Card>
                <CardHeader>
                <CardTitle>Настройки публикации</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Статус</Label>
                    <Select value={post.status} onValueChange={handleStatusChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Выберите статус" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="draft">Черновик</SelectItem>
                        <SelectItem value="published">Опубликовано</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                <CardTitle>SEO Настройки</CardTitle>
                <CardDescription>Оптимизируйте вашу статью для поисковых систем.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Switch id="auto-slug" checked={autoSlug} onCheckedChange={setAutoSlug} />
                    <Label htmlFor="auto-slug">Генерировать URL автоматически</Label>
                </div>
                {!autoSlug && (
                    <div className="space-y-2">
                    <Label htmlFor="slug">URL (ЧПУ)</Label>
                    <Input id="slug" name="slug" value={post.slug} onChange={handleChange} />
                    </div>
                )}
                <div className="space-y-2">
                    <Label htmlFor="seo.metaTitle">Meta Title</Label>
                    <Input id="seo.metaTitle" name="seo.metaTitle" value={post.seo?.metaTitle} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="seo.metaDescription">Meta Description</Label>
                    <Input id="seo.metaDescription" name="seo.metaDescription" value={post.seo?.metaDescription} onChange={handleChange} />
                </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}; 