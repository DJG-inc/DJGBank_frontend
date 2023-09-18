import React, { useState } from "react";
import PropTypes from "prop-types";
import "./input.css";
import showPasswordIcon from "../assets/visible.png";
import hidePasswordIcon from "../assets/hide.png";

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
          <img
            src={passwordVisible ? showPasswordIcon : hidePasswordIcon}
            alt="Toggle Password Visibility"
            className="password-icon"
          />
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
