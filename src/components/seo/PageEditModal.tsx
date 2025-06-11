import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageSEO } from '@/types';

interface PageEditModalProps {
  page: PageSEO | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (path: string, oldPath?: string) => void;
  children: React.ReactNode;
}

export const PageEditModal: React.FC<PageEditModalProps> = ({ page, isOpen, onClose, onSave, children }) => {
  const [path, setPath] = useState('');

  useEffect(() => {
    if (page) {
      setPath(page.path);
    } else {
      setPath('');
    }
  }, [page]);

  const handleSave = () => {
    if (path.trim()) {
      onSave(path, page?.path);
      onClose();
    } else {
      alert('Path cannot be empty.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{page ? 'Edit Page' : 'Add New Page'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="path" className="text-right">
              Path
            </Label>
            <Input
              id="path"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="col-span-3"
              placeholder="/example-path"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 