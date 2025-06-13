import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, PlusCircle, XCircle } from 'lucide-react'; // Убедитесь, что эти иконки импортированы
import { Button } from '@/components/ui/button'; // Убедитесь, что Button импортирован
import { ImageFormModal } from '@/components/ui/ImageFormModal';

interface ProductImageSliderProps {
  images: string[];
  productName: string;
  onAddImage: (imageUrl: string) => void; // Должен принимать только imageUrl, так как ProductImageSlider сам не знает productId
  onDeleteImage: (imageUrl: string) => void; // Должен принимать только imageUrl
  className?: string;
}

export const ProductImageSlider: React.FC<ProductImageSliderProps> = ({ images, productName, onAddImage, onDeleteImage, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'delete'>('add');

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const handleAddClick = () => {
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleDeleteClick = () => {
    setModalMode('delete');
    setIsModalOpen(true);
  };

  const handleModalConfirm = (value?: string) => {
    if (modalMode === 'add' && value) {
      onAddImage(value);
    } else if (modalMode === 'delete') {
      onDeleteImage(images[currentIndex]);
    }
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (!images || images.length === 0) {
    return <div className="w-full h-64 bg-gray-200 flex items-center justify-center">Нет изображения</div>;
  }

  return (
    <div className={`relative w-full h-full group ${className || ''}`}>
      <img
        src={images[currentIndex]}
        alt={productName}
        className="w-full h-full object-cover duration-500"
      />
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronLeft onClick={goToPrevious} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronRight onClick={goToNext} size={30} />
      </div>
      {/* Кнопки добавления/удаления - они должны быть здесь */}
      <div className="absolute bottom-4 right-4 z-20 flex gap-2">
        <Button size="sm" variant="outline" onClick={handleAddClick}>
          <PlusCircle className="w-4 h-4 mr-2" /> Добавить
        </Button>
        <Button size="sm" variant="destructive" onClick={handleDeleteClick}>
          <XCircle className="w-4 h-4 mr-2" /> Удалить
        </Button>
      </div>
      <ImageFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        mode={modalMode}
        currentImageUrl={modalMode === 'delete' ? images[currentIndex] : undefined}
      />
    </div>
  );
};