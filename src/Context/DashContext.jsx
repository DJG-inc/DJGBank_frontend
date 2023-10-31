import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2/dist/sweetalert2.js'
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
          icon: 'error',
          title: 'Oops...',
          text: 'Your session has expired, please login again',
          showConfirmButton: false,
          timer: 3000
        }).then(() => {
          navigate("/login");
        })
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
      const id = getUserIdFromToken();
      const res = await axios.get(`http://localhost:3000/api/user/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashContext.Provider
      value={{
        userData,
      }}
    >
      {children}
    </DashContext.Provider>
  );
};
