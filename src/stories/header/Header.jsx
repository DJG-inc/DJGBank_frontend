import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { Button } from "../button/Button";
import PropTypes from "prop-types";
import "./header.css";  

export const Header = ({ textButton, ...props }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("EN"); // Estado para el idioma seleccionado

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    // Aquí puedes agregar lógica para cambiar el idioma en tu aplicación si es necesario
  };

  return (
    <header>
      <div className={`storybook-navbar ${props.primary ? "primary" : ""}`}>
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

        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <div className="login">
          <Button label={textButton} primary={true} size={"medium"} />
        </div>
      </div>
    </header>
  );
};

Header.prototype = {
  textButton: PropTypes.string,
};
