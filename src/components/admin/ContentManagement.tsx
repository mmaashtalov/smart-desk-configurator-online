import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

  const handleAddContent = () => {
    const title = prompt('Введите заголовок нового контента:');
    const type = prompt('Введите тип контента (например, blog_post, static_page):');
    if (title && type) {
      const newContent: ContentType = {
        id: content.length > 0 ? Math.max(...content.map(c => c.id)) + 1 : 1,
        title,
        type,
      };
      setContent([...content, newContent]);
    }
  };

  const handleDeleteContent = (id: number) => {
    if (confirm('Вы уверены, что хотите удалить этот контент?')) {
      setContent(content.filter(c => c.id !== id));
    }
  };

  const handleEditContent = (id: number) => {
    const contentToEdit = content.find(c => c.id === id);
    if (contentToEdit) {
      const newTitle = prompt('Введите новый заголовок:', contentToEdit.title);
      const newType = prompt('Введите новый тип (например, blog_post, static_page):', contentToEdit.type);
      if (newTitle !== null && newType !== null) {
        setContent(content.map(c =>
          c.id === id ? { ...c, title: newTitle, type: newType } : c
        ));
      }
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
      <button
        onClick={handleAddContent}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mb-4"
      >
        Добавить новый контент
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-playfair text-2xl font-semibold text-primary mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-4">Тип: {item.type}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditContent(item.id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors"
              >
                Редактировать
              </button>
              <button
                onClick={() => handleDeleteContent(item.id)}
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
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