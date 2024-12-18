const users = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    password: '123456',
    role: 'Seller',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    password: '123456',
    role: 'Seller',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    password: '123456',
    role: 'Customer',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    password: '123456',
    role: 'Customer',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    password: '123456',
    role: 'Customer',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    password: '123456',
    role: 'Customer',
    image_url: '/customers/balazs-orban.png',
  },
];

const products = [
  {
    user_id: users[0].id,
    name: 'Magic Hat',
    price: 500,
    description: 'A hat that brings luck to its wearer.',
    category: 'Accessories',
    image: './product1.jpg',
  },
  {
    user_id: users[1].id,
    name: 'Olive Oil Premium',
    price: 1500,
    description: 'The finest olive oil for your gourmet needs.',
    category: 'Food',
    image: './product1.jpg',
  },
  {
    user_id: users[0].id,
    name: 'Enchanted Wand',
    price: 750,
    description: 'A wand that emits light and grants minor spells.',
    category: 'Magic Items',
    image: './product1.jpg',
  },
  {
    user_id: users[1].id,
    name: 'Handmade Wooden Bowl',
    price: 350,
    description: 'A beautifully handcrafted bowl made from oak wood.',
    category: 'Home Decor',
    image: './product1.jpg',
  },
  {
    user_id: users[0].id,
    name: 'Lucky Charm Bracelet',
    price: 200,
    description: 'A bracelet that brings good fortune to its owner.',
    category: 'Jewelry',
    image: './product1.jpg',
  },
  {
    user_id: users[1].id,
    name: 'Artisan Soap Set',
    price: 120,
    description: 'A set of organic handmade soaps with natural scents.',
    category: 'Personal Care',
    image: './product1.jpg',
  },
  {
    user_id: users[0].id,
    name: 'Crystal Pendant',
    price: 800,
    description: 'A pendant made of rare crystals with mystical powers.',
    category: 'Jewelry',
    image: './product1.jpg',
  },
  {
    user_id: users[1].id,
    name: 'Handwoven Rug',
    price: 2500,
    description: 'An intricate, colorful rug woven by skilled artisans.',
    category: 'Home Decor',
    image: './product1.jpg',
  },
  {
    user_id: users[0].id,
    name: 'Potion of Healing',
    price: 300,
    description: 'A small vial that restores energy and heals wounds.',
    category: 'Magic Items',
    image: './product1.jpg',
  },
  {
    user_id: users[1].id,
    name: 'Leather Handbag',
    price: 1800,
    description: 'A premium handcrafted leather handbag for daily use.',
    category: 'Accessories',
    image: './product1.jpg',
  },
  {
    user_id: users[0].id,
    name: 'Runestone Collection',
    price: 950,
    description: 'A set of enchanted runestones with ancient symbols.',
    category: 'Magic Items',
    image: './product1.jpg',
  },
  {
    user_id: users[1].id,
    name: 'Handcrafted Wine Glasses',
    price: 600,
    description: 'Elegant glassware perfect for wine enthusiasts.',
    category: 'Kitchenware',
    image: './product1.jpg',
  },
  {
    user_id: users[0].id,
    name: 'Spellbound Notebook',
    price: 400,
    description: 'A notebook that never runs out of pages.',
    category: 'Stationery',
    image: './product1.jpg',
  },
  {
    user_id: users[1].id,
    name: 'Ceramic Teapot Set',
    price: 700,
    description: 'A handmade ceramic teapot with matching cups.',
    category: 'Kitchenware',
    image: './product1.jpg',
  },
  {
    user_id: users[0].id,
    name: 'Elixir of Luck',
    price: 550,
    description: 'An elixir said to enhance luck and prosperity.',
    category: 'Magic Items',
    image: './product1.jpg',
  },
  {
    user_id: users[1].id,
    name: 'Organic Beeswax Candles',
    price: 150,
    description: 'Pure handmade candles with soothing scents.',
    category: 'Home Decor',
    image: './product1.jpg',
  },
  {
    user_id: users[0].id,
    name: 'Mystic Compass',
    price: 1200,
    description: 'A compass that always points to your heart’s desire.',
    category: 'Magic Items',
    image: './product1.jpg',
  },
  {
    user_id: users[1].id,
    name: 'Handcrafted Wooden Clock',
    price: 1350,
    description: 'A timeless piece made from fine wood.',
    category: 'Home Decor',
    image: './product1.jpg',
  },
  {
    user_id: users[0].id,
    name: 'Sorcerer’s Cloak',
    price: 2200,
    description: 'A cloak that shimmers and keeps its wearer warm.',
    category: 'Clothing',
    image: './product1.jpg',
  },
  {
    user_id: users[1].id,
    name: 'Custom Portrait Sketch',
    price: 1000,
    description: 'A hand-drawn portrait tailored just for you.',
    category: 'Art',
    image: './product1.jpg',
  },
];

const invoices = [
  {
    user_id: users[2].id, // Lee Robinson - Customer
    amount: 500,
    status: 'paid',
    date: '2023-12-10',
  },
  {
    user_id: users[3].id, // Michael Novotny - Customer
    amount: 1500,
    status: 'pending',
    date: '2023-12-15',
  },
  {
    user_id: users[4].id, // Amy Burns - Customer
    amount: 500,
    status: 'paid',
    date: '2023-11-25',
  },
  {
    user_id: users[5].id, // Balazs Orban - Customer
    amount: 1500,
    status: 'paid',
    date: '2023-11-30',
  },
  {
    user_id: users[2].id, // Lee Robinson - Customer
    amount: 750,
    status: 'pending',
    date: '2023-12-20',
  },
  {
    user_id: users[3].id, // Michael Novotny - Customer
    amount: 1200,
    status: 'paid',
    date: '2023-12-22',
  },
  {
    user_id: users[4].id, // Amy Burns - Customer
    amount: 800,
    status: 'pending',
    date: '2023-12-25',
  },
  {
    user_id: users[5].id, // Balazs Orban - Customer
    amount: 950,
    status: 'paid',
    date: '2023-12-28',
  },
  {
    user_id: users[2].id, // Lee Robinson - Customer
    amount: 600,
    status: 'paid',
    date: '2023-12-30',
  },
  {
    user_id: users[3].id, // Michael Novotny - Customer
    amount: 1100,
    status: 'pending',
    date: '2023-12-31',
  },
  {
    user_id: users[4].id, // Amy Burns - Customer
    amount: 1300,
    status: 'paid',
    date: '2024-01-02',
  },
  {
    user_id: users[5].id, // Balazs Orban - Customer
    amount: 1400,
    status: 'pending',
    date: '2024-01-05',
  },
  {
    user_id: users[2].id, // Lee Robinson - Customer
    amount: 900,
    status: 'paid',
    date: '2024-01-07',
  },
  {
    user_id: users[3].id, // Michael Novotny - Customer
    amount: 1600,
    status: 'pending',
    date: '2024-01-10',
  }
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

export { users, products, invoices, revenue };
