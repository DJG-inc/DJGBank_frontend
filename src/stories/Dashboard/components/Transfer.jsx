import { React, useState } from "react";
import { ItemTransfer } from "./ItemTransfer";
import { TransferMoneyForm } from "./Forms";

export const Transfer = ({userData}) => {
  const [transactions, setTransactions] = useState(userData.savings_account.transactions);
  const [creditCards, setCreditCards] = useState(userData.credit_cards);
  

  return (
    <section className="transfer-section">
      <div className="transfer-section-header">
        <h2>Transactions</h2>
        <div className="filter-options">
          {/* <p>lol</p>
          <button className="icon-button">
            <i className="ph-plus"></i>
          </button> */}
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

        {/* if userData.savings_account == null we should put a message that says no savings account created yet, create one */}

        {/* if userData.credit_cards == null we should put a message that says no credit cards created yet, create one */}

        {/* if userData.savings_account.transactions == null we should put a message that says no transactions yet, make one */}

        {/* if userData.credit_cards.credit_card_activity == null we should put a message that says no credit card activity yet, make one */}

        {/* if userData.savings_account.transactions == null && userData.credit_cards.credit_card_activity == null we should put a message that says no activity yet, make one */}


        {userData.savings_account == null ? <p>No savings account created yet, create one</p> : null}
        {userData.credit_cards == null ? <p>No credit cards created yet, create one</p> : null}
        


        
      </div>
    </section>
  );
};
