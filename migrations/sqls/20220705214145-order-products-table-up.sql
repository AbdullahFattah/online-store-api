CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
    quantity int NOT NULL,
    order_id int REFERENCES orders(id) NOT NULL,
    product_id int REFERENCES products(id) NOT NULL
)