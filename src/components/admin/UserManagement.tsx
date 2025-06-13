import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User as UserIcon, Edit, Trash2, Save, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

// Предполагается, что у вас есть такой тип
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

const initialUsers: User[] = [
  { id: 1, name: 'Иван Петров', email: 'ivan.p@example.com', role: 'admin' },
  { id: 2, name: 'Екатерина Смирнова', email: 'kate.s@example.com', role: 'user' },
  { id: 3, name: 'Дмитрий Волков', email: 'dmitry.v@example.com', role: 'user' },
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setEditingUser({ ...user });
  };

  const handleSave = () => {
    if (!editingUser) return;
    setUsers(users.map(u => (u.id === editingUser.id ? editingUser : u)));
    setEditingUser(null);
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!userToDelete) return;
    setUsers(users.filter(u => u.id !== userToDelete.id));
    setIsDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleAddUser = () => {
    // Логика добавления нового пользователя
    console.log('Добавление нового пользователя...');
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
                {editingUser && editingUser.id === user.id ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={editingUser.name}
                      onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                      className="h-8"
                    />
                    <Input
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                      className="h-8"
                    />
                  </div>
                ) : (
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-gray-600 text-sm">{user.email} - {user.role}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {editingUser && editingUser.id === user.id ? (
                <>
                  <Button variant="ghost" size="icon" onClick={handleSave}>
                    <Save className="w-5 h-5 text-green-600" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleCancel}>
                    <X className="w-5 h-5 text-gray-500" />
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(user)}>
                    <Edit className="w-5 h-5 text-blue-600" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(user)}>
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Вы уверены?</DialogTitle>
            <DialogDescription>
              Это действие необратимо. Вы действительно хотите удалить пользователя {userToDelete?.name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Отмена</Button>
            <Button variant="destructive" onClick={confirmDelete}>Удалить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}