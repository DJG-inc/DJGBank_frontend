import React from "react";
import "./forgotpass.css";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import { useAuth } from "../../Context/AuthContext";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useState } from "react";

export const Forgotpass = ({ text }) => {
  const [email, setEmail] = useState("");
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar:true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        icon:'error',
        title: 'Please enter your email',
      }).fire()
      return;
    }

    const regEx = /\S+@\S+\.\S+/;
    const validEmail = regEx.test(email);
    if (!validEmail) {
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar:true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        icon:'error',
        title: 'Please enter a valid email',
      }).fire()
      return;
    }

    await forgotPassword(email);
  };

  return (
    <div className="forgot">
      <div className="forgot-container">
        <h3>{text}</h3>
        <Input
          primary={true}
          type="email"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button
          label="Reset Password"
          primary={true}
          size="medium"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};
