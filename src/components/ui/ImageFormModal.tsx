import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from '@/components/ui/dialog';

interface ImageFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (value?: string) => void;
  mode: 'add' | 'delete';
  currentImageUrl?: string;
}

export const ImageFormModal: React.FC<ImageFormModalProps> = ({ isOpen, onClose, onConfirm, mode, currentImageUrl }) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen && mode === 'add') {
      setImageUrl(''); // Clear input on open for add mode
    }
  }, [isOpen, mode]);

  const handleConfirm = () => {
    if (mode === 'add') {
      onConfirm(imageUrl);
    } else if (mode === 'delete') {
      onConfirm(); // No value needed for delete confirmation
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Добавить изображение' : 'Удалить изображение'}</DialogTitle>
          <DialogDescription>
            {mode === 'add' 
              ? 'Введите URL нового изображения.' 
              : `Вы уверены, что хотите удалить текущее изображение?`}
          </DialogDescription>
        </DialogHeader>
        {mode === 'add' && (
          <div className="grid gap-4 py-4">
            <Input
              id="imageUrl"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="col-span-3"
            />
          </div>
        )}
        {mode === 'delete' && (
            <p className="text-sm text-gray-500">{currentImageUrl}</p>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Отмена</Button>
          <Button onClick={handleConfirm}>
            {mode === 'add' ? 'Добавить' : 'Удалить'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 