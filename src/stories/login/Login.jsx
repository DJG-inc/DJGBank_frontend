import React, { useState } from "react";
import PropTypes from 'prop-types';
import "./login.css"; // Asegúrate de tener un archivo CSS correspondiente
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import { useAuth } from "../../Context/AuthContext";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const Login = ({ text }) => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userid === "" || password === "") {
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        customClass: {
          title: 'swal-title',
          icon: 'swal-icon',
          confirmButton: 'swal-button'
        }
      }).fire({
        icon: 'error',
        title: 'Please fill all the fields'
      })
      return;
    }
    await login(userid, password);
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2>{text}</h2>
        <Input
          primary={true}
          type="text"
          placeholder="Enter your id"
          onChange={(e) => {
            setUserid(e.target.value);
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
        <div className="forgot-password">
          <p>Forgot your password? <Link to="/forgot-password">Click here</Link></p>
        </div>
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

Login.propTypes = {
  text: PropTypes.string.isRequired,
};