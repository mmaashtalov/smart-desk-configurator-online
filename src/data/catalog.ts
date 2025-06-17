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
    id: 'executive-desk-primary-r-plus',
    category: 'executive-desks',
    title: 'Smart Desk Primary R+',
    description: 'Массив дуба / американского ореха с регулируемой высотой 60–125 см',
    images: [
      '/images/Prymary R+/5370657970456752821.jpg',
      '/images/Prymary R+/5370657970456752820.jpg',
    ],
    features: [
      'Массив дуба / американского ореха/ палисандра',
      'Цвет по каталогу',
      'Регулируемая высота от 60 до 125 см',
      'Пенал для канцелярии',
      'Полка для проводов',
      'Органайзер',
      'Подставка под телефон',
      'Bluetooth аудиосистема',
      'Ящик с замком по отпечатку пальца',
      'USB Hub (USB 3.0 и USB-C)',
      'Беспроводная зарядка',
      'Разъёмы HDMI, USB, 220V',
      'Сетевой фильтр',
      'Натуральная кожа',
    ],
    price: 160000,
    seo: { metaTitle: 'Smart Desk Primary R+', metaDescription: 'Описание Smart Desk Primary R+' },
  },

  {
    id: 'executive-desk-primary',
    category: 'executive-desks',
    title: 'Smart Desk Primary',
    description: 'Массив дуба / американского ореха с регулируемой высотой 60–125 см',
    images: [
      '/images/Primary/4.jpg.webp',
      '/images/Primary/10.jpg.webp',
      '/images/Primary/7.jpg.webp',
      '/images/Primary/5.jpg.webp',
    ],
    features: [
      'Массив дуба / американского ореха',
      'Цвет по каталогу',
      'Регулируемая высота от 60 до 125 см',
      'Пенал для канцелярии',
      'Полка для проводов',
      'Органайзер',
      'Подставка под телефон',
      'Bluetooth аудиосистема',
      'Ящик с замком по отпечатку пальца',
      'USB Hub (USB 3.0 и USB-C)',
      'Беспроводная зарядка',
      'Разъёмы HDMI, USB, 220V',
      'Сетевой фильтр',
    ],
    price: 120000,
    seo: { metaTitle: 'Smart Desk Primary', metaDescription: 'Описание Smart Desk Primary' },
  },

  {
    id: 'executive-desk-primary-plus',
    category: 'executive-desks',
    title: 'Smart Desk Primary+',
    description: 'Массив дуба / американского ореха с регулируемой высотой 60–125 см',
    images: [
      '/images/Primary+/1.jpg.webp',
      '/images/Primary+/13.jpg.webp',
      '/images/Primary+/8.jpg.webp',
      '/images/Primary+/2.jpg.webp',
    ],
    features: [
      'Массив дуба / американского ореха',
      'Цвет по каталогу',
      'Регулируемая высота от 60 до 125 см',
      'Пенал для канцелярии',
      'Полка для проводов',
      'Органайзер',
      'Подставка под телефон',
      'Bluetooth аудиосистема',
      'Ящик с замком по отпечатку пальца',
      'USB Hub (USB 3.0 и USB-C)',
      'Беспроводная зарядка',
      'Разъёмы HDMI, USB, 220V',
      'Сетевой фильтр',
    ],
    price: 155000,
    seo: { metaTitle: 'Smart Desk Primary+', metaDescription: 'Описание Smart Desk Primary+' },
  },

  {
    id: 'executive-desk-medium',
    category: 'executive-desks',
    title: 'Smart Desk Medium',
    description: 'Массив дуба или ореха с регулируемой высотой 60–125 см',
    images: [
      '/images/Medium/2.jpg.webp',
      '/images/Medium/8.jpg.webp',
      '/images/Medium/7.jpg.webp',
    ],
    features: [
      'Массив + шпон дуба или ореха',
      'Цвет по каталогу',
      'Регулируемая высота от 60 до 125 см',
      'Пенал для канцелярии',
      'Органайзер для проводов',
      'Сетевой фильтр с защитой от скачков напряжения',
      'Выдвижной ящик',
      'USB Hub (Разъёмы USB 3.0 и USB-C)',
    ],
    price: 135000,
    seo: { metaTitle: 'Smart Desk Medium', metaDescription: 'Описание Smart Desk Medium' },
  },

  {
    id: 'executive-desk-tab-3',
    category: 'executive-desks',
    title: 'Smart Desk Tab 3.0',
    description: 'Массив дуба или ореха с регулировкой высоты 60–125 см',
    images: [
      '/images/Tab 3/3.jpg',
      '/images/Tab 3/2.jpg.webp',
    ],
    features: [
      'Массив + шпон дуба или ореха',
      'Цвет по каталогу',
      'Регулируемая высота от 60 до 125 см',
      'Пенал для канцелярии',
      'Органайзер для проводов',
      'Сетевой фильтр с защитой от скачков напряжения',
      'Выдвижной ящик',
      'USB Hub (Разъёмы USB 3.0 и USB-C)',
    ],
    price: 140000,
    seo: { metaTitle: 'Smart Desk Tab 3.0', metaDescription: 'Описание Smart Desk Tab 3.0' },
  },

  {
    id: 'executive-desk-tab-4',
    category: 'executive-desks',
    title: 'Smart Desk Tab 4.0',
    description: 'Массив дуба или ореха с регулируемой высотой 60–125 см и подстольем Z-типа',
    images: [
      '/images/Tab 4/2.jpg.webp',
      '/images/Tab 4/11.jpg',
      '/images/Tab 4/9.jpg',
    ],
    features: [
      'Массив и шпон дуба или ореха',
      'Цвет по каталогу',
      'Подстолье Z-типа',
      'Пенал для канцелярии',
      'Органайзер для проводов',
      'Сетевой фильтр с защитой от скачков напряжения',
      'Выдвижной ящик',
      'USB Hub (Разъёмы USB 3.0 и USB-C)',
    ],
    price: 150000,
    seo: { metaTitle: 'Smart Desk Tab 4.0', metaDescription: 'Описание Smart Desk Tab 4.0' },
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
    images: ['/images/Storage/Шкафы для документов/Пенал для документов.webp'],
    features: ['Регулируемые полки', 'Замок', 'Современный дизайн'],
    price: 45000,
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
    id: 'massage-chair-venerdi-expert',
    category: 'massage-chairs',
    title: 'Массажное кресло Venerdi Massage Expert',
    description: 'Флагманское кресло с 4D-массажем, Zero-Gravity и сенсорным планшетом управления.',
    images: [
      '/images/Массажные кресла/Premiym/__-1 (1).jpg',
      '/images/Массажные кресла/Premiym/__-11-transformed.jpeg',
      '/images/Массажные кресла/Premiym/__-8-transformed.jpeg',
    ],
    features: [
      '4D и 3D-массаж всего тела',
      'Капюшон для уединения',
      '24 автоматические программы',
      'Zero-Gravity и режим качания',
      'Bluetooth-аудио и беспроводная зарядка',
    ],
    price: 490900,
    seo: { metaTitle: 'Venerdi Massage Expert', metaDescription: 'Премиальное массажное кресло Venerdi Massage Expert с 4D-массажем и Zero-Gravity.' },
  },
  {
    id: 'massage-chair-venerdi-sfera-blue',
    category: 'massage-chairs',
    title: 'Массажное кресло Venerdi Sfera (Blue)',
    description: '10 программ, Zero-Gravity и прогрев в стильном синем исполнении.',
    images: [
      '/images/Массажные кресла/Medium/blue/__-1.jpg',
      '/images/Массажные кресла/Medium/blue/__-12.jpg',
      '/images/Массажные кресла/Medium/blue/__-9.jpg',
    ],
    features: [
      '10 автоматических программ',
      'Zero-Gravity',
      'Прогрев спины',
      'Bluetooth-аудио',
    ],
    price: 269900,
    seo: { metaTitle: 'Venerdi Sfera Blue', metaDescription: 'Массажное кресло Venerdi Sfera Blue с функцией Zero-Gravity.' },
  },
  {
    id: 'massage-chair-venerdi-sfera-red',
    category: 'massage-chairs',
    title: 'Массажное кресло Venerdi Sfera (Red)',
    description: 'Красная версия Sfera с расширенным набором массажных техник.',
    images: [
      '/images/Массажные кресла/Medium/red/__-1 (1).jpg',
      '/images/Массажные кресла/Medium/red/__-10.jpg',
      '/images/Массажные кресла/Medium/red/__-12.jpg',
    ],
    features: [
      '10 автоматических программ',
      'Zero-Gravity',
      'Сканирование тела',
      'Прогрев',
    ],
    price: 269900,
    seo: { metaTitle: 'Venerdi Sfera Red', metaDescription: 'Массажное кресло Venerdi Sfera Red с функцией Zero-Gravity.' },
  },
  {
    id: 'massage-chair-venerdi-base',
    category: 'massage-chairs',
    title: 'Массажное кресло Venerdi Base',
    description: 'Доступное кресло Venerdi с базовыми массажными функциями.',
    images: [
      '/images/Массажные кресла/Base/4.png',
      '/images/Массажные кресла/Base/5.png',
      '/images/Массажные кресла/Base/4.png.webp',
    ],
    features: [
      '8 автоматических программ',
      'Zero-Gravity',
      'Прогрев поясницы',
    ],
    price: 195900,
    seo: { metaTitle: 'Venerdi Base', metaDescription: 'Массажное кресло Venerdi Base с набором базовых функций.' },
  },
  {
    id: 'kneeling-chair-olimp-eco-lime',
    category: 'kneeling-chairs',
    title: 'Коленный стул Olimp ECO (лайм)',
    description: 'Деревянный ортопедический коленный стул Olimp ECO в ярком цвете лайм. Способствует формированию правильной осанки, снижает нагрузку на поясницу и улучшает кровообращение.',
    images: [
      '/images/Коленные стулья/Лайм/6373002357.webp',
      '/images/Коленные стулья/Лайм/6373002351.webp',
      '/images/Коленные стулья/Лайм/6373002358.webp',
    ],
    features: [
      'Сиденье под углом 25° для разгрузки поясницы',
      'Регулируемая высота и наклон',
      'Нагрузка до 120 кг',
      'Колёса с резиновым покрытием и стопором',
      'Съёмные чехлы, лёгкий уход',
    ],
    price: 9990,
    seo: { metaTitle: 'Коленный стул Olimp ECO лайм', metaDescription: 'Ортопедический коленный стул Olimp ECO в цвете лайм – правильная осанка и комфорт.' },
  },
  {
    id: 'kneeling-chair-olimp-eco-wood',
    category: 'kneeling-chairs',
    title: 'Коленный стул Olimp ECO (шоколад)',
    description: 'Деревянный ортопедический коленный стул Olimp ECO в натуральном коричневом цвете. Помогает удерживать позвоночник в правильном положении и снижает давление на поясницу во время работы.',
    images: [
      '/images/Коленные стулья/Коричневый/6335481235.webp',
      '/images/Коленные стулья/Коричневый/6335481241.webp',
      '/images/Коленные стулья/Коричневый/6335481242.webp',
      '/images/Коленные стулья/Коричневый/6335481231.webp',
    ],
    features: [
      'Корпус из массива берёзы, лаковая отделка',
      'Сиденье и подушки из плотного пенополиуретана',
      'Регулировка высоты 48–62 см',
      'Угол наклона сиденья 25°',
      'Колёсики с резиновым покрытием и фиксаторами',
    ],
    price: 9990,
    seo: { metaTitle: 'Коленный стул Olimp ECO', metaDescription: 'Ортопедический коленный стул Olimp ECO из дерева – комфорт и здоровая посадка.' },
  },
  {
    id: 'kneeling-chair-olimp-eco-white',
    category: 'kneeling-chairs',
    title: 'Коленный стул Olimp ECO (white wood)',
    description: 'Светлый вариант ортопедического стула Olimp ECO – стиль и польза для спины.',
    images: [
      '/images/Коленные стулья/Белый/6337363263.webp',
      '/images/Коленные стулья/Белый/6337363252.webp',
      '/images/Коленные стулья/Белый/6337363257.webp',
      '/images/Коленные стулья/Белый/6337363249.webp'
    ],
    features: [
      'Белый деревянный корпус',
      'Регулируемые подушки',
      'Нагрузка до 120 кг',
      'Колёса со стопором',
    ],
    price: 9990,
    seo: { metaTitle: 'Коленный стул Olimp ECO White', metaDescription: 'Белый деревянный коленный стул Olimp ECO для правильной осанки.' },
  },
  {
    id: 'kneeling-chair-olimp-eco-champagne',
    category: 'kneeling-chairs',
    title: 'Коленный стул Olimp ECO (шампань)',
    description: 'Элегантный коленный стул Olimp ECO в утончённом оттенке шампань. Поддерживает правильную осанку и снижает нагрузку на спину во время работы или учёбы.',
    images: [
      '/images/Коленные стулья/Шампань/6316337938-removebg-preview.png',
      '/images/Коленные стулья/Шампань/6316337938.webp',
      '/images/Коленные стулья/Шампань/6316337939.webp',
      '/images/Коленные стулья/Шампань/6316337990.webp',
    ],
    features: [
      'Корпус из массива берёзы в цвете шампань',
      'Сиденье под углом 25° для разгрузки поясницы',
      'Регулировка высоты и наклона',
      'Нагрузка до 120 кг',
      'Колёсики с резиновым покрытием и фиксаторами',
    ],
    price: 9990,
    seo: { metaTitle: 'Коленный стул Olimp ECO шампань', metaDescription: 'Ортопедический коленный стул Olimp ECO в цвете шампань – стиль и здоровье вашей спины.' },
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
  {
    id: 'office-storage-wardrobe',
    category: 'office-storage',
    title: 'Шкаф для одежды',
    description: 'Функциональный офисный шкаф для хранения верхней одежды сотрудников и посетителей.',
    images: ['/images/Storage/Шкафы для одежды/Шкаф для офежды.webp'],
    features: [
      'Размеры 90×210×40 см',
      'Материал: ЛДСП или шпон дуба',
      'Прочные металлические петли',
      'Регулируемые опоры',
      'Вместительное отделение для одежды',
      'Цвет на выбор по каталогу EGGER',
    ],
    price: 39900,
    seo: { metaTitle: 'Шкаф для одежды – системы хранения', metaDescription: 'Офисный шкаф для хранения верхней одежды, характеристики и цена.' },
  },
  {
    id: 'office-storage-docs',
    category: 'office-storage',
    title: 'Тумба-купе',
    description: 'Практичная офисная тумба-купе с эстетичным фасадом и максимальной функциональностью для хранения документов и личных вещей.',
    images: ['/images/Storage/Тумбы/тумба купе.webp'],
    features: [
      'Материал: ЛДСП или шпон дуба',
      'Возможность установки замка',
      'Регулируемые опоры',
      'Регулируемые по высоте полки',
      'Возможность установки внутренних полок и разделителей',
      'Эстетичный внешний вид',
    ],
    price: 69900,
    seo: { metaTitle: 'Тумба-купе – системы хранения', metaDescription: 'Офисная тумба-купе, характеристики и цена.' },
  },
  {
    id: 'office-storage-locker',
    category: 'office-storage',
    title: 'Шкаф-локер',
    description: 'Модульный шкаф-локер с индивидуально подобранными ячейками для персонального хранения.',
    images: ['/images/Storage/Шкафы локеры/Шкаф локер.webp'],
    features: [
      'Размеры 90×210×40 см',
      'Материал: ЛДСП или шпон дуба',
      'Надёжная металлическая фурнитура',
      'Индивидуальные секции с замками',
      'Лёгкий монтаж и обслуживание',
      'Цвет по каталогу EGGER',
    ],
    price: 25900,
    seo: { metaTitle: 'Шкаф-локер – системы хранения', metaDescription: 'Шкаф-локер для офиса, характеристики и цена.' },
  },
  {
    id: 'kneeling-chair-woodtbalance-dynamic-brown',
    category: 'kneeling-chairs',
    title: 'Коленный стул Woodtbalance Dynamic (шоколад)',
    description: 'Раскачивающийся ортопедический коленный стул Woodtbalance Dynamic в глубоком шоколадном цвете. Благодаря динамическому основанию позволяет сохранять активную посадку, включать мышцы кора и снижать нагрузку на поясницу.',
    images: [
      '/images/Коленные стулья/Smartstool/Шоколад/7267562561-removebg-preview.png',
      '/images/Коленные стулья/Smartstool/Шоколад/7267562561.webp',
      '/images/Коленные стулья/Smartstool/Шоколад/7267562620.webp',
      '/images/Коленные стулья/Smartstool/Шоколад/7267562628.webp',
      '/images/Коленные стулья/Smartstool/Шоколад/7267562657.webp',
    ],
    features: [
      'Динамическое основание для микродвижений и активации мышц',
      'Регулировка высоты сиденья',
      'Нагрузка до 120 кг',
      'Подушки из плотного пенополиуретана',
      'Нескользящие опоры, не царапают пол',
    ],
    price: 7990,
    seo: { metaTitle: 'Woodtbalance Dynamic шоколад', metaDescription: 'Коленный стул Woodtbalance Dynamic в цвете шоколад — активная посадка и забота о спине.' },
  },
  ,
  {
    id: 'kneeling-chair-woodtbalance-dynamic-jeans',
    category: 'kneeling-chairs',
    title: 'Коленный стул Woodtbalance Dynamic (джинс)',
    description: 'Динамический коленный стул Woodtbalance Dynamic в модном джинсовом оттенке. Активная посадка и снижение нагрузки на спину.',
    images: [
      '/images/Коленные стулья/Smartstool/Джинс/7243722214.webp',
      '/images/Коленные стулья/Smartstool/Джинс/7258242264.webp',
      '/images/Коленные стулья/Smartstool/Джинс/7258242269.webp',
      '/images/Коленные стулья/Smartstool/Джинс/7258242271.webp',
      '/images/Коленные стулья/Smartstool/Джинс/7258242280.webp',
    ],
    features: [
      'Динамическое основание для микродвижений',
      'Регулируемая высота сиденья',
      'Подушки из плотного пенополиуретана',
      'Нагрузка до 120 кг',
      'Нескользящие опоры, бережное отношение к полу',
    ],
    price: 7990,
    seo: { metaTitle: 'Woodtbalance Dynamic джинс', metaDescription: 'Коленный стул Woodtbalance Dynamic в цвете джинс — активная посадка и стильный дизайн.' },
  }
] 