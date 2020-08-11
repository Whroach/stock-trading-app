INSERT INTO order_history
(symbol, quantity, bid_price, ask_price, action_type, order_type, asset_type, client_id)
VALUES
(${symbol}, ${quantity}, ${bid_price}, ${ask_price}, ${action_type}, ${order_type}, ${asset_type}, ${id})