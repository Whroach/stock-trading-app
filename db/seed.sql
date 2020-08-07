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

CREATE TABLE users_watchlist(
  watchlist_id SERIAL PRIMARY KEY,
  symbol VARCHAR(200),
  client_id INT references accounts(account_id)

)





-- sell_order file
/* if the user is selling off their ENTIRE/FULL position in xyz security, then this query will take care of removing the position from their account and archiving it in order_history*/


-- WITH order_history AS 
-- (DELETE FROM account_assets WHERE transaction_id = ${t_id} AND client_id = ${c_id}

-- WITH order_history AS


-- RETURNING symbol, quantity, bid_price, ask_price, action_type, order_type, asset_type,date, transaction_id, client_id)


-- INSERT INTO order_history
-- (symbol, quantity, bid_price, ask_price, action_type, order_type, asset_type, date, transaction_id, client_id)

-- SELECT * FROM order_history