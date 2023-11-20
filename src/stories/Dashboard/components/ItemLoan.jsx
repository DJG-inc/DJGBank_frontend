/* eslint-disable react/prop-types */
import { React } from "react";
import { useDash } from "../../../Context/DashContext";
import Swal from "sweetalert2";

export const ItemLoan = ({
  loanId,
  interestRate,
  monthlyPayment,
  amount,
  startDate,
  accNumber,
}) => {
  const { payLoan } = useDash();

  const handlePayLoan = async () => {
    const confirm = await Swal.fire({
      title: "Pay Loan",
      text: `Do you want to pay the month payment of this loan?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    });
    if (confirm.isConfirmed) {
      try {
        await payLoan(loanId);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Loan paid successfully",
          showConfirmButton: false,
          timer: 3000,
          didClose: () => window.location.reload(),
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong",
          showConfirmButton: false,
          timer: 3000,
          didClose: () => window.location.reload(),
        });
      }
    }
  };

  return (
    <div className="transfer">
      <dl className="transfer-details">
        <div>
          <dt>Current Debt</dt>
          <dd>{formatBalance(amount)}</dd>
        </div>
        <div>
          <dt>•••• {accNumber}</dt>
          <dd>Loaned to</dd>
        </div>
        <div>
          <dt>{formatDateStringForCard(startDate)}</dt>
          <dd>Start Date</dd>
        </div>
        <div>
          <dt>Interest Rate</dt>
          <dd>{interestRate}%</dd>
        </div>
      </dl>
      <div className="transfer-number">
        <button onClick={handlePayLoan} className="save-button" id="pay-loan-button">
          Pay {formatBalance(monthlyPayment)}
        </button>
      </div>
    </div>
  );
};

function formatDateStringForCard(dateStr) {
  // Extract the year and month from the date string dateStr comes like Sun Nov 19 17:38:43 COT 2023
  const year = dateStr.slice(-4);
  const month = dateStr.substring(4, 7);
  const day = dateStr.substring(8, 10);

  // Return the formatted date string in MM/YY format
  return `${day}/${month}/${year}`;
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
