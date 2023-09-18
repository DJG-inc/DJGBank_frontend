import React, { useState } from "react";
import "./register.css";
import { Input } from "../input/Input";
import { Button } from "../button/Button";

export const Register = ({ text }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    const isEmailValidValue = isEmailValid(email); // Cambia el nombre de la variable para evitar conflictos de nombres
    const isPasswordValidValue = isPasswordValid(password); // Cambia el nombre de la variable para evitar conflictos de nombres

    if (
      isEmailValidValue &&
      isPasswordValidValue &&
      password === confirmPassword
    ) {
      // Registro exitoso
      alert("Usuario registrado");
      // Lógica para registrar al usuario con email y contraseña
    } else {
      // Muestra mensajes de error apropiados
      if (!isEmailValidValue) {
        setEmailError("Correo electrónico no válido");
        console.log("Correo electrónico no válido");
      }
      if (!isPasswordValidValue) {
        setPasswordError(
          "La contraseña debe contener al menos 8 caracteres, una mayúscula, un número y un carácter especial"
        );
        console.log(
          "La contraseña debe contener al menos 8 caracteres, una mayúscula, un número y un carácter especial"
        );
      }
      if (password !== confirmPassword) {
        setPasswordError("Las contraseñas no coinciden");
        console.log("Las contraseñas no coinciden");
      }
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <h2>{text}</h2>
        <Input
          primary={true}
          type="email"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
            const isValid = isEmailValid(e.target.value);
            // Aquí puedes mostrar un mensaje de error si el correo no es válido
          }}
        />
        <Input
          primary={true}
          type="password"
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
            const isValid = isPasswordValid(e.target.value);
            // Aquí puedes mostrar un mensaje de error si la contraseña no es válida
          }}
        />
        <Input
          primary={true}
          type="password"
          placeholder="Enter your password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            // No necesitas validar la contraseña nuevamente aquí
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


