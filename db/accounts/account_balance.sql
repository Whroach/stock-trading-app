SELECT ab.cash_balance, a.account_id, a.first_name, a.last_name FROM account_balance AS ab
JOIN accounts AS a ON ab.customer_id = a.account_id
WHERE a.account_id = $1