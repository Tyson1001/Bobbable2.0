import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Drink {
  id: string;
  name: string;
  price: number;
  category: string;
  popular: boolean;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Topping {
  id: string;
  name: string;
  price: number;
  available: boolean;
  created_at: string;
}

export interface MilkOption {
  id: string;
  name: string;
  price: number;
  available: boolean;
  created_at: string;
}

export interface SweetnessLevel {
  id: string;
  name: string;
  level: number;
  created_at: string;
}

export interface Order {
  id: string;
  customer_email?: string;
  customer_name?: string;
  total_amount: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  drink_id: string;
  quantity: number;
  unit_price: number;
  milk_option_id?: string;
  sweetness_level_id?: string;
  created_at: string;
  drink?: Drink;
  milk_option?: MilkOption;
  sweetness_level?: SweetnessLevel;
  toppings?: Topping[];
}

export interface OrderItemTopping {
  id: string;
  order_item_id: string;
  topping_id: string;
  created_at: string;
  topping?: Topping;
}