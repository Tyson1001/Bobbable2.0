/*
  # Remove unwanted drink categories

  1. Changes
    - Remove drinks that are not milk tea or general drinks
    - Keep only milk tea category drinks and some general popular options
    - Update existing drinks to ensure they fit the focused menu

  2. Security
    - No changes to RLS policies needed
*/

-- Remove drinks that are not milk tea category
DELETE FROM drinks WHERE category IN ('fruit-tea', 'specialty', 'tea', 'smoothie');

-- Update any remaining drinks to ensure proper categorization
UPDATE drinks 
SET category = 'milk-tea' 
WHERE category NOT IN ('milk-tea') 
AND name IN (
  'Classic Milk Tea',
  'Taro Milk Tea', 
  'Thai Tea',
  'Brown Sugar Milk Tea',
  'Coconut Milk Tea',
  'Rose Milk Tea',
  'Strawberry Milk Tea',
  'Earl Grey Milk Tea',
  'Almond Milk Tea',
  'Vanilla Milk Tea'
);