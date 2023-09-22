import React, { useState } from "react";
import "./login.css"; // Asegúrate de tener un archivo CSS correspondiente
import { Input } from "../input/Input";
import { Button } from "../button/Button";

export const Login = ({ text }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = emailRegex.test(email);
    if (!isValid) {
      setEmailError("Correo electrónico no válido");
    } else {
      setEmailError(""); // Borra el mensaje de error si es válido
    }
    return isValid;
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    const isValid = passwordRegex.test(password);
    if (!isValid) {
      setPasswordError(
        "La contraseña debe contener al menos 8 caracteres, una mayúscula, un número y un carácter especial"
      );
    } else {
      setPasswordError(""); // Borra el mensaje de error si es válido
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailValidValue = isEmailValid(email);
    const isPasswordValidValue = isPasswordValid(password);

    if (isEmailValidValue && isPasswordValidValue) {
      // Lógica para iniciar sesión con el correo y la contraseña
      alert("Inicio de sesión exitoso");
    } else {
      // Muestra mensajes de error apropiados
      if (!isEmailValidValue) {
        setEmailError("Correo electrónico no válido");
        console.log("Correo electrónico no válido");
      }
      if (!isPasswordValidValue) {
        setPasswordError("Contraseña no válida");
        console.log("Contraseña no válida");
      }
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2>{text}</h2>
        <Input
          primary={true}
          type="email"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(""); // Borra el mensaje de error al editar el campo
          }}
        />
        <Input
          primary={true}
          type="password"
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(""); // Borra el mensaje de error al editar el campo
          }}
        />
        <Button
          label="Login"
          primary={true}
          size="medium"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};
