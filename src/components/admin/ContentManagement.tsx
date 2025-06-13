import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ContentType {
  id: number;
  title: string;
  type: string; // e.g., 'blog_post', 'static_page'
}

const initialContent: ContentType[] = [
  { id: 1, title: 'Как выбрать идеальный стол', type: 'blog_post' },
  { id: 2, title: 'О нас', type: 'static_page' },
  { id: 3, title: 'Наши проекты', type: 'static_page' },
];

const ContentManagement = () => {
  const [content, setContent] = useState<ContentType[]>(initialContent);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentType | null>(null);
  const [newContentData, setNewContentData] = useState<Partial<ContentType>>({});

  const handleAddContent = () => {
    setNewContentData({ title: '', type: '', });
    setIsAddModalOpen(true);
  };

  const handleSaveNewContent = () => {
    if (newContentData.title && newContentData.type) {
      const newId = content.length > 0 ? Math.max(...content.map(c => c.id)) + 1 : 1;
      const contentToAdd: ContentType = {
        id: newId,
        title: newContentData.title,
        type: newContentData.type,
      };
      setContent([...content, contentToAdd]);
      setIsAddModalOpen(false);
      setNewContentData({});
    } else {
      console.error('Please fill in all required fields for new content.');
    }
  };

  const handleEditContent = (item: ContentType) => {
    setEditingContent(item);
    setIsEditModalOpen(true);
  };

  const handleSaveEditedContent = () => {
    if (editingContent && editingContent.title && editingContent.type) {
      setContent(content.map(c =>
        c.id === editingContent.id ? editingContent : c
      ));
      setIsEditModalOpen(false);
      setEditingContent(null);
    } else {
      console.error('Please fill in all required fields for editing content.');
    }
  };

  const handleDeleteContent = (id: number) => {
    if (confirm('Вы уверены, что хотите удалить этот контент?')) {
      setContent(content.filter(c => c.id !== id));
    }
  };

  return (
    <div className="mt-8">
      <h2 className="font-playfair text-3xl font-bold text-primary mb-6">
        Управление контентом
      </h2>
      <p className="font-roboto text-gray-700 text-lg mb-4">
        Здесь вы можете управлять различными типами контента.
      </p>
      <Button onClick={handleAddContent} className="mb-4">
        Добавить новый контент
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-playfair text-2xl font-semibold text-primary mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-4">Тип: {item.type}</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleEditContent(item)}
              >
                Редактировать
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteContent(item.id)}
              >
                Удалить
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Add Content Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Добавить новый контент</DialogTitle>
            <DialogDescription>Заполните детали для нового контента.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Заголовок</label>
              <Input
                type="text"
                value={newContentData.title || ''}
                onChange={(e) => setNewContentData({ ...newContentData, title: e.target.value })}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Тип</label>
              <Input
                type="text"
                value={newContentData.type || ''}
                onChange={(e) => setNewContentData({ ...newContentData, type: e.target.value })}
                className="mt-1 block w-full"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Отмена</Button>
            <Button onClick={handleSaveNewContent}>Сохранить контент</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Content Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Редактировать контент</DialogTitle>
            <DialogDescription>Измените детали контента.</DialogDescription>
          </DialogHeader>
          {editingContent && (
            <div className="grid gap-4 py-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Заголовок</label>
                <Input
                  type="text"
                  value={editingContent.title}
                  onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Тип</label>
                <Input
                  type="text"
                  value={editingContent.type}
                  onChange={(e) => setEditingContent({ ...editingContent, type: e.target.value })}
                  className="mt-1 block w-full"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Отмена</Button>
            <Button onClick={handleSaveEditedContent}>Сохранить изменения</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <nav className="mt-4">
        <ul className="flex flex-wrap gap-4">
          <li>
            <Link to="/admin/blog" className="text-blue-600 hover:underline">
              Блог (редактор постов)
            </Link>
          </li>
          <li>
            <Link to="/admin/pages" className="text-blue-600 hover:underline">
              Страницы (редактор статических страниц)
            </Link>
          </li>
          {/* Add more content types as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default ContentManagement;