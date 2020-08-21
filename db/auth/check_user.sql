SELECT * FROM account_balance AS ab
JOIN accounts AS a ON ab.customer_id = a.account_id
WHERE a.username = ${username}

-- SELECT * FROM accounts 
-- WHERE username = ${username}