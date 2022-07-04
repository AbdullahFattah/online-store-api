CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name varchar(50),
    last_name varchar(50),
    username varchar(50) NOT NULL,
    password varchar(100) NOT NULL 
    );