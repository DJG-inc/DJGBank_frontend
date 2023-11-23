import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Button } from "../button/Button";
import "./Verification.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { getIPData } from "../../assets/ipadress"
import { useNavigate } from "react-router-dom";

export const Verification = ({ text }) => {
  const [ipInfo, setIpInfo] = useState({});
  useEffect(() => {
    const fetchIpInfo = async () => {
      const ipInfo = await getIPData();
      setIpInfo(ipInfo);
    };
    fetchIpInfo();
  }, []);

  const [inputValues, setInputValues] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  const handleInputChange = (index, value) => {
    // Limita la entrada a un solo dígito
    value = value.slice(0, 1);

    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();

    //agarrar el user id del params
    const id = window.location.pathname.split("/")[2];

    const code = inputValues.join("");
    if (code === "") {
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
        title: 'Please enter the code',
      }).fire()
      return;
    }

    try {

      const response = await axios.post(
        `http://localhost:8080/api/ipadress/verifyCode/${id}/${code.toUpperCase()}`,
        { 
          newIp: ipInfo.ip,
        }
      );
      if (response.status === 200) {
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
          icon:'success',
          title: 'Verification successful',
        }).fire()
        navigate("/login");
      }
    } catch (error) {
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
        title: 'Verification failed',
      }).fire()
    }
    
  };

  return (
    <div className="container">
      <h2>{text}</h2>
      {inputValues.map((value, index) => (
        <input
          className="input-verification"
          key={index}
          type="text" // Cambia el tipo a "text" para permitir un solo dígito
          value={value}
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
      ))}
      <Button
        label="Verificar"
        primary={true}
        size="medium"
        onClick={handleSubmit}
      />
    </div>
  );
};

Verification.propTypes = {
  text: PropTypes.string.isRequired,
};