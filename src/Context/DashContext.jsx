import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useNavigate } from "react-router-dom";

const DashContext = createContext();

export const useDash = () => useContext(DashContext);

export const DashProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUser();
      setUserData(user);
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const isTokenExpired = verifyExpiredToken();
      if (isTokenExpired) {
        const id = getUserIdFromToken();
        if (id) {
          const user = await getUser(id);
          setUserData(user);
        }
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your session has expired, please login again",
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          navigate("/login");
        });
        sessionStorage.removeItem("accessToken");
      }
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const getUserIdFromToken = () => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      return null;
    }
    try {
      const decodedToken = jwt_decode(token);
      if (!decodedToken) {
        return null;
      }
      return decodedToken.sub;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const verifyExpiredToken = () => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      return false;
    }
    try {
      const decodedToken = jwt_decode(token);
      if (!decodedToken) {
        return false;
      }
      const dateNow = Date.now() / 1000;
      if (decodedToken.exp < dateNow) {
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const getUser = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");
      console.log(token);
      const id = getUserIdFromToken();
      const res = await axios.get(`https://djgbank-backend-blue-meadow-1492.fly.dev/api/user/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const createSavingsAccount = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const id = getUserIdFromToken();
      const res = await axios.post(
        `https://djgbank-backend-blue-meadow-1492.fly.dev/api/saving-accounts/create/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const createDebitCard = async (card_type) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const id = getUserIdFromToken();
      const res = await axios.post(
        `https://djgbank-backend-blue-meadow-1492.fly.dev/api/debitcard/create/${id}`,
        {
          cardType: card_type,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const createCreditCard = async (card_type) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const id = getUserIdFromToken();
      const res = await axios.post(
        `https://djgbank-backend-blue-meadow-1492.fly.dev/api/creditcard/create/${id}`,
        {
          cardType: card_type,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
      
    }
  };

  const createTransaction = async (
    user_id,
    acc_number,
    amount,
    description
  ) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const id = getUserIdFromToken();
      const res = await axios.post(
        `https://djgbank-backend-blue-meadow-1492.fly.dev/api/transactions/create/${id}`,
        {
          user_id: user_id,
          number_of_savings_account: acc_number,
          amount: amount,
          description: description,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const createCreditCardActivity = async (amount, type, cardId) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const res = await axios.post(
        `https://djgbank-backend-blue-meadow-1492.fly.dev/api/creditcardactivity/create/${cardId}`,
        {
          amount: amount,
          type: type,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const cancelDebitCard = async (card_id) => {
    console.log(card_id);
    try {
      const token = sessionStorage.getItem("accessToken");
      const res = await axios.delete(
        `https://djgbank-backend-blue-meadow-1492.fly.dev/api/debitcard/delete/${card_id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const cancelCreditCard = async (card_id) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const res = await axios.delete(
        `https://djgbank-backend-blue-meadow-1492.fly.dev/api/creditcard/delete/${card_id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const createLoan = async (amount, installments) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const id = getUserIdFromToken();

      const monthlyPayment = (amount / installments)


      const res = await axios.post(
        `https://djgbank-backend-blue-meadow-1492.fly.dev/api/loan/create/${id}`,
        {
          amount: amount,
          monthly_payment: monthlyPayment,
          interest_rate: 0,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  const payLoan = async (loanId) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const id = getUserIdFromToken();
      const res = await axios.post(
        `https://djgbank-backend-blue-meadow-1492.fly.dev/api/loan/pay/${id}`,

          loanId
        ,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <DashContext.Provider
      value={{
        userData,
        createSavingsAccount,
        createDebitCard,
        createCreditCard,
        createTransaction,
        createCreditCardActivity,
        cancelDebitCard,
        cancelCreditCard,
        createLoan,
        payLoan
      }}
    >
      {children}
    </DashContext.Provider>
  );
};