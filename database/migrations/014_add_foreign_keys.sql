-- Add foreign key constraints that were deferred due to table creation order

-- Add FK constraint for menu_items.ingredient_id
ALTER TABLE menu_items
  ADD CONSTRAINT fk_menu_items_ingredient_id
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE SET NULL;

-- Add FK constraint for ingredient_logs.order_id
ALTER TABLE ingredient_logs
  ADD CONSTRAINT fk_ingredient_logs_order_id
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL;

