-- Seed data for menu_items table
-- Example menu items for Valentine Dinner

-- Valentine Dinner: 스테이크 (필수 항목)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '스테이크',
  1,
  '개',
  0,
  50000,
  true,
  false,
  true,
  true,
  3,
  1,
  (SELECT id FROM ingredients WHERE name = '고기'),
  1
FROM dinners d WHERE d.name = 'Valentine Dinner'
ON CONFLICT DO NOTHING;

