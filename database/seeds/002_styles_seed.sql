-- Seed data for styles table
-- Insert simple, grand, deluxe styles

INSERT INTO styles (name, price_modifier, details) VALUES
  ('simple', 0, '심플한 서빙 스타일'),
  ('grand', 10000, '그랜드 서빙 스타일 (+10,000원)'),
  ('deluxe', 20000, '디럭스 서빙 스타일 (+20,000원)')
ON CONFLICT (name) DO NOTHING;

