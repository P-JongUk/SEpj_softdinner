-- Seed data for dinners table
-- Insert Valentine, French, English, Champagne Feast dinners

INSERT INTO dinners (name, base_price, description, available_styles, image_url) VALUES
  ('Valentine Dinner', 150000, '로맨틱한 발렌타인 디너 세트', ARRAY['simple', 'grand', 'deluxe']::TEXT[], NULL),
  ('French Dinner', 200000, '프랑스 전통 디너 세트', ARRAY['simple', 'grand', 'deluxe']::TEXT[], NULL),
  ('English Dinner', 180000, '영국 전통 디너 세트', ARRAY['simple', 'grand', 'deluxe']::TEXT[], NULL),
  ('Champagne Feast', 300000, '샴페인 축제 디너 세트', ARRAY['grand', 'deluxe']::TEXT[], NULL)
ON CONFLICT (name) DO NOTHING;

