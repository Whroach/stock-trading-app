-- SELECT aa.symbol, aa.quantity, aa.action_type, aa.timestamp, ab.cash_balance, ab.timestamp  from accounts AS a
-- JOIN account_assets AS aa ON a.account_id = aa.client_id
-- JOIN account_balance AS ab ON a.account_id = ab.customer_id
-- WHERE a.account_id = ${id}
-- ORDER BY (ab.timestamp, aa.timestamp) DESC


SELECT DISTINCT(aa.timestamp), aa.symbol, aa.quantity, aa.action_type from accounts AS a
JOIN account_assets AS aa ON a.account_id = aa.client_id
WHERE a.account_id = ${id}