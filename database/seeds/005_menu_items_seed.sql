-- Seed data for menu_items table
-- Menu items for all dinners

-- ============================================
-- Valentine Dinner
-- ============================================

-- Valentine Dinner: 스테이크 (필수 항목, 최소 2개)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '스테이크',
  2,
  '개',
  0,
  50000,
  true,
  false,
  true,
  true,
  5,
  2,
  (SELECT id FROM ingredients WHERE name = '고기'),
  1
FROM dinners d WHERE d.name = 'Valentine Dinner'
ON CONFLICT DO NOTHING;

-- Valentine Dinner: 와인 (필수 항목, 최소 2병)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '와인',
  2,
  '병',
  0,
  30000,
  true,
  false,
  true,
  true,
  5,
  2,
  (SELECT id FROM ingredients WHERE name = '와인'),
  1
FROM dinners d WHERE d.name = 'Valentine Dinner'
ON CONFLICT DO NOTHING;

-- Valentine Dinner: 샐러드 (선택 항목, 0개로 시작)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '샐러드',
  0,
  '개',
  0,
  15000,
  false,
  true,
  true,
  false,
  3,
  0,
  (SELECT id FROM ingredients WHERE name = '채소'),
  1
FROM dinners d WHERE d.name = 'Valentine Dinner'
ON CONFLICT DO NOTHING;

-- Valentine Dinner: 빵 (선택 항목, 0개로 시작)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '빵',
  0,
  '개',
  0,
  5000,
  false,
  true,
  true,
  false,
  6,
  0,
  (SELECT id FROM ingredients WHERE name = '바게트빵'),
  1
FROM dinners d WHERE d.name = 'Valentine Dinner'
ON CONFLICT DO NOTHING;

-- ============================================
-- French Dinner
-- ============================================

-- French Dinner: 스테이크 (필수 항목, 최소 1개)
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

-- French Dinner: 샐러드 (필수 항목, 최소 1개)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '샐러드',
  1,
  '개',
  0,
  20000,
  true,
  false,
  true,
  true,
  3,
  1,
  (SELECT id FROM ingredients WHERE name = '채소'),
  1
FROM dinners d WHERE d.name = 'French Dinner'
ON CONFLICT DO NOTHING;

-- French Dinner: 커피 (선택 항목, 기본 1잔, 삭제 가능)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '커피',
  1,
  '잔',
  0,
  10000,
  false,
  true,
  true,
  true,
  3,
  0,
  (SELECT id FROM ingredients WHERE name = '커피'),
  1
FROM dinners d WHERE d.name = 'French Dinner'
ON CONFLICT DO NOTHING;

-- French Dinner: 와인 (선택 항목, 기본 1병, 삭제 가능)
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
  0,
  (SELECT id FROM ingredients WHERE name = '와인'),
  1
FROM dinners d WHERE d.name = 'French Dinner'
ON CONFLICT DO NOTHING;

-- ============================================
-- English Dinner
-- ============================================

-- English Dinner: 스테이크 (필수 항목, 최소 1개)
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

-- English Dinner: 빵 (필수 항목, 최소 1개)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '빵',
  1,
  '개',
  0,
  5000,
  true,
  false,
  true,
  true,
  6,
  1,
  (SELECT id FROM ingredients WHERE name = '바게트빵'),
  1
FROM dinners d WHERE d.name = 'English Dinner'
ON CONFLICT DO NOTHING;

-- English Dinner: 베이컨 (선택 항목, 기본 1개, 삭제 가능)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '베이컨',
  1,
  '개',
  0,
  12000,
  false,
  true,
  true,
  true,
  4,
  0,
  (SELECT id FROM ingredients WHERE name = '고기'),
  1
FROM dinners d WHERE d.name = 'English Dinner'
ON CONFLICT DO NOTHING;

-- English Dinner: 에그스크램블 (선택 항목, 기본 1개, 삭제 가능)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '에그스크램블',
  1,
  '개',
  0,
  15000,
  false,
  true,
  true,
  true,
  3,
  0,
  (SELECT id FROM ingredients WHERE name = '계란'),
  1
FROM dinners d WHERE d.name = 'English Dinner'
ON CONFLICT DO NOTHING;

-- ============================================
-- Champagne Feast
-- ============================================

-- Champagne Feast: 샴페인 (필수 항목, 최소 1병)
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

-- Champagne Feast: 스테이크 (필수 항목, 최소 2개)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '스테이크',
  2,
  '개',
  0,
  70000,
  true,
  false,
  true,
  true,
  5,
  2,
  (SELECT id FROM ingredients WHERE name = '고기'),
  1
FROM dinners d WHERE d.name = 'Champagne Feast'
ON CONFLICT DO NOTHING;

-- Champagne Feast: 빵 (4개 고정, 변경 불가)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '빵',
  4,
  '개',
  0,
  0,
  false,
  true,
  false,
  false,
  4,
  4,
  (SELECT id FROM ingredients WHERE name = '바게트빵'),
  1
FROM dinners d WHERE d.name = 'Champagne Feast'
ON CONFLICT DO NOTHING;

-- Champagne Feast: 커피 (1포트 = 5잔, 추가 불가, 삭제만 가능)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '커피',
  1,
  '포트',
  0,
  50000,
  false,
  true,
  false,
  true,
  1,
  0,
  (SELECT id FROM ingredients WHERE name = '커피'),
  5
FROM dinners d WHERE d.name = 'Champagne Feast'
ON CONFLICT DO NOTHING;

-- Champagne Feast: 와인 (선택 항목, 기본 2잔, 삭제 가능)
INSERT INTO menu_items (dinner_id, name, default_quantity, unit, base_price, additional_price, is_required, can_remove, can_increase, can_decrease, max_quantity, min_quantity, ingredient_id, ingredient_quantity_per_unit)
SELECT 
  d.id,
  '와인',
  2,
  '잔',
  0,
  20000,
  false,
  true,
  true,
  true,
  5,
  0,
  (SELECT id FROM ingredients WHERE name = '와인'),
  1
FROM dinners d WHERE d.name = 'Champagne Feast'
ON CONFLICT DO NOTHING;


