SELECT acc.account_id, acc.first_name, acc.last_name, aa.symbol, MAX(aa.quantity) FROM accounts AS acc 
JOIN account_assets AS aa ON acc.account_id = aa.client_id
WHERE acc.account_id = ${id} AND aa.symbol = ${symbol}
GROUP BY acc.account_id, aa.symbol