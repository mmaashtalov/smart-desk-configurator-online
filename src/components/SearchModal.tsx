
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const { searchQuery, setSearchQuery, searchResults, isSearching } = useApp();
  const [localQuery, setLocalQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      setLocalQuery(searchQuery);
    }
  }, [isOpen, searchQuery]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [localQuery, setSearchQuery]);

  const handleClose = () => {
    setLocalQuery('');
    setSearchQuery('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Поиск по сайту
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Введите название товара или услуги..."
              className="pl-10 pr-10"
              autoFocus
            />
            {localQuery && (
              <button
                onClick={() => setLocalQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="min-h-[200px]">
            {isSearching ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
                <span className="ml-2">Поиск...</span>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-3">
                  Найдено результатов: {searchResults.length}
                </p>
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      // Navigate to product page
                      console.log('Navigate to:', result);
                      handleClose();
                    }}
                  >
                    <h4 className="font-medium">{result.name}</h4>
                    <p className="text-sm text-gray-600">
                      {result.price.toLocaleString()} ₽
                    </p>
                    <span className="inline-block mt-1 px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                      {result.type === 'table' ? 'Столы' : 'Аксессуары'}
                    </span>
                  </div>
                ))}
              </div>
            ) : localQuery.trim() ? (
              <div className="text-center py-8">
                <p className="text-gray-500">По запросу "{localQuery}" ничего не найдено</p>
                <p className="text-sm text-gray-400 mt-2">
                  Попробуйте изменить поисковый запрос
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Введите поисковый запрос</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
