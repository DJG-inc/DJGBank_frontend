import React, { createContext, useContext, useState, useEffect } from "react";
import DOMPurify from "dompurify";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// Creamos el contexto de autenticación
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
 
  const register = async (id, email, password) => {
    try {

      const sanitizedId = DOMPurify.sanitize(id);
      const sanitizedEmail = DOMPurify.sanitize(email);
      const sanitizedPassword = DOMPurify.sanitize(password);

      const response = await axios.post("http://localhost:3000/api/user/register", {
        user_id: sanitizedId,
        email: sanitizedEmail,
        password: sanitizedPassword,
      });

      setUser(response.data);
      alert("Usuario registrado con éxito");
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  const confirmEmail = async (token) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/user/confirm-email/${token}`);
      setUser(response.data);
      alert("Correo electrónico confirmado con éxito");
      navigate(`/login`);
    } catch (error) {
      console.error("Error al confirmar el correo electrónico:", error);
    }
  };

  const login = async (userid, password) => {
    try {
      const sanitizedUserid = DOMPurify.sanitize(userid);
      const sanitizedPassword = DOMPurify.sanitize(password);

      const response = await axios.post("http://localhost:3000/api/user/login", {
        user_id: sanitizedUserid,
        password: sanitizedPassword,
      });
      
      if (response.data.status === "Pending") {
        alert("Usuario pendiente de confirmación");
        window.location.reload();
        return;
      } else if (response.data.status === "Confirmed") {
        alert("Usuario pendiente de completar registro");
        navigate(`/complete-register/${response.data.id}`);
        return;
      } else if (response.data.status === "Active") {
        navigate(`/`);
      }

      setUser(response.data);
      alert("Usuario logueado con éxito");
    } catch (error) {
      alert("Usuario o contraseña incorrectos");
      console.error("Error al loguear el usuario:", error);
    }
  };

  const completeRegister = async ( first_name, last_name, date_of_birth, address, phone_number ) => {
    try {

      //agarrar el id del parametro
      const id = window.location.pathname.split("/")[2];

      const sanitizedFirst_name = DOMPurify.sanitize(first_name);
      const sanitizedLast_name = DOMPurify.sanitize(last_name);
      const sanitizedDate_of_birth = DOMPurify.sanitize(date_of_birth);
      const sanitizedAddress = DOMPurify.sanitize(address);
      const sanitizedPhone_number = DOMPurify.sanitize(phone_number);

      //transformar la fecha 2001-05-30 a 30/05/2001
      const date = new Date(sanitizedDate_of_birth);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const newDate = day + "/" + month + "/" + year;
      const sanitizedDate_of_birth2 = DOMPurify.sanitize(newDate);

      const response = await axios.post(`http://localhost:3000/api/user/complete-register/${id}`, {
        first_name: sanitizedFirst_name,
        last_name: sanitizedLast_name,
        date_of_birth: sanitizedDate_of_birth2,
        address: sanitizedAddress,
        phone_number: sanitizedPhone_number,
      });

      setUser(response.data);
      console.log(response.data);
      alert("Usuario registrado");
      //recargar la pagina
      window.location.reload();
      // Redirige o realiza cualquier otra acción necesaria
    } catch (error) { 
      console.error("Error al registrar el usuario:", error);
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        register,
        confirmEmail,
        login,
        completeRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
