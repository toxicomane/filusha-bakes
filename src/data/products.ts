import { Product, Review } from '@/types';

export const CATEGORIES = [
  { slug: 'cakes', name: 'Торты', description: 'Цельные бисквитные и муссовые торты на праздник или семейный чаепитие', count: 3, icon: 'cake' },
  { slug: 'pastries', name: 'Пирожные', description: 'Порционные решения, тарталетки и эклеры ручной работы', count: 3, icon: 'pie' },
  { slug: 'cupcakes', name: 'Капкейки', description: 'Наборы кексов с начиночным центром и пышным кремом', count: 3, icon: 'cupcake' },
  { slug: 'cookies', name: 'Печенье', description: 'Хрустящие кукис, бискотти и пряное овсяное печенье', count: 3, icon: 'cookie' },
] as const;

export const INITIAL_PRODUCTS: Product[] = [
  // --- ТОРТЫ ---
  {
    id: 'p-1',
    slug: 'chocolate-cherry-confit',
    name: 'Шоколадный торт с вишнёвым конфи',
    category: 'cakes',
    categoryName: 'Торты',
    price: 3200,
    weight: '1.2 кг',
    servings: '8-10 порций',
    description: 'Плотный сочный бисквит на 100% какао Barry Callebaut, прослойка из цельной вишни без косточек с кислинкой, крем на сыре маскарпоне и сливках 33%. Без растительных жиров.',
    composition: 'Мука пшеничная в/с, какао-порошок Barry Callebaut 22%, свежемороженая вишня, пектин NH, сахар, яйца отборные С0, сливки питьевые 33%, сыр маскарпоне, сливочное масло 82.5%.',
    allergens: ['глютен', 'молоко', 'яйца'],
    nutritionalValue: { calories: 345, proteins: 5.8, fats: 18.2, carbs: 39.5 },
    images: [
      'https://images.pexels.com/photos/12081754/pexels-photo-12081754.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3740237/pexels-photo-3740237.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    preorderDays: 1,
    featured: true,
    createdAt: '2026-01-10',
  },
  {
    id: 'p-2',
    slug: 'raspberry-pistachio-tart',
    name: 'Торт «Малина-Фисташка»',
    category: 'cakes',
    categoryName: 'Торты',
    price: 3800,
    weight: '1.4 кг',
    servings: '10-12 порций',
    description: 'Фисташковый бисквит на 100% натуральной пасте из обжаренного сицилийского ореха, ярко выраженный слой малинового конфитура и фисташковый взбитый ганаш на белом шоколаде.',
    composition: 'Мука пшеничная, натуральная фисташковая паста 100%, дробленое ядро фисташки, малина, белый шоколад Callebaut Velvet, сливки 33%, сливочное масло, сахар, желатин.',
    allergens: ['орехи (фисташка)', 'глютен', 'молоко', 'яйца'],
    nutritionalValue: { calories: 380, proteins: 7.2, fats: 22.1, carbs: 37.0 },
    images: [
      'https://images.pexels.com/photos/8101695/pexels-photo-8101695.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/8104140/pexels-photo-8104140.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    preorderDays: 2,
    featured: true,
    createdAt: '2026-01-12',
  },
  {
    id: 'p-3',
    slug: 'red-velvet-lingonberry',
    name: 'Торт «Красный бархат» с брусникой',
    category: 'cakes',
    categoryName: 'Торты',
    price: 2900,
    weight: '1.1 кг',
    servings: '6-8 порций',
    description: 'Классический масляный бисквит густого рубинового цвета с тонкой ноткой натурального какао, брусничный домашний соус с терпкостью и плотный крем-чиз.',
    composition: 'Мука, какао-порошок, дикорастущая брусника, творожный сыр Hochland Professional, сливочное масло 82.5%, пахта, сахар, натуральная ваниль Bourbon.',
    allergens: ['глютен', 'молоко', 'яйца'],
    nutritionalValue: { calories: 360, proteins: 5.1, fats: 19.8, carbs: 41.2 },
    images: [
      'https://images.pexels.com/photos/29250530/pexels-photo-29250530.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/37382219/pexels-photo-37382219.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: false,
    preorderDays: 2,
    featured: false,
    createdAt: '2026-01-15',
  },

  // --- ПИРОЖНЫЕ ---
  {
    id: 'p-4',
    slug: 'tartlet-wild-raspberry',
    name: 'Тарталетки с лесной малиной (4 шт)',
    category: 'pastries',
    categoryName: 'Пирожные',
    price: 1400,
    weight: '440 г (4×110 г)',
    servings: '4 шт',
    description: 'Песочная корзинка сабле на французском сливочном масле, ореховый крем франжипан на миндале, заварной крем с семенами ванили и отборная свежая малина.',
    composition: 'Мука пшеничная высшего сорта, миндальная мука пудра, свежая малина, сливочное масло, желтки яичные, молоко 3.2%, семена ванили Bourbon, крахмал кукурузный.',
    allergens: ['орехи (миндаль)', 'глютен', 'молоко', 'яйца'],
    nutritionalValue: { calories: 310, proteins: 4.9, fats: 16.5, carbs: 35.2 },
    images: [
      'https://images.pexels.com/photos/3850843/pexels-photo-3850843.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/34563914/pexels-photo-34563914.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    featured: true,
    createdAt: '2026-02-01',
  },
  {
    id: 'p-5',
    slug: 'chocolate-prague-slice',
    name: 'Пирожное «Прага Ремесленная» (2 шт)',
    category: 'pastries',
    categoryName: 'Пирожные',
    price: 720,
    weight: '320 г (2×160 г)',
    servings: '2 шт',
    description: 'Насыщенный шоколадный бисквит, пропитанный легким коньячным сиропом, домашний абрикосовый конфитюр и слой блестящей глазури из 70% темного шоколада.',
    composition: 'Мука, темный шоколад 70%, абрикосовый конфитюр собственного приготовления, коньяк армянский, яйца, сливочное масло, сгущенное молоко цельное.',
    allergens: ['глютен', 'молоко', 'яйца'],
    nutritionalValue: { calories: 390, proteins: 6.1, fats: 21.0, carbs: 44.0 },
    images: [
      'https://images.pexels.com/photos/3740237/pexels-photo-3740237.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    featured: false,
    createdAt: '2026-02-03',
  },
  {
    id: 'p-6',
    slug: 'eclair-salted-caramel',
    name: 'Эклеры «Солёная карамель» (3 шт)',
    category: 'pastries',
    categoryName: 'Пирожные',
    price: 890,
    weight: '270 г (3×90 г)',
    servings: '3 шт',
    description: 'Заварное тесто с хрустящей корочкой кракелин, внутри наполнены взбитым карамельным кремом и домашней мягкой карамелью с розовой гималайской солью.',
    composition: 'Заварное тесто (мука, яйца, масло сливочное 82.5%, молоко, соль), варёная соленая карамель, сливки 33%, гималайская соль.',
    allergens: ['глютен', 'молоко', 'яйца'],
    nutritionalValue: { calories: 330, proteins: 5.2, fats: 17.8, carbs: 38.0 },
    images: [
      'https://images.pexels.com/photos/12124906/pexels-photo-12124906.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    featured: false,
    createdAt: '2026-02-05',
  },

  // --- КАПКЕЙКИ ---
  {
    id: 'p-7',
    slug: 'vanilla-berry-cupcakes',
    name: 'Капкейки «Ваниль & Малина» (6 шт)',
    category: 'cupcakes',
    categoryName: 'Капкейки',
    price: 1650,
    weight: '540 г (6×90 г)',
    servings: '6 шт',
    description: 'Воздушные кексы с добавлением стручковой ванили, с жидкой малиновой начинкой внутри и сливочной шапочкой из творожного крема.',
    composition: 'Мука, свежая малина, стручковая ваниль, творожный сыр Cremette, сливочное масло, сахар, яйца, молоко 3.2%.',
    allergens: ['глютен', 'молоко', 'яйца'],
    nutritionalValue: { calories: 320, proteins: 4.8, fats: 16.0, carbs: 39.0 },
    images: [
      'https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1055271/pexels-photo-1055271.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    featured: true,
    createdAt: '2026-02-10',
  },
  {
    id: 'p-8',
    slug: 'chocolate-peanut-cupcakes',
    name: 'Капкейки «Шоколад & Арахис» (6 шт)',
    category: 'cupcakes',
    categoryName: 'Капкейки',
    price: 1750,
    weight: '570 г (6×95 г)',
    servings: '6 шт',
    description: 'Мега-шоколадный кекс, наполненный домашней соленой карамелью и хрустящим обжаренным арахисом. Наверху ганаш из тёмного шоколада.',
    composition: 'Мука, какао Barry Callebaut, соленая карамель, обжаренный арахис, тёмный шоколад 54%, сливки 33%, яйца.',
    allergens: ['арахис', 'глютен', 'молоко', 'яйца'],
    nutritionalValue: { calories: 410, proteins: 7.5, fats: 23.0, carbs: 42.0 },
    images: [
      'https://images.pexels.com/photos/1055270/pexels-photo-1055270.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    featured: false,
    createdAt: '2026-02-12',
  },
  {
    id: 'p-9',
    slug: 'lemon-blueberry-cupcakes',
    name: 'Капкейки «Лимон & Голубика» (6 шт)',
    category: 'cupcakes',
    categoryName: 'Капкейки',
    price: 1600,
    weight: '510 г (6×85 г)',
    servings: '6 шт',
    description: 'Ароматный бисквит с цедрой сицилийского лимона, начинка из кисленького лимонного курда и украшение свежей голубикой.',
    composition: 'Сок и цедра лимона, свежая голубика, мука, сливочное масло, творожный сыр, яйца, сахар.',
    allergens: ['глютен', 'молоко', 'яйца'],
    nutritionalValue: { calories: 295, proteins: 4.2, fats: 14.8, carbs: 36.5 },
    images: [
      'https://images.pexels.com/photos/1055271/pexels-photo-1055271.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    featured: false,
    createdAt: '2026-02-14',
  },

  // --- ПЕЧЕНЬЕ ---
  {
    id: 'p-10',
    slug: 'classic-chocolate-chip-cookies',
    name: 'Печенье Кукис с тёмным шоколадом (6 шт)',
    category: 'cookies',
    categoryName: 'Печенье',
    price: 780,
    weight: '360 г (6×60 г)',
    servings: '6 шт',
    description: 'Настоящие американские cookies: хрустящий край, мягкий вискозный центр и крупные капли бельгийского тёмного шоколада.',
    composition: 'Мука пшеничная, нерафинированный сахар Muscovado, сливочное масло 82.5%, дропсы темного шоколада 54%, тростниковый сахар, морская соль Maldon.',
    allergens: ['глютен', 'молоко', 'яйца'],
    nutritionalValue: { calories: 430, proteins: 5.5, fats: 20.4, carbs: 56.0 },
    images: [
      'https://images.pexels.com/photos/34979324/pexels-photo-34979324.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/31323236/pexels-photo-31323236.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    featured: true,
    createdAt: '2026-02-20',
  },
  {
    id: 'p-11',
    slug: 'pistachio-cranberry-biscotti',
    name: 'Бискотти «Фисташка & Клюква» (180 г)',
    category: 'cookies',
    categoryName: 'Печенье',
    price: 520,
    weight: '180 г',
    servings: 'упаковка',
    description: 'Сухие хрустящие сухарики двойного запекания по тосканскому рецепту. С запеченной фисташкой, сушеной клюквой и апельсиновой цедрой. Без жира.',
    composition: 'Мука, яйца отборные, цедра апельсина свеженатёртая, цельное ядро фисташки, вяленая клюква без сахара, ванилин.',
    allergens: ['орехи (фисташка)', 'глютен', 'яйца'],
    nutritionalValue: { calories: 370, proteins: 9.2, fats: 8.5, carbs: 64.0 },
    images: [
      'https://images.pexels.com/photos/34979322/pexels-photo-34979322.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    featured: false,
    createdAt: '2026-02-22',
  },
  {
    id: 'p-12',
    slug: 'oatmeal-pecan-cookies',
    name: 'Печенье овсяное с пеканом и изюмом (8 шт)',
    category: 'cookies',
    categoryName: 'Печенье',
    price: 640,
    weight: '320 г (8×40 г)',
    servings: '8 шт',
    description: 'Плотное пряное овсяное печенье на цельнозерновых хлопьях с крупным орехом пекан, теневым изюмом и корицей. Умеренная сладость.',
    composition: 'Овсяные хлопья монастырские, мука пшеничная, орех пекан обжаренный, изюм темный теневой, корица молотая, сливочное масло, мёд гречишный натуральный.',
    allergens: ['орехи (пекан)', 'глютен', 'молоко', 'мёд'],
    nutritionalValue: { calories: 395, proteins: 6.8, fats: 17.2, carbs: 52.1 },
    images: [
      'https://images.pexels.com/photos/25401697/pexels-photo-25401697.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    featured: false,
    createdAt: '2026-02-25',
  },
];

export const SAMPLE_REVIEWS: Review[] = [
  {
    id: 'r-1',
    author: 'Елена В.',
    date: '12 февраля 2026',
    productName: 'Шоколадный торт с вишнёвым конфи',
    rating: 5,
    text: 'Торт заказывали на день рождения мужа. Вишнёвая начинка с настоящей кислинкой, а бисквит пропитан идеально, никакой сухости. Очень честный состав и аккуратная коробка.',
  },
  {
    id: 'r-2',
    author: 'Михаил и Ольга',
    date: '28 января 2026',
    productName: 'Торт «Малина-Фисташка»',
    rating: 5,
    text: 'Настоящий вкус фисташки, а не дешевый ароматизатор! Радует, что крем лёгкий, без тяжести. Курьер привез вовремя к 14:00.',
  },
  {
    id: 'r-3',
    author: 'Анна К.',
    date: '5 марта 2026',
    productName: 'Тарталетки с лесной малиной',
    rating: 5,
    text: 'Песочное тесто тает во рту, малина свежая, а ванильный заварной крем просто невероятный. Заказывала на чаепитие с коллегами, ушло за пару минут.',
  },
];

export const VALID_PROMO_CODES: Record<string, { code: string; discountPercent: number; description: string }> = {
  'FILUSHA10': { code: 'FILUSHA10', discountPercent: 10, description: 'Скидка 10% на первый заказ' },
  'SWEET15': { code: 'SWEET15', discountPercent: 15, description: 'Скидка 15% на выборочные позиции' },
};
