SELECT SUM(quantity), symbol FROM account_assets
WHERE client_id = $1
GROUP BY symbol