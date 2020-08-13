SELECT symbol, quantity, action_type FROM order_history
WHERE client_id = $1
ORDER BY timestamp DESC