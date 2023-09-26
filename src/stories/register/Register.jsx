// Register.js
import React, { useState } from "react";
import "./register.css";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import { useAuth } from "../../Context/AuthContext"; // Importa el hook useAuth

export const Register = ({ text }) => {
  const { register } = useAuth();

  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [idError, setIdError] = useState("");

  const isIdValid = (id) => {
    // Use this rregex "^[1-9][0-9]{7,9}$" to validate the id 
    const idRegex = /^[1-9][0-9]{7,9}$/;
    const isValid = idRegex.test(id);
    if (!isValid) {
      setIdError("El id debe contener entre 8 y 10 dígitos");
    } else {
      setIdError("");
    }
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Za-z0-9+_.-]+@(.+)$/;
    const isValid = emailRegex.test(email);
    if (!isValid) {
      setEmailError("Correo electrónico no válido");
    } else {
      setEmailError("");
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
      setPasswordError("");
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const isEmailValidValue = isEmailValid(email);
    const isEmailValidValue = true;
    // const isPasswordValidValue = isPasswordValid(password);
    const isPasswordValidValue = true;
    // const isIdValidValue = isIdValid(id);
    const isIdValidValue = true;

    if (
      isEmailValidValue &&
      isPasswordValidValue &&
      isIdValidValue &&
      password === confirmPassword
    ) {
      // Llama a la función de registro desde el contexto
      await register(id, email, password);
    } else {
      // Muestra mensajes de error apropiados
      if (!isIdValidValue) {
        setIdError("El id debe contener entre 8 y 10 dígitos");
        console.log(idError);
      }
      if (!isEmailValidValue) {
        setEmailError("Correo electrónico no válido");
        console.log(emailError);
      }
      if (!isPasswordValidValue) {
        setPasswordError("Contraseña no válida");
        console.log(passwordError);
      }
      if (password !== confirmPassword) {
        setPasswordError("Las contraseñas no coinciden");
        console.log(passwordError);
      }
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <h2>{text}</h2>
        <Input
          primary={true}
          type="text"
          placeholder="Enter your id"
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <Input
          primary={true}
          type="email"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          primary={true}
          type="password"
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Input
          primary={true}
          type="password"
          placeholder="Confirm your password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <Button
          label="Register"
          primary={true}
          size="medium"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};
