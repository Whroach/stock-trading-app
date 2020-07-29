/* if the user is selling off their ENTIRE/FULL position in xyz security, then this query will take care of removing the position from their account and archiving it in order_history*/


WITH order_history AS 
(DELETE FROM account_assets WHERE transaction_id = ${t_id} AND client_id = ${c_id} 

RETURNING symbol, quantity, bid_price, ask_price, action_type, order_type, asset_type,date, transaction_id, client_id)


INSERT INTO order_history
(symbol, quantity, bid_price, ask_price, action_type, order_type, asset_type, date, transaction_id, client_id)

SELECT * FROM order_history