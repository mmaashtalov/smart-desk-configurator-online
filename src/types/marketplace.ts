export interface MarketplaceListing {
    id: string;
    title: string;
    description: string;
    price: number;                 // ₽
    images: string[];              // URL-ы или пути
    seller: string;                // имя продавца или user-id
    condition: 'new' | 'used' | 'exhibition';
    createdAt: string;             // ISO-дата
  }