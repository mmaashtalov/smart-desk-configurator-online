import { StaticImageData } from 'next/image';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string; // URL
  location: string;
  date: string;
  employees: string;
  tags: string[];
  features: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Офис IT-компании TechFlow',
    description: 'Комплексное оснащение офиса умными столами с электроприводом для 50 сотрудников',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    location: 'Москва',
    date: 'Декабрь 2023',
    employees: '50 человек',
    tags: ['Корпоративный', 'IT', 'Большой проект'],
    features: ['Умные столы', 'Беспроводная зарядка', 'USB-хабы', 'Память позиций']
  },
  {
    id: 2,
    title: 'Коворкинг пространство WorkHub',
    description: 'Создание гибкого рабочего пространства с регулируемыми столами',
    image: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=800&q=80',
    location: 'Санкт-Петербург',
    date: 'Октябрь 2023',
    employees: '30 мест',
    tags: ['Коворкинг', 'Стартапы', 'Гибкость'],
    features: ['Быстрая настройка', 'Общие зоны', 'Мобильные тумбы', 'Зарядные станции']
  },
  {
    id: 3,
    title: 'Домашний офис CEO',
    description: 'Персональный кабинет руководителя с эксклюзивным дизайном',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    location: 'Москва',
    date: 'Сентябрь 2023',
    employees: '1 человек',
    tags: ['Премиум', 'Индивидуальный', 'Эксклюзив'],
    features: ['Массив дуба', 'Встроенная подсветка', 'Климат-контроль', 'Умное управление']
  },
  {
    id: 4,
    title: 'Медицинский центр HealthCare+',
    description: 'Рабочие места для врачей с учетом специфики медицинской деятельности',
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=800&q=80',
    location: 'Екатеринбург',
    date: 'Август 2023',
    employees: '25 врачей',
    tags: ['Медицина', 'Эргономика', 'Специализированное'],
    features: ['Антибактериальное покрытие', 'Легкая очистка', 'Тихий привод', 'Память настроек']
  },
  {
    id: 5,
    title: 'Архитектурное бюро ArchiSpace',
    description: 'Творческое пространство для архитекторов и дизайнеров',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
    location: 'Новосибирск',
    date: 'Июль 2023',
    employees: '15 специалистов',
    tags: ['Креатив', 'Дизайн', 'Архитектура'],
    features: ['Большие поверхности', 'Интеграция с планшетами', 'Подставки для чертежей', 'Регулировка наклона']
  },
  {
    id: 6,
    title: 'Финансовая компания InvestPro',
    description: 'Представительский офис с акцентом на статус и функциональность',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
    location: 'Москва',
    date: 'Июнь 2023',
    employees: '40 сотрудников',
    tags: ['Финансы', 'Представительский', 'Статус'],
    features: ['Премиальные материалы', 'Скрытая проводка', 'Интеграция с AV-системами', 'Безопасность']
  },
  {
    id: 7,
    title: 'Smart Desk Tab 4.0 – Стол для семейной пары',
    description: 'Индивидуальный рабочий стол для мужа и жены с монохромной чёрно-белой гаммой, двумя нишами для смартфонов, подвесной тумбой и тёплой LED-подсветкой.',
    image: 'https://umnye-stoly.ru/storage/family-table/cover.jpg',
    location: 'Санкт-Петербург',
    date: 'Май 2024',
    employees: '2 человека',
    tags: ['Домашний офис', 'Пара', 'Индивидуальный дизайн'],
    features: [
      'Выдвижной ящик с ID-замком',
      '2 сетевых фильтра',
      'Органайзер кабелей',
      'USB-hub',
      'Всплывающий блок розеток',
      'Колонки JBL',
      'Беспроводная зарядка + подогрев кружки',
      'Тёплая LED-подсветка'
    ]
  },
  {
    id: 8,
    title: 'Smart Desk Primary – Домашний офис для бизнес-владельца',
    description: 'Полнофункциональный стол цвета «Арктика» с электроприводом и расширенным набором девайсов для продуктивной работы из дома.',
    image: 'https://umnye-stoly.ru/storage/home-office/cover.jpg',
    location: 'Москва',
    date: 'Июль 2024',
    employees: '1 человек',
    tags: ['Домашний офис', 'Premium', 'Индивидуальный'],
    features: [
      'Регулировка высоты 60–125 см',
      'Fingerprint-ящик',
      'USB-hub',
      'Беспроводная зарядка',
      'Подогрев кружки',
      'Выдвижной блок розеток',
      'Колонки JBL',
      'Большая тумба push-to-open'
    ]
  },
  {
    id: 9,
    title: '15 Smart Desk Tab для офиса IT-компании',
    description: 'Комплексная поставка 15 умных столов Idellion ST для просторного open-space технологической компании.',
    image: 'https://umnye-stoly.ru/storage/15-stolov-it/cover.jpg',
    location: 'Казань',
    date: 'Сентябрь 2024',
    employees: '15 сотрудников',
    tags: ['Корпоративный', 'IT', 'Большой проект'],
    features: [
      'Электроподъёмные столы',
      'Память позиций',
      'USB-зарядки',
      'Кабель-менеджмент',
      'Единая цветовая палитра бренда'
    ]
  }
]; 