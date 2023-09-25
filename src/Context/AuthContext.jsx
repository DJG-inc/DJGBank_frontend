import React, { createContext, useContext, useState, useEffect } from "react";
import DOMPurify from "dompurify";
import axios from "axios";

// Creamos el contexto de autenticación
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);

  const register = async (email, password) => {
    try {
      const sanitizedEmail = DOMPurify.sanitize(email);
      const sanitizedPassword = DOMPurify.sanitize(password);

      const response = await axios.post("http://localhost:3000/api/user/register", {
        email: sanitizedEmail,
        password: sanitizedPassword,
      });

      if (response.status === 201) {
        // Registro exitoso, puedes realizar acciones adicionales si es necesario
        alert("Usuario registrado");
        // Actualiza el estado de usuario si lo deseas
        setUser(response.data);
      } else {
        alert("Error al registrar el usuario: " + response.data.message);
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  const confirmEmail = async (token) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/user/confirm-email/${token}`);
      
      if (response.status === 200) {
        // Confirmación de correo electrónico exitosa
        setIsEmailConfirmed(true);
        // Actualiza el estado de usuario si lo deseas
        setUser(response.data);
        console.log(response.data);
      } else {
        alert("Error al confirmar el correo electrónico: " + response.data.message);
      }
    } catch (error) {
      console.error("Error al confirmar el correo electrónico:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        confirmEmail,
        isEmailConfirmed,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
