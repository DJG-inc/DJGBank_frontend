import React, { useState } from "react";
import "./completeRegister.css";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import axios from "axios"; // Importa Axios

export const CompleteRegister = ({ text }) => {
  const [email, setEmail] = useState("");
  const [user_id, setUser_id] = useState("");
  const [date_of_birth, setDate_of_birth] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [address, setAddress] = useState("");

  // errores de cada atributo

  const [emailError, setEmailError] = useState("");
  const [user_idError, setUser_idError] = useState("");
  const [date_of_birthError, setDate_of_birthError] = useState("");
  const [first_nameError, setFirst_nameError] = useState("");
  const [last_nameError, setLast_nameError] = useState("");
  const [phone_numberError, setPhone_numberError] = useState("");

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = emailRegex.test(email);
    if (!isValid) {
      setEmailError("Correo electrónico no válido");
    } else {
      setEmailError("");
    }
    return isValid;
  };

  const isUserIdValid = (user_id) => {
    const userIdRegex = /^[0-9]+$/;
    if (!userIdRegex.test(user_id)) {
      setUser_idError("El user_id debe contener solo números.");
      return false;
    } else if (user_id.length < 8) {
      setUser_idError("El user_id debe tener al menos 8 dígitos.");
      return false;
    } else {
      setUser_idError("");
      return true;
    }
  };

  const isDateOfBirthValid = (date_of_birth) => {
    const currentDate = new Date();
    const birthDate = new Date(date_of_birth);
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    if (age > 120) {
      setDate_of_birthError(
        "La fecha de nacimiento no puede indicar una edad mayor a 120 años."
      );
      return false;
    } else {
      setDate_of_birthError("");
      return true;
    }
  };

  const isFirst_nameValid = (first_name) => {
    const containsNumbers = /\d/.test(first_name);
    if (containsNumbers) {
      setFirst_nameError("El nombre no debe contener números.");
      return false;
    } else {
      setFirst_nameError("");
      return true;
    }
  };

  const isLast_nameValid = (last_name) => {
    const containsNumbers = /\d/.test(last_name);
    if (containsNumbers) {
      setLast_nameError("El apellido no debe contener números.");
      return false;
    } else {
      setLast_nameError("");
      return true;
    }
  };

  const isPhone_numberValid = (phone_number) => {
    const phoneNumberRegex = /^[0-9]+$/;
    if (!phoneNumberRegex.test(phone_number)) {
      setPhone_numberError("El número de teléfono debe contener solo números.");
      return false;
    } else if (phone_number.length !== 10) {
      setPhone_numberError("El número de teléfono debe tener 10 dígitos.");
      return false;
    } else {
      setPhone_numberError("");
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validar todos los campos
    const isEmailValidValue = isEmailValid(email);
    const isUserIdValidValue = isUserIdValid(user_id);
    const isDateOfBirthValidValue = isDateOfBirthValid(date_of_birth);
    const isFirst_nameValidValue = isFirst_nameValid(first_name);
    const isLast_nameValidValue = isLast_nameValid(last_name);
    const isPhone_numberValidValue = isPhone_numberValid(phone_number);
  
    // Verificar si todos los campos son válidos
    if (
      isEmailValidValue &&
      isUserIdValidValue &&
      isDateOfBirthValidValue &&
      isFirst_nameValidValue &&
      isLast_nameValidValue &&
      isPhone_numberValidValue
    ) {
      try {
        // Realizar la solicitud de registro al servidor
        const response = await axios.post("*", {
          // Agrega la URL de tu API
          email: email,
          user_id: user_id,
          date_of_birth: date_of_birth,
          first_name: first_name,
          last_name: last_name,
          phone_number: phone_number,
          address: address,
        });
  
        if (response.status === 201) {
          // Registro exitoso
          alert("Usuario registrado");
          // Redirige o realiza cualquier otra acción necesaria
        } else {
          // Manejar errores del servidor si es necesario
          console.error(response.data);
        }
      } catch (error) { 
        console.error("Error al registrar el usuario:", error);
      }
    } else {
      // Muestra mensajes de error apropiados
      alert("Por favor, corrige los errores antes de registrar.");
    }
  };
  

  return (
    <div className="complete-register">
      <div className="complete-register-container">
        <h2>{text}</h2>
        <Input
          primary={true}
          type="email"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
            const isValid = isEmailValid(e.target.value);
          }}
        />
        <Input
          primary={true}
          type="text"
          placeholder="Enter your user_id"
          onChange={(e) => {
            setUser_id(e.target.value);
            const isValid = isUserIdValid(e.target.value);
          }}
        />

        <Input
          primary={true}
          type="date"
          placeholder="Enter your date of birth"
          onChange={(e) => {
            setDate_of_birth(e.target.value);
            const isValid = isDateOfBirthValid(e.target.value);
          }}
        />

        <Input
          primary={true}
          type="text"
          placeholder="Enter your first name"
          onChange={(e) => {
            setFirst_name(e.target.value);
            const isValid = isFirst_nameValid(e.target.value);
          }}
        />

        <Input
          primary={true}
          type="text"
          placeholder="Enter your last name"
          onChange={(e) => {
            setLast_name(e.target.value);
            const isValid = isLast_nameValid(e.target.value);
          }}
        />

        <Input
          primary={true}
          type="text"
          placeholder="Enter your phone number"
          onChange={(e) => {
            setPhone_number(e.target.value);
            const isValid = isPhone_numberValid(e.target.value);
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

        <Button
          label="Complete Register"
          primary={true}
          size="medium"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};
