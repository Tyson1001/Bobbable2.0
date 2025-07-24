// Mock data for when Supabase is not configured
import type { Drink, Topping, MilkOption, SweetnessLevel } from '../lib/supabase';

export const mockDrinks: Drink[] = [
  {
    id: '1',
    name: 'Classic Milk Tea',
    price: 4.50,
    category: 'milk-tea',
    popular: true,
    description: 'Traditional milk tea with a perfect balance of tea and milk',
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Taro Milk Tea',
    price: 5.00,
    category: 'milk-tea',
    popular: true,
    description: 'Creamy taro-flavored milk tea with a beautiful purple color',
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Thai Tea',
    price: 4.75,
    category: 'milk-tea',
    popular: false,
    description: 'Rich and creamy Thai-style tea with condensed milk',
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Matcha Latte',
    price: 5.25,
    category: 'specialty',
    popular: true,
    description: 'Premium Japanese matcha with steamed milk',
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Brown Sugar Milk Tea',
    price: 5.50,
    category: 'milk-tea',
    popular: false,
    description: 'Rich brown sugar syrup with fresh milk and tea',
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Honeydew Smoothie',
    price: 4.25,
    category: 'smoothie',
    popular: false,
    description: 'Refreshing honeydew melon smoothie',
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Mango Green Tea',
    price: 4.00,
    category: 'fruit-tea',
    popular: false,
    description: 'Fresh mango flavor with green tea base',
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Passion Fruit Tea',
    price: 4.00,
    category: 'fruit-tea',
    popular: false,
    description: 'Tropical passion fruit with tea',
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '9',
    name: 'Jasmine Green Tea',
    price: 3.50,
    category: 'tea',
    popular: false,
    description: 'Fragrant jasmine green tea',
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '10',
    name: 'Oolong Tea',
    price: 3.75,
    category: 'tea',
    popular: false,
    description: 'Traditional oolong tea',
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const mockToppings: Topping[] = [
  {
    id: '1',
    name: 'Tapioca Pearls',
    price: 0.50,
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Popping Boba',
    price: 0.60,
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Jelly',
    price: 0.50,
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Pudding',
    price: 0.70,
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Red Bean',
    price: 0.60,
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Taro Balls',
    price: 0.65,
    available: true,
    created_at: new Date().toISOString()
  }
];

export const mockMilkOptions: MilkOption[] = [
  {
    id: '1',
    name: 'Regular Milk',
    price: 0.00,
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Oat Milk',
    price: 0.50,
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Almond Milk',
    price: 0.50,
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Coconut Milk',
    price: 0.50,
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Soy Milk',
    price: 0.40,
    available: true,
    created_at: new Date().toISOString()
  }
];

export const mockSweetnessLevels: SweetnessLevel[] = [
  {
    id: '1',
    name: '0% (No Sugar)',
    level: 0,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: '25% (Less Sweet)',
    level: 25,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: '50% (Half Sweet)',
    level: 50,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: '75% (Regular)',
    level: 75,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: '100% (Extra Sweet)',
    level: 100,
    created_at: new Date().toISOString()
  }
];