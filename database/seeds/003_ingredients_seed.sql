-- Seed data for ingredients table
-- Insert 7 ingredients: 고기, 채소, 와인, 샴페인, 커피, 바게트빵, 계란

INSERT INTO ingredients (name, quantity, unit, category) VALUES
  ('고기', 100, '개', 'meat'),
  ('채소', 200, '개', 'vegetable'),
  ('와인', 50, '병', 'beverage'),
  ('샴페인', 30, '병', 'beverage'),
  ('커피', 100, '잔', 'beverage'),
  ('바게트빵', 200, '개', 'bread'),
  ('계란', 150, '개', 'dairy')
ON CONFLICT (name) DO NOTHING;

