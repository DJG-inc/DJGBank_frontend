/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { React, useState, useEffect } from "react";
import { useDash } from "../../../Context/DashContext";
import { TransferMoneyForm, AdvanceMoneyForm, PayDebtForm } from "./Forms";
import Swal from "sweetalert2";

function formatDateStringForCard(dateStr) {
  // Extract the year and month from the date string
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(5, 7);

  // Return the formatted date string in MM/YY format
  return `${month}/${year.substring(2, 4)}`;
}

function formatBalance(balance) {
  // Create a new Intl.NumberFormat instance
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 1,
  });

  // Use the formatter to format the balance
  return formatter.format(balance);
}

function formatCardNumber(number) {
  console.log(number);
  const formattedCardNumber = "••••" + number.slice(-4);

  // Use the formatter to format the card number
  return formattedCardNumber;
}

export const PaymentCard = ({
  color,
  cardNumber,
  expiryDate,
  balance,
  cardType,
  cardName,
  cardId
}) => {
  // Inside your PaymentCard component
  const {
    createTransaction,
    createCreditCardActivity,
    cancelCreditCard,
    cancelDebitCard,
  } = useDash();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (content) => {
    setIsModalOpen(true);
    setModalContent(content);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(""); // Reset the modal content
  };

  const handleCancelCard = async () => {
    const confirmCancel = await Swal.fire({
      title: "Cancel Card",
      text: `Do you want to cancel this card?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    });
    if (confirmCancel) {
    
      if (cardName === "Credit") {
        try {
          const res = await cancelCreditCard(cardId);
          if (res) {
            await Swal.fire({
              title: "Success",
              text: "The card was cancelled successfully!",
              icon: "success",
              timer: 2000,
              timerProgressBar: true,
            });
            window.location.reload(); // Reload the page after the Swal alert
          } else {
            await Swal.fire(
              "Error",
              "There was an issue with the cancellation",
              "error"
            );
          }
        } catch (error) {
          await Swal.fire(
            "Error",
            "There was an issue with the cancellation",
            "error"
          );
        }
      }

      if (cardName === "Debit") {
        try {
          const res = await cancelDebitCard(cardId);
          if (res) {
            await Swal.fire({
              title: "Success",
              text: "The card was cancelled successfully!",
              icon: "success",
              timer: 2000,
              timerProgressBar: true,
            });
            window.location.reload(); // Reload the page after the Swal alert
          } else {
            await Swal.fire(
              "Error",
              "There was an issue with the cancellation",
              "error"
            );
          }
        } catch (error) {
          await Swal.fire(
            "Error",
            "There was an issue with the cancellation",
            "error"
          );
        }
      }

      closeModal();
    }
  };

  const handleTransferConfirm = async (accountNumber, userId, amount) => {
    const confirm = await Swal.fire({
      title: "Confirm Transfer",
      text: `Transfer $${amount} to account ${accountNumber}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const transaction = await createTransaction(
          userId,
          accountNumber,
          amount,
          `Transfer to ${accountNumber} with id ${userId}`
        );
        if (transaction) {
          await Swal.fire({
            title: "Success",
            text: "The transfer was successful!",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
          });
          window.location.reload(); // Reload the page after the Swal alert
        }
      } catch (error) {
        await Swal.fire(
          "Error",
          "There was an issue with the transaction",
          "error"
        );
      }
    }
  };

  const handleAdvanceConfirm = async (amount) => {
    const confirm = await Swal.fire({
      title: "Confirm Advance",
      text: `Advance $${amount} from your credit card?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const activity = await createCreditCardActivity(amount, "CASH_ADVANCE", cardId);
        if (activity) {
          await Swal.fire({
            title: "Success",
            text: "The advance was successful!",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
          });
          window.location.reload(); // Reload the page after the Swal alert
        }
      } catch (error) {
        console.log(error);
        await Swal.fire(
          "Error",
          "There was an issue with the advance",
          "error"
        );
      }
    }
  };

  const handlePayConfirm = async (amount) => {
    const confirm = await Swal.fire({
      title: "Confirm Payment",
      text: `Pay $${amount} from your credit card?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const activity = await createCreditCardActivity(amount, "PAYMENT", cardId);
        if (activity) {
          await Swal.fire({
            title: "Success",
            text: "The payment was successful!",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
          });
          window.location.reload(); // Reload the page after the Swal alert
        }
      } catch (error) {
        await Swal.fire(
          "Error",
          "There was an issue with the payment",
          "error"
        );
      }
    }
  };

  return (
    <div className="payment">
      <div className={`card ${color}`}>
        <span>{formatDateStringForCard(expiryDate)}</span>
        <span>{formatCardNumber(cardNumber)}</span>
      </div>
      <div className="payment-details">
        {cardType === "Mastercard" ? (
          <svg
            width="2001"
            height="1237"
            viewBox="0 0 2001 1237"
            fill="none"
            className="card-type"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="a624784f2834e21c94a1c0c9a58bbbaa">
              <path
                id="7869b07bea546aa59a5ee138adbcfd5a"
                d="M1270.57 1104.15H729.71V132.15H1270.58L1270.57 1104.15Z"
                fill="currentColor"
              ></path>
              <path
                id="b54e3ab4d7044a9f288082bc6b864ae6"
                d="M764 618.17C764 421 856.32 245.36 1000.08 132.17C891.261 46.3647 756.669 -0.204758 618.09 9.6031e-07C276.72 9.6031e-07 0 276.76 0 618.17C0 959.58 276.72 1236.34 618.09 1236.34C756.672 1236.55 891.268 1189.98 1000.09 1104.17C856.34 991 764 815.35 764 618.17Z"
                fill="currentColor"
              ></path>
              <path
                id="67f94b4d1b83252a6619ed6e0cc0a3a1"
                d="M2000.25 618.17C2000.25 959.58 1723.53 1236.34 1382.16 1236.34C1243.56 1236.54 1108.95 1189.97 1000.11 1104.17C1143.91 990.98 1236.23 815.35 1236.23 618.17C1236.23 420.99 1143.91 245.36 1000.11 132.17C1108.95 46.3673 1243.56 -0.201169 1382.15 -2.24915e-05C1723.52 -2.24915e-05 2000.24 276.76 2000.24 618.17"
                fill="currentColor"
              ></path>
            </g>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2500"
            height="2500"
            className="card-type"
            viewBox="0 0 141.732 141.732"
          >
            <g fill="currentColor">
              <path d="M62.935 89.571h-9.733l6.083-37.384h9.734zM45.014 52.187L35.735 77.9l-1.098-5.537.001.002-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s4.691.976 10.181 4.273l8.456 32.479h10.141l15.485-37.385H45.014zM121.569 89.571h8.937l-7.792-37.385h-7.824c-3.613 0-4.493 2.786-4.493 2.786L95.881 89.571h10.146l2.029-5.553h12.373l1.14 5.553zm-10.71-13.224l5.114-13.99 2.877 13.99h-7.991zM96.642 61.177l1.389-8.028s-4.286-1.63-8.754-1.63c-4.83 0-16.3 2.111-16.3 12.376 0 9.658 13.462 9.778 13.462 14.851s-12.075 4.164-16.06.965l-1.447 8.394s4.346 2.111 10.986 2.111c6.642 0 16.662-3.439 16.662-12.799 0-9.72-13.583-10.625-13.583-14.851.001-4.227 9.48-3.684 13.645-1.389z" />
            </g>
            <path
              d="M34.638 72.364l-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s7.373 1.528 14.445 7.253c6.762 5.472 8.967 12.292 8.967 12.292z"
              fill="currentColor"
            />
            <path fill="none" d="M0 0h141.732v141.732H0z" />
          </svg>
        )}
        <h3>{cardName}</h3>
        <div>
          <label className="balance-label">
            {cardName === "Debit" ? "Balance" : "Current Debt"}
          </label>
          <span>{formatBalance(balance)}</span>
          <button className="icon-button" onClick={() => openModal("details")}>
            <i className="ph-caret-right-bold"></i>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="cardmodal">
          <div className="cardmodal-body">
            {modalContent === "transfer" && (
              <TransferMoneyForm
                onConfirm={handleTransferConfirm}
                onCancel={closeModal}
              />
            )}
            {modalContent === "advance" && (
              <AdvanceMoneyForm
                onConfirm={handleAdvanceConfirm}
                onCancel={closeModal}
              />
            )}
            {modalContent === "pay" && (
              <PayDebtForm onConfirm={handlePayConfirm} onCancel={closeModal} />
            )}
          </div>
        </div>
      )}

      {modalContent === "details" && (
        <div className="cardmodal">
          <div className="cardmodal-body">
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>{" "}
            {/* Close button */}
            <div className="cardmodal-body-content">
              <h3>{cardName} Card Details</h3>
              <p>Card Number: {cardNumber}</p>
              <p>Expires: {formatDateStringForCard(expiryDate)}</p>
              <p>
                {cardName === "Debit" ? "Balance: " : "Current Debt: "}
                {formatBalance(balance)}
              </p>

              {cardName === "Debit" && (
                <button
                  className="save-button"
                  onClick={() => openModal("transfer")}
                >
                  Transfer Money
                </button>
              )}
              {cardName === "Credit" && (
                <button
                  className="save-button"
                  onClick={() => openModal("advance")}
                >
                  Cash Advance
                </button>
              )}
              {cardName === "Credit" && (
                <button
                  className="save-button"
                  onClick={() => openModal("pay")}
                >
                  Pay Debt
                </button>
              )}
              {/* add a button with red color */}
              <button className="delete-button" onClick={handleCancelCard}>
                Cancel Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
