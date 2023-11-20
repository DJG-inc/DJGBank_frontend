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

const LoanCreationForm = ({ onConfirm, onCancel }) => {
  const [amount, setAmount] = useState("");
  const [installments, setInstallments] = useState("");

  const handleSubmit = () => {
    onConfirm({ amount, installments });
  };

  return (
    <div className="cardmodal-body-content">
      <div className="cardmodal-body-content-form">
        <div className="cardmodal-body-content-form-input">
          <label>Loan Amount</label>
          <input
            type="number"
            placeholder="Loan Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <label>Months to Pay (Installments)</label>
          <input
            type="number"
            placeholder="Months to Pay"
            value={installments}
            onChange={(e) => setInstallments(e.target.value)}
          />
        </div>
        <div className="cardmodal-footer">
          <button className="save-button" onClick={handleSubmit}>
            Confirm
          </button>
          <button className="delete-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

//   export all forms
export { TransferMoneyForm, AdvanceMoneyForm, PayDebtForm, LoanCreationForm };
