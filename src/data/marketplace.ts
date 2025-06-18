import { MarketplaceListing } from '@/types/marketplace';

export const MOCK_LISTINGS: MarketplaceListing[] = [
  {
    id: 'listing-1',
    title: 'Exhibition Sample: SmartDesk Pro (Дуб 140×70)',
    description:
      'Выставочный образец в отличном состоянии. Электропривод, память на 4 положения.',
    price: 29900,
    images: ['/images/Primary/4.jpg.webp'],
    seller: 'office-intellect',
    condition: 'exhibition',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'listing-2',
    title: 'SmartDesk Lite б/у (Белый 120×60)',
    description:
      'Год эксплуатации, небольшие потёртости на кромке. Подъёмный механизм работает отлично.',
    price: 18900,
    images: ['/images/Primary/10.jpg.webp'],
    seller: 'user-123',
    condition: 'used',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'listing-3',
    title: 'Новый SmartDesk Max (Орех 160×80) со склада',
    description:
      'Снят с продажи из-за смены коллекции. Абсолютно новый, полная гарантия.',
    price: 36900,
    images: ['/images/Primary/13.jpg (1).webp'],
    seller: 'office-intellect',
    condition: 'new',
    createdAt: new Date().toISOString(),
  },
]; 