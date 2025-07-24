/*
  # Seed Initial Data

  1. Insert sample drinks
  2. Insert toppings
  3. Insert milk options
  4. Insert sweetness levels
*/

-- Insert drinks
INSERT INTO drinks (name, price, category, popular, description) VALUES
('Classic Milk Tea', 4.50, 'milk-tea', true, 'Traditional milk tea with a perfect balance of tea and milk'),
('Taro Milk Tea', 5.00, 'milk-tea', true, 'Creamy taro-flavored milk tea with a beautiful purple color'),
('Thai Tea', 4.75, 'milk-tea', false, 'Rich and creamy Thai-style tea with condensed milk'),
('Matcha Latte', 5.25, 'specialty', true, 'Premium Japanese matcha with steamed milk'),
('Brown Sugar Milk Tea', 5.50, 'milk-tea', false, 'Rich brown sugar syrup with fresh milk and tea'),
('Honeydew Smoothie', 4.25, 'smoothie', false, 'Refreshing honeydew melon smoothie'),
('Mango Green Tea', 4.00, 'fruit-tea', false, 'Fresh mango flavor with green tea base'),
('Passion Fruit Tea', 4.00, 'fruit-tea', false, 'Tropical passion fruit with tea'),
('Coconut Milk Tea', 4.75, 'milk-tea', false, 'Creamy coconut milk tea'),
('Jasmine Green Tea', 3.50, 'tea', false, 'Fragrant jasmine green tea'),
('Oolong Tea', 3.75, 'tea', false, 'Traditional oolong tea'),
('Lychee Black Tea', 4.25, 'fruit-tea', false, 'Sweet lychee with black tea'),
('Rose Milk Tea', 5.00, 'specialty', false, 'Floral rose-flavored milk tea'),
('Wintermelon Tea', 3.75, 'tea', false, 'Refreshing wintermelon tea'),
('Peach Oolong', 4.50, 'fruit-tea', false, 'Sweet peach with oolong tea'),
('Lavender Honey Tea', 4.75, 'specialty', false, 'Calming lavender with honey'),
('Strawberry Milk Tea', 4.50, 'milk-tea', false, 'Sweet strawberry milk tea'),
('Coffee Milk Tea', 5.25, 'specialty', false, 'Coffee and tea fusion'),
('Earl Grey Milk Tea', 4.25, 'milk-tea', false, 'Classic Earl Grey with milk'),
('Pineapple Green Tea', 4.00, 'fruit-tea', false, 'Tropical pineapple green tea'),
('Almond Milk Tea', 5.00, 'milk-tea', false, 'Nutty almond milk tea'),
('Grapefruit Green Tea', 4.25, 'fruit-tea', false, 'Citrusy grapefruit green tea'),
('Vanilla Milk Tea', 4.75, 'milk-tea', false, 'Smooth vanilla milk tea'),
('Lemon Honey Tea', 3.50, 'tea', false, 'Refreshing lemon honey tea')
ON CONFLICT (name) DO NOTHING;

-- Insert toppings
INSERT INTO toppings (name, price, available) VALUES
('Tapioca Pearls', 0.50, true),
('Popping Boba', 0.60, true),
('Jelly', 0.50, true),
('Pudding', 0.70, true),
('Red Bean', 0.60, true),
('Taro Balls', 0.65, true),
('Grass Jelly', 0.55, true),
('Aloe Vera', 0.60, true)
ON CONFLICT (name) DO NOTHING;

-- Insert milk options
INSERT INTO milk_options (name, price, available) VALUES
('Regular Milk', 0.00, true),
('Oat Milk', 0.50, true),
('Almond Milk', 0.50, true),
('Coconut Milk', 0.50, true),
('Soy Milk', 0.40, true),
('Non-Dairy Creamer', 0.00, true)
ON CONFLICT (name) DO NOTHING;

-- Insert sweetness levels
INSERT INTO sweetness_levels (name, level) VALUES
('0% (No Sugar)', 0),
('25% (Less Sweet)', 25),
('50% (Half Sweet)', 50),
('75% (Regular)', 75),
('100% (Extra Sweet)', 100)
ON CONFLICT (name) DO NOTHING;