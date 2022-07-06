CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    status VARCHAR(20),
    user_id int REFERENCES users(id)
)