import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User as UserIcon, Edit, Trash2 } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const initialUsers: User[] = [
  { id: '1', name: 'Иван Иванов', email: 'ivan.i@example.com', role: 'admin' },
  { id: '2', name: 'Мария Петрова', email: 'maria.p@example.com', role: 'user' },
  { id: '3', name: 'Алексей Сидоров', email: 'alex.s@example.com', role: 'user' },
];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAddUser = () => {
    const newId = (Math.max(...users.map(u => parseInt(u.id))) + 1).toString();
    const newUser: User = {
      id: newId,
      name: `Новый пользователь ${newId}`,
      email: `user${newId}@example.com`,
      role: 'user',
    };
    setUsers([...users, newUser]);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedProduct : u));
    setEditingUser(null);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="mt-8">
      <h2 className="font-playfair text-3xl font-bold text-primary mb-6">
        Управление пользователями
      </h2>
      <Button onClick={handleAddUser} className="mb-6">
        <UserIcon className="w-4 h-4 mr-2" /> Добавить нового пользователя
      </Button>

      <div className="bg-white rounded-lg shadow-md p-6">
        {users.map(user => (
          <div key={user.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-gray-600 text-sm">{user.email} - {user.role}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => handleEditUser(user)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="destructive" size="icon" onClick={() => handleDeleteUser(user.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {editingUser && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="font-playfair text-2xl font-bold text-primary mb-4">Редактировать пользователя</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Имя пользователя</label>
              <Input
                type="text"
                value={editingUser.name}
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Роль</label>
              <Input
                type="text"
                value={editingUser.role}
                onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}\
                className="mt-1 block w-full"
              />
            </div>
            <div className="flex gap-4">
              <Button onClick={() => handleSaveUser(editingUser)}>Сохранить</Button>
              <Button variant="outline" onClick={() => setEditingUser(null)}>Отмена</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;