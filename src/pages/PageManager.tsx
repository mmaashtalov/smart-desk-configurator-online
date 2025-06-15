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
import { useNavigate, Link } from 'react-router-dom';
import { logger } from '@/services/logger.service';
import { pageService } from '@/services/page.service';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';

export const PageManager: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [sortBy, setSortBy] = useState<'title' | 'updated_at' | 'status'>('updated_at');
  const [ascending, setAscending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [pageToDeleteId, setPageToDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const { data, total } = await pageService.getPages({ page, limit: pageSize, sortBy, ascending });
        setPages(data);
        setTotal(total);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        logger.error('Failed to fetch pages', err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, [page, sortBy, ascending]);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const handleEdit = (id: string) => {
    navigate(`/admin/pages/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setPageToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (pageToDeleteId) {
      setPages(pages.filter(page => page.id !== pageToDeleteId));
      setIsDeleteModalOpen(false);
      setPageToDeleteId(null);
      pageService.deletePage(pageToDeleteId).catch((err) => {
        setError(err instanceof Error ? err.message : 'Ошибка удаления');
        logger.error('Failed to delete page', err instanceof Error ? err : new Error(String(err)));
      });
    }
  };
  
  const handleAddNewPage = () => {
    navigate('/admin/pages/new');
  };

  const toggleSort = (col: 'title' | 'updated_at' | 'status') => {
    if (sortBy === col) {
      setAscending(!ascending);
    } else {
      setSortBy(col);
      setAscending(col === 'title'); // default asc for title
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const filteredPages = pages.filter((p) => {
    const q = debouncedSearch.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q);
  });

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
        <Input
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
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
                        <TableHead onClick={() => toggleSort('title')} className="cursor-pointer select-none">
                          Заголовок {sortBy === 'title' ? (ascending ? '▲' : '▼') : ''}
                        </TableHead>
                        <TableHead>URL (slug)</TableHead>
                        <TableHead onClick={() => toggleSort('status')} className="cursor-pointer select-none">
                          Статус {sortBy === 'status' ? (ascending ? '▲' : '▼') : ''}
                        </TableHead>
                        <TableHead onClick={() => toggleSort('updated_at')} className="cursor-pointer select-none">
                          Последнее обновление {sortBy === 'updated_at' ? (ascending ? '▲' : '▼') : ''}
                        </TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredPages.map((page) => (
                    <TableRow key={page.id}>
                        <TableCell className="font-medium">{page.title}</TableCell>
                        <TableCell>
                          <Link to={`/${page.slug}`} className="text-blue-600 hover:underline">
                            {page.slug}
                          </Link>
                        </TableCell>
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

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Предыдущая
        </Button>
        <span>
          Страница {page} из {totalPages}
        </span>
        <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
          Следующая
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Подтвердите удаление</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить эту страницу? Это действие нельзя отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Отмена</Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>Удалить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 