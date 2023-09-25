import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { Button } from "../button/Button";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./header.css";  

export const Header = ({ textButton, route, ...props }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("EN"); // Estado para el idioma seleccionado

  const navigate = useNavigate();

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    // Aquí puedes agregar lógica para cambiar el idioma en tu aplicación si es necesario
  };

  return (
    <header>
      <div className={`storybook-header ${props.primary ? "primary" : ""}`}>
        {/* Menú desplegable para seleccionar el idioma */}
        <div className="language-menu">
          <select
            value={selectedLanguage}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            <option value="EN">EN</option>
            <option value="ES">ES</option>
          </select>
        </div>

        <div className="header-logo">
          <img src={logo} alt="Logo" />
        </div>
 
        <div className="header-login">
          <Button label={textButton} primary={true} size={"medium"} onClick={() => navigate(route)} />
        </div>
      </div>
    </header>
  );
};

Header.prototype = {
  textButton: PropTypes.string,
  route: PropTypes.string,
};
