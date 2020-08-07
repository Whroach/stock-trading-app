SELECT SUM(cash_balance) AS cash_balance FROM account_balance
WHERE customer_id = $1