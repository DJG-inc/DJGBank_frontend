// Loans.jsx
import React, { useEffect, useState } from "react";
import { LoanCreationForm } from "./Forms";
import { useDash } from "../../../Context/DashContext";
import Swal from "sweetalert2";
import { ItemLoan } from "./ItemLoan";

export const Loans = ({ userData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loans, setLoans] = useState([]);

  const { createLoan } = useDash();

  useEffect (() => {
    const fetchLoans = async () => {
      const loans = await userData.loans;
      setLoans(loans);
    };
    fetchLoans();
  }, [userData]);


  const handleLoanCreation = async (loanData) => {
    const confirm = await Swal.fire({
      title: "Cancel Card",
      text: `Do you want to cancel this card?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    });
    if (confirm.isConfirmed) {
      try {
        console.log(loanData);
        await createLoan(loanData.amount, loanData.installments);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Loan created successfully",
          showConfirmButton: false,
          timer: 1500,
          didClose: () => window.location.reload(),
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong",
          showConfirmButton: false,
          timer: 1500,
          didClose: () => window.location.reload(),
        });
      }
    }
    
    setIsModalOpen(false);
  };

  return (
    <section className="transfer-section">
      <div className="transfer-section-header">
        <h2>Loans</h2>
        <div className="filter-options"></div>
        <button className="icon-button" onClick={() => setIsModalOpen(true)}>
          <i className="ph-plus"></i>
        </button>
      </div>
      <div className="transfers">
        {/* Just render the loans that have an amount greater than 0 */}
        {loans.map((loan) => (
          loan.amount > 0 ? (
            <ItemLoan
            loanId={loan.id}
            monthlyPayment={loan.monthly_payment}
            amount={loan.amount}
            interestRate={loan.interest_rate}
            startDate={loan.start_date}
            accNumber={userData.savings_account.account_number.slice(-4)}
            key={loan.id}
          />
          ) : null
        ))}

        
      </div>

      {isModalOpen && (
        <div className="cardmodal">
          <div className="cardmodal-content">
            <div className="cardmodal-header">
              <button className="close-button" onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
              <h2>Create Loan</h2>
            </div>
            <LoanCreationForm
              onConfirm={handleLoanCreation}
              onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </section>
  );
};
