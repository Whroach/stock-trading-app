CREATE TABLE accounts(
  
  account_id SERIAL PRIMARY KEY,
  username VARCHAR(200),
  password TEXT,
  account_type VARCHAR(200)
  first_name VARCHAR(200),
  last_name VARCHAR(200),
  age INT

);


CREATE TABLE account_assets (
  transaction_id SERIAL PRIMARY KEY,
  symbol VARCHAR(200),
  quantity INT,
  action_type VARCHAR(50),
  bid_price INT,
  ask_price INT,
  order_type VARCHAR(50),
  asset_type VARCHAR(200),
  timestamp timestamp default current_timestamp,
  client_id INT references accounts(account_id)
  
);

CREATE TABLE order_history (
  order_history_id SERIAL PRIMARY KEY,
  symbol VARCHAR(200),
  quantity INT,
  bid_price INT,
  ask_price INT,
  action_type VARCHAR(50),
  order_type VARCHAR(50),
  asset_type VARCHAR(200),
   timestamp timestamp default current_timestamp,
  transaction_id INT,
  client_id INT references accounts(account_id)
)




CREATE TABLE account_balance(
  balance_id SERIAL PRIMARY KEY,
  cash_balance INT,
  buying_power INT,
  customer_id INT references accounts(account_id)
  timestamp timestamp default current_timestamp  

);

