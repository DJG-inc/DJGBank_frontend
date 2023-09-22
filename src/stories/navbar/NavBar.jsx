import React from "react";
import PropTypes from "prop-types";
import "./navbar.css";
import logo from "../assets/logo.svg";
import { Button } from "../button/Button";

export const NavBar = ({ routes, ...props }) => {
  return (
    <div className={`storybook-navbar ${props.primary ? "primary" : ""}`}>
      {/* 1. Coloca el logo primero */}
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* 2. Centra las rutas horizontalmente */}
      <div className="navbar-routes">
        {routes.map((route, index) => (
          <div className="route" key={index}>
            {/* 3. Aplica estilos de hover y subrayado */}
            <span className="route-text">{route.label}</span>
          </div>
        ))}
      </div>

      {/* 4. Coloca el botón en la parte derecha */}
      <div className="navbar-login">
        <Button label="Login" primary={true} size={"medium"} />
      </div>
    </div>
  );
};

// Define las propTypes para el componente
NavBar.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      label: PropTypes.string,
    })
  ),
};
