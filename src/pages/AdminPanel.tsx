import React from 'react';
import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-neutral pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
            Панель Администратора
          </h1>
          <p className="font-roboto text-gray-700 text-lg mb-4">
            Добро пожаловать в панель администратора. Здесь вы можете управлять продуктами, пользователями и контентом.
          </p>
          <nav className="mt-8">
            <ul className="flex flex-wrap gap-4">
              <li>
                <Link to="/admin/panel/products" className="text-blue-600 hover:underline">
                  Управление продуктами
                </Link>
              </li>
              <li>
                <Link to="/admin/panel/users" className="text-blue-600 hover:underline">
                  Управление пользователями
                </Link>
              </li>
              <li>
                <Link to="/admin/panel/content" className="text-blue-600 hover:underline">
                  Управление контентом
                </Link>
              </li>
            </ul>
          </nav>
          {/* Admin features will be added here */}
        </div>
      </div>
    </Layout>
  );
};

export default AdminPanel; 