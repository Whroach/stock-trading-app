CREATE TABLE accounts(
  
  account_id SERIAL PRIMARY KEY,
  username VARCHAR(200),
  password TEXT,
  account_type VARCHAR(200)
  first_name VARCHAR(200),
  last_name VARCHAR(200),
  age INT

);


CREATE TABLE users_positions(
  position_id SERIAL PRIMARY KEY,
  position_name VARCHAR(200),
  symbol VARCHAR(200),
  quantity INT,
  price INT,
  order_type VARCHAR(50),
  asset_type VARCHAR(200),
  sales_id INT references order_details(order_id)
  
);


CREATE TABLE order_details(
  order_id SERIAL PRIMARY KEY,
  date TIMESTAMP DATETIME,
  action VARCHAR(50),
  customer_id INT references accounts(account_id) 
  

);

CREATE TABLE account_balance(
  balance_id SERIAL PRIMARY KEY,
  cash_balance INT,
  buying_power INT,
  customer_id INT references accounts(account_id)
  

);

