import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Page } from '@/types/page';
import { PlusCircle, MoreHorizontal, ArrowLeft } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { logger } from '@/services/logger.service';

export const PageManager: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch('/seo-data/pages.json');
        if (!response.ok) {
          throw new Error('Failed to fetch pages');
        }
        const data = await response.json();
        setPages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        logger.error('Failed to fetch pages', err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/admin/pages/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    // TODO: Implement delete functionality
    console.log(`Delete page ${id}`);
    alert('Функционал удаления в разработке');
  };
  
  const handleAddNewPage = () => {
    navigate('/admin/pages/new');
  };

  if (loading) {
    return <div>Загрузка страниц...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate('/admin')}>
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold">Менеджер страниц</h1>
        </div>
        <Button onClick={handleAddNewPage}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Добавить страницу
        </Button>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Список страниц</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Заголовок</TableHead>
                        <TableHead>URL (slug)</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Последнее обновление</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pages.map((page) => (
                    <TableRow key={page.id}>
                        <TableCell className="font-medium">{page.title}</TableCell>
                        <TableCell>{page.slug}</TableCell>
                        <TableCell>
                            <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
                                {page.status === 'published' ? 'Опубликовано' : 'Черновик'}
                            </Badge>
                        </TableCell>
                        <TableCell>{new Date(page.updatedAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Открыть меню</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleEdit(page.id)}>
                                        Редактировать
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDelete(page.id)} className="text-red-500">
                                        Удалить
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}; 