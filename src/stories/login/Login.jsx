import React, { useState } from "react";
import "./login.css"; // Asegúrate de tener un archivo CSS correspondiente
import { Input } from "../input/Input";
import { Button } from "../button/Button";

export const Login = ({ text }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isIdValid = (id) => {
    // Use this rregex "^[1-9][0-9]{7,9}$" to validate the id
    const idRegex = /^[1-9][0-9]{7,9}$/;
    const isValid = idRegex.test(id);
    if (!isValid) {
      setIdError("El id debe contener entre 8 y 10 dígitos");
    } else {
      setIdError(""); // Borra el mensaje de error si es válido
    }
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

    // const isIdValidValue = isIdValid(id);
    const isIdValidValue = true;
    // const isPasswordValidValue = isPasswordValid(password);
    const isPasswordValidValue = true;

    if (isIdValidValue && isPasswordValidValue) {
      // Lógica para iniciar sesión con el correo y la contraseña
      alert("Inicio de sesión exitoso");
    } else {
      // Muestra mensajes de error apropiados
      if (!isIdValidValue) {
        setIdError("Id no válido");
        console.log("Id no válido");
      }
      if (!isPasswordValidValue) {
        setPasswordError("Contraseña no válida");
        console.log("Contraseña no válida");
      }
    }
    alert("Inicio de sesión exitoso");
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2>{text}</h2>
        <Input
          primary={true}
          type="username"
          placeholder="Enter your id"
          onChange={(e) => {
            setId(e.target.value);
            setIdError(""); // Borra el mensaje de error al editar el campo
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
