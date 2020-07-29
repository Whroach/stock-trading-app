/* if the user is selling off a PORTION of their position in xyz security, then this query will take care of reducing
 the position from account_assets and archiving it in order_history.*/

WITH order_history AS ( UPDATE account_assets SET quantity = quantity - ${reduce} WHERE transaction_id = ${id}

RETURNING symbol, quantity, bid_price, ask_price, action_type, order_type, asset_type, date, transaction_id, client_id)


INSERT INTO order_history(symbol, quantity, bid_price, ask_price, action_type, order_type, asset_type, date, transaction_id, client_id)
SELECT * FROM order_history


