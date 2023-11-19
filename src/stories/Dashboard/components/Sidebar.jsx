import { React, useState, useEffect } from "react";
import { Buttons } from "./Buttons";
import { PaymentCard } from "./PaymentCard";
import { useDash } from "../../../Context/DashContext";
import axios from "axios";
import Swal from "sweetalert2";

export const Sidebar = ({ userData }) => {
  const { createSavingsAccount, createDebitCard, createCreditCard } = useDash();
  const [account, setAccount] = useState(userData.savings_account);
  const [savingsAccBalance, setSavingsAccBalance] = useState(0);
  const [cardType, setCardType] = useState("credit");
  const [cardBrand, setCardBrand] = useState("Visa");
  const [cards, setCards] = useState([]);

  console.log(userData);

  // Account has debit cards and cards has credit cards

  const [toggleNewCard, setToggleNewCard] = useState(false);

  const handleCreateSavingAccount = async () => {
    const response = await createSavingsAccount();
    if (response) {
      setAccount(response);
    } else {
      console.log("Error while creating savings account");
    }
  };

  const handleCreateCard = async () => {
    let response;
    if (cardType === "debit") {
      response = await createDebitCard(cardBrand);
    } else if (cardType === "credit") {
      response = await createCreditCard(cardBrand);
    }

    if (response) {
      setCards([...cards, response]);
      Swal.fire({
        title: "Success!",
        text: `Your ${cardType} card has been successfully created.`,
        icon: "success",
        timer: 1500,
        didClose: () => window.location.reload(),
      });
    } else {
      console.log("Error while creating card");
    }

    setToggleNewCard(!toggleNewCard);
  };

  // Create a useeffect that is triggered everytime userData changes, the main purpose is to create a handle for each card creation and savingsaccount creation
  useEffect(() => {
    setAccount(userData.savings_account);
    setCards(userData.credit_cards);
    if (userData.savings_account !== null) {
      setSavingsAccBalance(userData.savings_account.balance);
    }
  }, [userData]);

  return (
    <div className="app-body-sidebar">
      <section className="payment-section">
        <h2>Your Cards</h2>
        <div className="payment-section-header">
          <p>Debit and Credit</p>
          <div></div>
        </div>
        <div className="payments">
          {/* For loop that iterates and creates cards for each debit card in account */}
          {account !== null &&
            account.debit_cards.map((card) => (
              <PaymentCard
                color={card.card_type === "Visa" ? "blue" : "red"}
                cardType={card.card_type}
                cardNumber={card.card_number}
                expiryDate={card.expiry_date}
                balance={savingsAccBalance}
                cardName="Debit"
                key={card.id}
              />
            ))}

          {cards !== null &&
            cards.map((card) => (
              <PaymentCard
                // If card type is visa color is set blue, if not color is set red
                color={card.card_type === "Visa" ? "blue" : "red"}
                cardType={card.card_type}
                cardNumber={card.card_number}
                expiryDate={card.expiry_date}
                balance={card.current_debt}
                cardName="Credit"
                key={card.id}
              />
            ))}
          {/* If the user has no cards show a message */}

          {/* plus button to create new cards and triggers toggle */}
          <button
            className="plus-button"
            onClick={() => setToggleNewCard(!toggleNewCard)}
          >
            <i className="ph-plus"></i>
          </button>
          {/* Create a cardmodal in the center of the screen */}
          {toggleNewCard && (
            <div className="cardmodal">
              <div className="cardmodal-content">
                <div className="cardmodal-header">
                  <button onClick={() => setToggleNewCard(!toggleNewCard)}>
                    <i className="ph-x"></i>
                  </button>
                  <h2>Add a new card</h2>
                </div>
                <div className="cardmodal-body">
                  <div className="cardmodal-body-content">
                    {/* if no savings account ask the user if wants to create a new one */}
                    {account === null && (
                      <div className="cardmodal-body-content-account">
                        <h3>You don't have a savings account yet</h3>
                        <p>
                          You need a savings account to create a new card, do
                          you want to create one?
                        </p>
                        <button
                          className="save-button"
                          onClick={handleCreateSavingAccount}
                        >
                          Create
                        </button>
                      </div>
                    )}
                    {/* if the user has a savings account show the form to create a new card */}
                    {account !== null &&
                      (console.log("account", account),
                      (
                        <div className="cardmodal-body-content">
                          <div className="cardmodal-body-content-form">
                            <div className="cardmodal-body-content-form-input">
                              <label>Card type</label>
                              <select
                                onChange={(e) => setCardType(e.target.value)}
                                value={cardType}
                              >
                                <option value="credit">Credit</option>
                                <option value="debit">Debit</option>
                              </select>
                              <label>Card brand</label>
                              {/* The two buttons we have for visa and mastercard */}
                              <div className="cardmodal-body-content-form-input-brand">
                                <button
                                  className="card-button mastercard"
                                  onClick={() => setCardBrand("Mastercard")}
                                >
                                  <svg
                                    width="2001"
                                    height="1237"
                                    viewBox="0 0 2001 1237"
                                    fill="none"
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
                                </button>

                                <button
                                  className="card-button visa active"
                                  onClick={() => setCardBrand("Visa")}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="2500"
                                    height="2500"
                                    viewBox="0 0 141.732 141.732"
                                  >
                                    <g fill="currentColor">
                                      <path d="M62.935 89.571h-9.733l6.083-37.384h9.734zM45.014 52.187L35.735 77.9l-1.098-5.537.001.002-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s4.691.976 10.181 4.273l8.456 32.479h10.141l15.485-37.385H45.014zM121.569 89.571h8.937l-7.792-37.385h-7.824c-3.613 0-4.493 2.786-4.493 2.786L95.881 89.571h10.146l2.029-5.553h12.373l1.14 5.553zm-10.71-13.224l5.114-13.99 2.877 13.99h-7.991zM96.642 61.177l1.389-8.028s-4.286-1.63-8.754-1.63c-4.83 0-16.3 2.111-16.3 12.376 0 9.658 13.462 9.778 13.462 14.851s-12.075 4.164-16.06.965l-1.447 8.394s4.346 2.111 10.986 2.111c6.642 0 16.662-3.439 16.662-12.799 0-9.72-13.583-10.625-13.583-14.851.001-4.227 9.48-3.684 13.645-1.389z" />
                                    </g>
                                    <path
                                      d="M34.638 72.364l-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s7.373 1.528 14.445 7.253c6.762 5.472 8.967 12.292 8.967 12.292z"
                                      fill="currentColor"
                                    />
                                    <path
                                      fill="none"
                                      d="M0 0h141.732v141.732H0z"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="cardmodal-footer">
                            <button
                              className="save-button"
                              onClick={handleCreateCard}
                            >
                              Create Card
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="faq">
          <p>Most frequently asked questions</p>
          <div>
            <label>Question</label>
            <input type="text" placeholder="Type here" />
          </div>
        </div>
        <div className="payment-section-footer">
          <button className="save-button">Save</button>
          <button className="settings-button">
            <i className="ph-gear"></i>
            <span>More settings</span>
          </button>
        </div>
      </section>
    </div>
  );
};
