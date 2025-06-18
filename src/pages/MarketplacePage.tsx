import React, { useEffect, useState } from 'react';
import { fetchMarketplaceListings } from '@/services/marketplace.service';
import { MarketplaceListing } from '@/types/marketplace';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ListingForm } from '@/components/marketplace/ListingForm';
import { useAuth } from '@/hooks/useAuth';

const MarketplacePage: React.FC = () => {
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const getListings = async () => {
      setLoading(true);
      try {
        const { listings: data, total } = await fetchMarketplaceListings(page, pageSize);
        setListings(data);
        setTotal(total);
      } catch (err) {
        setError('Не удалось загрузить объявления.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getListings();
  }, [page]);

  if (loading) {
    return <div className="container mx-auto py-8">Загрузка объявлений...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-8 text-red-500">Ошибка: {error}</div>;
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Биржа</h1>
        {isAuthenticated && (
          <Button onClick={() => setIsDialogOpen(true)}>Добавить объявление</Button>
        )}
      </div>

      {listings.length === 0 ? (
        <p>На бирже пока нет объявлений.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div key={listing.id} className="border rounded-lg p-4 shadow-sm">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
                <p className="text-gray-600 mb-2">{listing.description}</p>
                <p className="text-lg font-bold text-primary">
                  {listing.price.toLocaleString('ru-RU')} ₽
                </p>
                <p className="text-sm text-gray-500">Состояние: {listing.condition}</p>
                <p className="text-sm text-gray-500">Продавец: {listing.seller}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) setPage(page - 1);
                    }}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <PaginationItem key={n}>
                    <PaginationLink
                      isActive={n === page}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(n);
                      }}
                    >
                      {n}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < totalPages) setPage(page + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}

      {/* Add Listing Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Новое объявление</DialogTitle>
            <DialogDescription>
              Заполните все поля, чтобы разместить товар на бирже.
            </DialogDescription>
          </DialogHeader>
          <ListingForm
            onCreated={() => {
              setIsDialogOpen(false);
              setPage(1); // reload first page to show new listing
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MarketplacePage;