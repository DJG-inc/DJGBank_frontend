import React, { useState } from "react";

const TransferMoneyForm = ({ onConfirm, onCancel }) => {
    const [accountNumber, setAccountNumber] = useState("");
    const [userId, setUserId] = useState("");
    const [amount, setAmount] = useState("");
  
    return (
      <div className="transfer-money-form">
        <h3>Transfer Money</h3>
        <input
          type="text"
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="confirm-button"
          onClick={() => onConfirm(accountNumber, userId, amount)}
        >
          Confirm Transfer
        </button>
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    );
  };
  
  // Advance Money Form Component
  const AdvanceMoneyForm = ({ onConfirm, onCancel }) => {
    const [amount, setAmount] = useState("");
  
    return (
      <div className="advance-money-form">
        <h3>Advance Money</h3>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="confirm-button" onClick={() => onConfirm(amount)}>
          Confirm Advance
        </button>
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    );
  };
  
  const PayDebtForm = ({ onConfirm, onCancel }) => {
    const [amount, setAmount] = useState("");
  
    return (
      <div className="pay-debt-form">
        <h3>Pay Debt</h3>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="confirm-button" onClick={() => onConfirm(amount)}>
          Confirm Payment
        </button>
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    );
  };

//   export all forms
export { TransferMoneyForm, AdvanceMoneyForm, PayDebtForm };