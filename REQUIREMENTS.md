## API Endpoints

#### Products

- Index "api/products" (GET)
- Show "api/products/:id" (GET)
- Create "api/products" (POST)
- Delete "api/products/:id" (DELETE)

#### Users

- Index "api/users" (GET)
- Show "api/users/:id" (GET)
- Create "api/users" (POST)
- Delete "api/users/:id" (DELETE)
- Update "api/users/:id" (patch)
- Authenticate "api/users/authenticate" (POST)

#### Orders

- Create "api/orders" (POST)
- Index "api/orders" (GET)
- Show "api/orders/:id" (GET)
- Close "api/orders/:id" (PATCH)
- Add products "api/orders/:id/products" (POST)

## Data Shapes

#### products

- id (id)
- name (name)
- price (price)

#### users

- id (id)
- first name (first_name)
- last name (last_name)
- username (username)
- password (password)

#### orders

- id (id)
- user id (user_id)
- status of order (status)

#### order_products

- id (id)
- quantity (quantity)
- order id (order_id)
- product id (product_id)
