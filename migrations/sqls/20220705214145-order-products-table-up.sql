CREATE TABLE order_products(
    quantity int,
    order_id int REFERENCES orders(id),
    product_id int REFERENCES products(id)
)