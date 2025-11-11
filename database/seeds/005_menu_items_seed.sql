-- Seed data for menu_items table
-- Menu items for all dinners

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

-- Valentine Dinner: 와인 (선택 항목)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '와인',
  1,
  '병',
  0,
  30000,
  false,
  true,
  true,
  true,
  3,
  1,
  (SELECT id FROM ingredients WHERE name = '와인'),
  1
FROM dinners d WHERE d.name = 'Valentine Dinner'
ON CONFLICT DO NOTHING;

-- French Dinner: 스테이크 (필수 항목)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '스테이크',
  1,
  '개',
  0,
  60000,
  true,
  false,
  true,
  true,
  3,
  1,
  (SELECT id FROM ingredients WHERE name = '고기'),
  1
FROM dinners d WHERE d.name = 'French Dinner'
ON CONFLICT DO NOTHING;

-- French Dinner: 와인 (선택 항목)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '와인',
  1,
  '병',
  0,
  40000,
  false,
  true,
  true,
  true,
  3,
  1,
  (SELECT id FROM ingredients WHERE name = '와인'),
  1
FROM dinners d WHERE d.name = 'French Dinner'
ON CONFLICT DO NOTHING;

-- French Dinner: 바게트빵 (선택 항목)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '바게트빵',
  4,
  '개',
  0,
  0,
  false,
  true,
  true,
  true,
  6,
  1,
  (SELECT id FROM ingredients WHERE name = '바게트빵'),
  1
FROM dinners d WHERE d.name = 'French Dinner'
ON CONFLICT DO NOTHING;

-- English Dinner: 스테이크 (필수 항목)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '스테이크',
  1,
  '개',
  0,
  55000,
  true,
  false,
  true,
  true,
  3,
  1,
  (SELECT id FROM ingredients WHERE name = '고기'),
  1
FROM dinners d WHERE d.name = 'English Dinner'
ON CONFLICT DO NOTHING;

-- English Dinner: 와인 (선택 항목)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '와인',
  1,
  '병',
  0,
  35000,
  false,
  true,
  true,
  true,
  3,
  1,
  (SELECT id FROM ingredients WHERE name = '와인'),
  1
FROM dinners d WHERE d.name = 'English Dinner'
ON CONFLICT DO NOTHING;

-- Champagne Feast: 샴페인 (필수 항목, 1~3병)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '샴페인',
  1,
  '병',
  0,
  15000,
  true,
  false,
  true,
  true,
  3,
  1,
  (SELECT id FROM ingredients WHERE name = '샴페인'),
  1
FROM dinners d WHERE d.name = 'Champagne Feast'
ON CONFLICT DO NOTHING;

-- Champagne Feast: 스테이크 (필수 항목)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '스테이크',
  1,
  '개',
  0,
  70000,
  true,
  false,
  true,
  true,
  3,
  1,
  (SELECT id FROM ingredients WHERE name = '고기'),
  1
FROM dinners d WHERE d.name = 'Champagne Feast'
ON CONFLICT DO NOTHING;

-- Champagne Feast: 바게트빵 (포함 항목, 4~6개)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '바게트빵',
  4,
  '개',
  0,
  0,
  false,
  true,
  true,
  true,
  6,
  1,
  (SELECT id FROM ingredients WHERE name = '바게트빵'),
  1
FROM dinners d WHERE d.name = 'Champagne Feast'
ON CONFLICT DO NOTHING;

-- Champagne Feast: 커피 (선택 항목)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '커피',
  1,
  '잔',
  0,
  0,
  false,
  true,
  true,
  true,
  3,
  1,
  (SELECT id FROM ingredients WHERE name = '커피'),
  1
FROM dinners d WHERE d.name = 'Champagne Feast'
ON CONFLICT DO NOTHING;

