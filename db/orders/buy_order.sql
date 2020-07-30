INSERT INTO account_assets 
(symbol, quantity, action_type, bid_price, ask_price, order_type, asset_type, client_id)
VALUES 
(${symbol}, ${quantity}, ${action_type}, ${bid_price}, ${ask_price}, ${order_type}, ${asset_type}, ${id})