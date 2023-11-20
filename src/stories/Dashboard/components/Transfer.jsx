import { React, useState, useEffect} from "react";
import { ItemTransfer } from "./ItemTransfer";
import { TransferMoneyForm } from "./Forms";

export const Transfer = ({userData}) => {
  const [transactions, setTransactions] = useState([]);
  const [creditCards, setCreditCards] = useState([]);

  useEffect(() => {
    if (userData.savings_account != null) {
      setTransactions(userData.savings_account.transactions);
    }
    if (userData.credit_cards != null) {
      setCreditCards(userData.credit_cards);
    }
  }
  , [userData]);

  console.log("transactions", transactions);
  console.log("creditCards", creditCards);
  

  return (
    <section className="transfer-section">
      <div className="transfer-section-header">
        <h2>Transactions</h2>
        <div className="filter-options">
        </div>
      </div>
      <div className="transfers">
        {/* For loop to render all the transactions */}
        {transactions.map((transaction) => (
          <ItemTransfer
            type="Transfer"
            description={transaction.description}
            fourDigits={transaction.number_of_savings_account}
            date={transaction.date_of_transaction}
            amount={transaction.amount}
            card="Debit"
            key={transaction.id}
          />
        ))}
        {/* For loop to render all the credit card activity from each credit card */}
        {creditCards.map((creditCard) => (
          creditCard.credit_card_activity.map((transaction) => (
            <ItemTransfer
              type="Credit Card"
              description={transaction.description}
              fourDigits={creditCard.card_number.slice(-4)}
              date={transaction.date_of_transaction}
              amount={transaction.amount}
              card="Credit"
              key={transaction.id}
            />
          ))
        ))}
        {userData.savings_account == null ? <p>No savings account created yet, create one</p> : null}
        {userData.credit_cards == null ? <p>No credit cards created yet, create one</p> : null}
      </div>
    </section>
  );
};
