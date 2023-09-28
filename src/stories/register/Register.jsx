// Register.js
import React, { useState } from "react";
import "./register.css";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import { useAuth } from "../../Context/AuthContext"; // Importa el hook useAuth
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const Register = ({ text }) => {
  const { register } = useAuth(); // Usa el hook useAuth
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //verificar que los campos no esten vacios
    if (id === "" || email === "" || password === "" || confirmPassword === "") {
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      })
        .fire({
          icon: "error",
          title: "Todos los campos son obligatorios",
        })
      return;
    }

    //verificar que el id sea numerico
    if (isNaN(id)) {
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      })
        .fire({
          icon: "error",
          title: "El id debe ser numerico",
        })
      return;
    }

    //verificar que el id tenga 10 digitos
    if (id.length !== 10) {
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      })
        .fire({
          icon: "error",
          title: "El id debe tener 10 digitos",
        })
      return;
    }

    //verificar que el email sea valido
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      })
        .fire({
          icon: "error",
          title: "El email debe ser valido",
        })
      return;
    }

    //verificar que el password tenga al menos 8 caracteres
    if (password.length < 8) {
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      })
        .fire({
          icon: "error",
          title: "El password debe tener al menos 8 caracteres",
        })
      return;
    }

    //verificar que el password tenga al menos una letra mayuscula
    const regex2 = /[A-Z]/;
    if (!regex2.test(password)) {
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      })
        .fire({
          icon: "error",
          title: "El password debe tener al menos una letra mayuscula",
        })
      return;
    }

    //verificar que el password tenga al menos una letra minuscula
    const regex3 = /[a-z]/;
    if (!regex3.test(password)) {
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      })
        .fire({
          icon: "error",
          title: "El password debe tener al menos una letra minuscula",
        })
      return;
    }

    //verificar que el password tenga al menos un numero
    const regex4 = /[0-9]/;
    if (!regex4.test(password)) {
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
      })
        .fire({
          icon: 'error',
          title: 'El password debe tener al menos un numero',
        })
      return;
    }

    //verificar que el password y la confirmacion sean iguales
    if (password !== confirmPassword) {
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
      })
        .fire({
          icon: 'error',
          title: 'El password y la confirmacion deben ser iguales',
        })
      return;
    }

    await register(id, email, password);
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
