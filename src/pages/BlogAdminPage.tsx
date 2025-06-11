import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

// This type should eventually be moved to a shared types file
interface BlogPost {
  id: string;
  title: string;
  status: 'published' | 'draft';
  createdAt: string;
}

export const BlogAdminPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch('/api/seo/blog-posts')
      .then(res => res.json())
      .then(setPosts)
      .catch(() => toast.error('Не удалось загрузить статьи.'));
  }, []);

  const handleDelete = (id: string) => {
    // In a real app, you'd send a DELETE request to the server
    console.log(`Deleting post ${id}`);
    toast.success('Статья удалена (симуляция).');
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Управление блогом</h1>
          <p className="text-gray-500">Создавайте, редактируйте и управляйте вашими статьями.</p>
        </div>
        <Link to="/admin/blog/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Создать статью
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Все статьи</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Заголовок</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата создания</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map(post => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                      {post.status === 'published' ? 'Опубликовано' : 'Черновик'}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Link to={`/admin/blog/edit/${post.id}`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 