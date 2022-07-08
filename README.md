# Project overview

### This project is a backend for an online store website in which we can manage users, products, and orders.

## How to start he project?

## A. Installing dependencies and building the project

### 1- Install the dependencies listed in package.json using "yarn add" or "npm install"

### 2- Build the project using script "build"

## B. Creating database and user

### 4- Create the required user and database with the following commands:

`CREATE USER psql WITH PASSWORD 'password123'`
`CREATE DATABASE storefront_dev `

#### Grant access to the created user

`GRANT ALL PRIVILEGES ON DATABASE storefront_dev TO psql`

### 4- Run the migrations with the following db-migrate command:

`npx db-migrate up`

### 5- Use script "dev" to start the express server.

---

# Available endpoints:

## -- Users --

### api/users (POST) --> Creates a new user

### api/users (GET) --> Displays all users in the database

### api/users/:id (GET) --> Displays a user with the given id

### api/users/:id (delete) --> Deletes a user with the given id

### api/users/:id (patch) --> Updates user details for user with the given id

### api/users/authenticate (POST) --> Authenticates requeted user

## -- Products --

### api/products (POST) --> Creates a new product

### api/products (GET) --> Displays all products

### api/products/:id (GET) --> Views a specific product with the provided id

### api/products/:id (DELETE) --> Deletes a specific product with the provided id

## -- Orders --

### api/orders (POST) --> Open new order

### api/orders (GET) --> Orders index

### api/orders/:id (GET) --> View order with the given id

### api/orders/:id (PATCH) --> Close an open order

### api/orders/:id/products (POST) --> Add products to an order

## How to start using the API?

## Creating a user/product/order:

## (USER)

### Endpoint: api/users (POST)

### Required details:

### {

### "first_name": ,

### "last_name": ,

### "username": ,

### "password

### }

## (PRODUCT)

## Endpoint: api/products (POST)

## Required details:

### {

### "name": ,

### "price":

### }

## (ORDER)

## Endpoint: api/orders (POST)

## required details:

### {

### "user_id":

### }

# Viewing users/products/orders:

## VIEW ALL

## Endpoints:

### api/users (GET) --> View all users

### api/products (GET) --> View all products

### api/orders (GET) --> View all orders

## VIEW SPECIFIC

## Endpoins:

### api/users/:id (GET) --> View user with given id

### api/products/:id (GET) --> View product with given id

### api/orders/:id (GET) --> View order with given id

# Deleting a user/product

## Endpoints:

### api/users/:id (DELETE) --> Delete user with the given id

### api/products/:id (DELETE) --> Delete product with the given id

# Changing user details and closing orders

### Endpoints:

### api/users/:id (PATCH) --> Update user details (Same details required as when creating a user)

### api/orders/:id (PATCH) --> Mark order as complete

# Add products to an order

## Endpoint:

### api/orders/:id/products (POST) --> Adds a product to an existing order

## Required details:

### {

### "product_id": ,

### "quantity":

### }

# Testing

## In order to run a test, we use script "test"

# Available scripts

### "dev": Starts express server

### "build": Builds the project

### "format": Formats the code using prettier

### "lint": Lints the code using es-lint

### "test": Runs jasmine tests
