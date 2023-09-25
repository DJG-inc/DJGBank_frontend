import React, { useState } from "react";
import PropTypes from "prop-types";
import "./input.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

export const Input = ({ primary, type, placeholder, ...props }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={`storybook-input ${type} ${primary ? "primary" : ""}`}>
      <input
        {...props}
        placeholder={placeholder}
        type={passwordVisible ? "text" : type}
      />
      {type === "password" && (
        <button
          className="password-toggle"
          onClick={togglePasswordVisibility}
        >
          {passwordVisible ? <FaEyeSlash className="password-icon" style={{ color: '#B6E72B' }} /> : <FaEye className="password-icon" style={{ color: '#B6E72B' }} />}
        </button>
      )}
    </div>
  );
};

Input.propTypes = {
  primary: PropTypes.bool,
  type: PropTypes.oneOf([
    "text",
    "password",
    "number",
    "email",
    "date",
  ]),
  placeholder: PropTypes.string,
};
