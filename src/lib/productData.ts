export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  features: string[];
  inStock: boolean;
  isNew: boolean;
}

export const initialProducts: Product[] = [
  {
    id: 1,
    name: "Умный стол Arctic",
    category: "table",
    price: 65000,
    originalPrice: 70000,
    images: [
      "https://images.unsplash.com/photo-1593642532782-0c282fef3869?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1522204652233-a33785461148?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1627791850787-f831968d904c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description: "Элегантный и функциональный стол для современного рабочего пространства.",
    features: ["Регулировка высоты 65-125 см", "Беспроводная зарядка Qi", "USB-хаб", "Память позиций"],
    inStock: true,
    isNew: true
  },
  {
    id: 2,
    name: "Стол ErgoPro",
    category: "table",
    price: 58000,
    originalPrice: 62000,
    images: [
      "https://images.unsplash.com/photo-1518779578619-ae94d03be523?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1593642632559-0c282fef3869?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1522204652233-a33785461148?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description: "Эргономичное решение для продуктивной работы.",
    features: ["Регулировка высоты 65-125 см", "Беспроводная зарядка Qi", "USB-хаб", "Память позиций"],
    inStock: true,
    isNew: false
  },
  {
    id: 3,
    name: "Модель ComfortDesk",
    category: "table",
    price: 52000,
    images: [
      "https://images.unsplash.com/photo-1593642632559-0c282fef3869?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1518779578619-ae94d03be523?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1522204652233-a33785461148?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description: "Идеальный баланс комфорта и стиля.",
    features: ["Регулировка высоты 65-125 см", "Беспроводная зарядка Qi", "USB-хаб", "Память позиций"],
    inStock: false,
    isNew: false
  },
  {
    id: 4,
    name: 'Стол "Прогресс"',
    category: "table",
    price: 68000,
    images: [
      "https://images.unsplash.com/photo-1522204652233-a33785461148?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1627791850787-f831968d904c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1518779578619-ae94d03be523?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description: "Высота регулируется, а также множество цветов.",
    features: ["Регулировка высоты 65-125 см", "Беспроводная зарядка Qi", "USB-хаб", "Память позиций"],
    inStock: true,
    isNew: true
  },
  {
    id: 5,
    name: "Стеновая панель Arctic",
    category: "panel",
    price: 15000,
    images: ["https://picsum.photos/600/400?random=8"],
    description: "Стеновая панель из дубового шпона с LED-подсветкой",
    features: ["Встроенная подсветка", "Текстурированная поверхность", "Звукоизоляция"],
    inStock: true,
    isNew: false
  },
  {
    id: 6,
    name: "Тумба интегрированная Wenge",
    category: "cabinet",
    price: 55000,
    images: ["https://picsum.photos/600/400?random=9"],
    description: "Интегрированная тумба размера M с дополнительными возможностями",
    features: ["Встроенный сейф", "Отделение для системного блока", "Кабель-менеджмент"],
    inStock: true,
    isNew: false
  }
]; 