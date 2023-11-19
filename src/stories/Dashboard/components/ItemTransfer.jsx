/* eslint-disable react/prop-types */
import {React} from "react";


export const ItemTransfer = ({ image, type, description, fourDigits, date, amount, card}) => {
  return (
    <div className="transfer">
      {/* <div className="transfer-logo">
        <img src={image} />
      </div> */}
      <dl className="transfer-details">
        <div>
          <dt>{type}</dt>
          <dd>{description}</dd>
        </div>
        <div>
          <dt>•••• {fourDigits}</dt>
          <dd>{card === "Debit" ? "Transfered to" : "From"}</dd>
        </div>
        <div>
          <dt>{formatDateStringForCard(date)}</dt>
          <dd>Date</dd>
        </div>
      </dl>
      <div className="transfer-number">{formatBalance(amount)}</div>
    </div>
  );
};

function formatDateStringForCard(dateStr) {
  // Extract the year and month from the date string
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(5, 7);
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