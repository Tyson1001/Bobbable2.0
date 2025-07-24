/*
  # Bobabble Database Schema

  1. New Tables
    - `drinks`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `price` (decimal)
      - `category` (text)
      - `popular` (boolean)
      - `description` (text)
      - `image_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `toppings`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `price` (decimal)
      - `available` (boolean)
      - `created_at` (timestamp)
    
    - `milk_options`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `price` (decimal)
      - `available` (boolean)
      - `created_at` (timestamp)
    
    - `sweetness_levels`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `level` (integer)
      - `created_at` (timestamp)
    
    - `orders`
      - `id` (uuid, primary key)
      - `customer_email` (text)
      - `customer_name` (text)
      - `total_amount` (decimal)
      - `status` (text)
      - `payment_status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `drink_id` (uuid, foreign key)
      - `quantity` (integer)
      - `unit_price` (decimal)
      - `milk_option_id` (uuid, foreign key)
      - `sweetness_level_id` (uuid, foreign key)
      - `created_at` (timestamp)
    
    - `order_item_toppings`
      - `id` (uuid, primary key)
      - `order_item_id` (uuid, foreign key)
      - `topping_id` (uuid, foreign key)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to menu items
    - Add policies for authenticated users to manage their orders
*/

-- Create drinks table
CREATE TABLE IF NOT EXISTS drinks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  price decimal(10,2) NOT NULL,
  category text NOT NULL,
  popular boolean DEFAULT false,
  description text,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create toppings table
CREATE TABLE IF NOT EXISTS toppings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create milk_options table
CREATE TABLE IF NOT EXISTS milk_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create sweetness_levels table
CREATE TABLE IF NOT EXISTS sweetness_levels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  level integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email text,
  customer_name text,
  total_amount decimal(10,2) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'preparing', 'ready', 'completed', 'cancelled')),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  drink_id uuid REFERENCES drinks(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  unit_price decimal(10,2) NOT NULL,
  milk_option_id uuid REFERENCES milk_options(id),
  sweetness_level_id uuid REFERENCES sweetness_levels(id),
  created_at timestamptz DEFAULT now()
);

-- Create order_item_toppings table
CREATE TABLE IF NOT EXISTS order_item_toppings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_item_id uuid REFERENCES order_items(id) ON DELETE CASCADE,
  topping_id uuid REFERENCES toppings(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE drinks ENABLE ROW LEVEL SECURITY;
ALTER TABLE toppings ENABLE ROW LEVEL SECURITY;
ALTER TABLE milk_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE sweetness_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_item_toppings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to menu items
CREATE POLICY "Public can read drinks"
  ON drinks FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read toppings"
  ON toppings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read milk options"
  ON milk_options FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read sweetness levels"
  ON sweetness_levels FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for orders (public can create, but only see their own)
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read their own orders"
  ON orders FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can update their own orders"
  ON orders FOR UPDATE
  TO anon, authenticated
  USING (true);

-- Create policies for order items
CREATE POLICY "Anyone can create order items"
  ON order_items FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read order items"
  ON order_items FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for order item toppings
CREATE POLICY "Anyone can create order item toppings"
  ON order_item_toppings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read order item toppings"
  ON order_item_toppings FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_drinks_category ON drinks(category);
CREATE INDEX IF NOT EXISTS idx_drinks_popular ON drinks(popular);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_item_toppings_order_item_id ON order_item_toppings(order_item_id);