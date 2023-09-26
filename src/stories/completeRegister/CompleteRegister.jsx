import React, { useState } from "react";
import "./completeRegister.css";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import { useAuth } from "../../Context/AuthContext";

export const CompleteRegister = ({ text }) => {
  const [date_of_birth, setDate_of_birth] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [address, setAddress] = useState("");
  const { completeRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //verificar que los campos no esten vacios
    if (first_name === "" || last_name === "" || date_of_birth === "" || address === "" || phone_number === "") {
      alert("Todos los campos son obligatorios");
      return;
    }

    //verificar que el telefono sea numerico
    if (isNaN(phone_number)) {
      alert("El telefono debe ser numerico");
      return;
    }

    //verificar que el telefono tenga 10 digitos  
    if (phone_number.length !== 10) {
      alert("El telefono debe tener 10 digitos");
      return;
    } 

    //verificar que la fecha de nacimiento sea menor a la fecha actual
    const date = new Date(date_of_birth);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const newDate = day + "/" + month + "/" + year;
    const date_of_birth2 = new Date(newDate);
    const today = new Date();
    if (date_of_birth2 > today) {
      alert("La fecha de nacimiento debe ser menor a la fecha actual");
      return;
    }

    //verificar que la fecha de nacimiento sea mayor a 18 años
    const birthDate = new Date(date_of_birth);
    const today2 = new Date();
    const diff = today2 - birthDate;
    const age = Math.floor(diff / 31557600000);
    if (age < 18) {
      alert("Debes ser mayor de edad para registrarte");
      return;
    }

    //verificar que el nombre y apellido no contengan numeros
    const regex = /[0-9]/;
    if (regex.test(first_name) || regex.test(last_name)) {
      alert("El nombre y apellido no deben contener numeros");
      return;
    }

    //verificar que el nombre y apellido no contengan caracteres especiales
    const regex2 = /[!@#$%^&*(),.?":{}|<>]/g;
    if (regex2.test(first_name) || regex2.test(last_name)) {
      alert("El nombre y apellido no deben contener caracteres especiales");
      return;
    }

    //verificar que la direccion no contenga caracteres especiales
    const regex3 = /[!@$%^&*(),.?":{}|<>]/g;
    if (regex3.test(address)) {
      alert("La direccion no debe contener caracteres especiales");
      return;
    }

    await completeRegister(first_name, last_name, date_of_birth, address, phone_number);
  };
  

  return (
    <div className="complete-register">
      <div className="complete-register-container">
        <h2>{text}</h2>
        <div className="input-group">
          <Input
            primary={true}
            type="text"
            placeholder="Enter your first name"
            onChange={(e) => {
              setFirst_name(e.target.value);
            }}
          />
          <Input
            primary={true}
            type="text"
            placeholder="Enter your last name"
            onChange={(e) => {
              setLast_name(e.target.value);
            }}
          />
          <Input
            primary={true}
            type="date"
            placeholder="Enter your date of birth"
            onChange={(e) => {
              setDate_of_birth(e.target.value);
            }}
          />
          <Input
            primary={true}
            type="text"
            placeholder="Enter your address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <Input
            primary={true}
            type="text"
            placeholder="Enter your phone number"
            onChange={(e) => {
              setPhone_number(e.target.value);
            }}
          />
        </div>
        <Button
          label="Complete Register"
          primary={true}
          size="medium"
          onClick={handleSubmit}
          style={{ margin: "20px auto", display: "block" }}
        />
      </div>
    </div>
  );
};