SELECT DISTINCT(timestamp), order_history_id AS history_id,  symbol, quantity, action_type, description FROM order_history
WHERE client_id = $1
ORDER BY timestamp desc


