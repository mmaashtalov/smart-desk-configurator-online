export type CategoryId =
  | 'executive-desks'
  | 'office-desks'
  | 'meeting-tables'
  | 'office-storage'
  | 'home-storage'
  | 'office-chairs'
  | 'massage-chairs'
  | 'kneeling-chairs'
  | 'rent'

export interface Category {
  id: CategoryId
  name: string
  description: string
  image: string
  path: string
}

export interface Product {
  id: string
  category: CategoryId
  title: string
  description: string
  images: string[]
  features: string[]
  price?: number
  rentPrice?: number
  seo: { metaTitle: string; metaDescription: string }
}

export const CATEGORIES: readonly Category[] = [
  {
    id: 'executive-desks',
    name: 'Столы руководителя',
    description: 'Идеальные решения для современного рабочего пространства руководителя, сочетающие функциональность и дизайн.',
    image: '/images/Визуализации Дуб/table-executive.jpg', // Placeholder
    path: '/catalog/executive-desks',
  },
  {
    id: 'office-desks',
    name: 'Рабочие офисные столы',
    description: 'Надёжные и эргономичные столы для продуктивной работы в офисе, доступные в различных конфигурациях.',
    image: '/images/Визуализации Орех/table-office.jpg', // Placeholder
    path: '/catalog/office-desks',
  },
  {
    id: 'meeting-tables',
    name: 'Переговорные столы',
    description: 'Столы, разработанные для эффективных встреч и коллабораций, обеспечивающие комфорт и функциональность.',
    image: '/images/Визуализации Палисандр/table-meeting.jpg', // Placeholder
    path: '/catalog/meeting-tables',
  },
  {
    id: 'office-storage',
    name: 'Системы хранения для офиса',
    description: 'Эффективные и стильные решения для организации пространства и хранения документов в офисе.',
    image: '/placeholder.svg', // Placeholder
    path: '/catalog/office-storage',
  },
  {
    id: 'home-storage',
    name: 'Системы хранения для дома',
    description: 'Удобные и элегантные системы хранения для вашего домашнего офиса или личного пространства.',
    image: '/placeholder.svg', // Placeholder
    path: '/catalog/home-storage',
  },
  {
    id: 'office-chairs',
    name: 'Офисные кресла',
    description: 'Эргономичные и комфортные кресла для длительной работы, поддерживающие правильную осанку.',
    image: '/placeholder.svg', // Placeholder
    path: '/catalog/office-chairs',
  },
  {
    id: 'massage-chairs',
    name: 'Массажные кресла',
    description: 'Кресла с функцией массажа для расслабления и снятия напряжения прямо на рабочем месте.',
    image: '/placeholder.svg', // Placeholder
    path: '/catalog/massage-chairs',
  },
  {
    id: 'kneeling-chairs',
    name: 'Коленные стулья',
    description: 'Инновационные стулья для улучшения осанки и снижения нагрузки на спину при сидении.',
    image: '/placeholder.svg', // Placeholder
    path: '/catalog/kneeling-chairs',
  },
  {
    id: 'rent',
    name: 'Аренда рабочих мест',
    description: 'Гибкие решения по аренде полностью оборудованных рабочих мест для краткосрочных и долгосрочных нужд.',
    image: '/placeholder.svg', // Placeholder
    path: '/rent',
  },
]

export const PRODUCTS: readonly Product[] = [
  {
    id: 'executive-desk-1',
    category: 'executive-desks',
    title: 'Smart Desk Executive 5.0',
    description: 'Флагманская модель для руководителей с расширенным функционалом.',
    images: ['/images/Визуализации Дуб/table-executive.jpg', '/placeholder.svg'],
    features: ['Встроенная беспроводная зарядка', 'Электрическая регулировка высоты', 'Система управления кабелями'],
    price: 120000,
    seo: { metaTitle: 'Smart Desk Executive 5.0', metaDescription: 'Описание Smart Desk Executive 5.0' },
  },
  {
    id: 'office-desk-1',
    category: 'office-desks',
    title: 'Office Desk Standard M',
    description: 'Надежный и компактный стол для стандартного рабочего места в офисе.',
    images: ['/images/Визуализации Орех/table-office.jpg', '/placeholder.svg'],
    features: ['Прочная столешница из ЛДСП', 'Металлический каркас', 'Легкая сборка'],
    price: 35000,
    seo: { metaTitle: 'Office Desk Standard M', metaDescription: 'Описание Office Desk Standard M' },
  },
  {
    id: 'meeting-table-1',
    category: 'meeting-tables',
    title: 'Meeting Table XL',
    description: 'Просторный стол для переговорных комнат, вмещающий до 10 человек.',
    images: ['/images/Визуализации Палисандр/table-meeting.jpg', '/placeholder.svg'],
    features: ['Устойчивая конструкция', 'Кабель-каналы', 'Современный дизайн'],
    price: 85000,
    seo: { metaTitle: 'Meeting Table XL', metaDescription: 'Описание Meeting Table XL' },
  },
  {
    id: 'office-storage-1',
    category: 'office-storage',
    title: 'Шкаф-пенал для документов',
    description: 'Высокий шкаф для хранения документов и офисных принадлежностей.',
    images: ['/placeholder.svg'],
    features: ['Регулируемые полки', 'Замок', 'Современный дизайн'],
    price: 25000,
    seo: { metaTitle: 'Шкаф-пенал для документов', metaDescription: 'Описание шкафа-пенала' },
  },
  {
    id: 'home-storage-1',
    category: 'home-storage',
    title: 'Настенная полка Home',
    description: 'Стильная настенная полка для книг и декора в домашнем интерьере.',
    images: ['/placeholder.svg'],
    features: ['Простой монтаж', 'Прочный материал', 'Минималистичный дизайн'],
    price: 7000,
    seo: { metaTitle: 'Настенная полка Home', metaDescription: 'Описание настенной полки' },
  },
  {
    id: 'office-chair-1',
    category: 'office-chairs',
    title: 'Эргономичное кресло ProComfort',
    description: 'Кресло с поддержкой поясницы и регулируемыми подлокотниками.',
    images: ['/placeholder.svg'],
    features: ['Регулируемая высота', 'Синхронный механизм', 'Дышащая сетка'],
    price: 30000,
    seo: { metaTitle: 'Эргономичное кресло ProComfort', metaDescription: 'Описание кресла ProComfort' },
  },
  {
    id: 'massage-chair-1',
    category: 'massage-chairs',
    title: 'Массажное кресло RelaxMax',
    description: 'Кресло с функцией глубокого массажа для полного расслабления.',
    images: ['/placeholder.svg'],
    features: ['Несколько режимов массажа', 'Подогрев', 'Пульт ДУ'],
    price: 150000,
    seo: { metaTitle: 'Массажное кресло RelaxMax', metaDescription: 'Описание кресла RelaxMax' },
  },
  {
    id: 'kneeling-chair-1',
    category: 'kneeling-chairs',
    title: 'Коленный стул Balance',
    description: 'Стул для коррекции осанки и снижения нагрузки на позвоночник.',
    images: ['/placeholder.svg'],
    features: ['Прочная конструкция', 'Регулировка высоты', 'Мягкие подушки'],
    price: 18000,
    seo: { metaTitle: 'Коленный стул Balance', metaDescription: 'Описание стула Balance' },
  },
  {
    id: 'rent-package-1',
    category: 'rent',
    title: 'Рабочее место Start-up',
    description: 'Готовое рабочее место в аренду: стол, кресло, тумба.',
    images: ['/placeholder.svg'],
    features: ['Комплектная поставка', 'Гибкие сроки аренды', 'Обслуживание'],
    rentPrice: 5000,
    seo: { metaTitle: 'Рабочее место Start-up', metaDescription: 'Описание пакета аренды Start-up' },
  },
] 