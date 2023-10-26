import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const DashContext = createContext();

export const useDash = () => useContext(DashContext);

export const DashProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

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
      }
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const getUserIdFromToken = () => {
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) {
        return null;
      }
      const decodedToken = jwt_decode(token);
      console.log("El token es: ", decodedToken);
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
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) {
        return false;
      }
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);
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
