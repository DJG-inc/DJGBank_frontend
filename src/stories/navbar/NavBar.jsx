import React from "react";
import PropTypes from "prop-types";
import "./navbar.css";
import logo from "../assets/logo.svg";
import { Button } from "../button/Button";
import { useNavigate } from "react-router-dom";

export const NavBar = ({ routes, handleRouteClick, ...props }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`storybook-navbar ${props.primary ? "primary" : ""}`}
      style={{ backgroundColor: "#191A15" }}
    >
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="navbar-routes">
        {routes.map((route, index) => (
          <div
            className="route"
            key={index}
            onClick={() => handleRouteClick(route.url)}
          >
            <span className="route-text">{route.label}</span>
          </div>
        ))}
      </div>
      <div className="navbar-login">
        <Button
          label="Login"
          primary={true}
          size={"medium"}
          onClick={() => navigate("/login")}
        />
      </div>
    </div>
  );
};

NavBar.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  handleRouteClick: PropTypes.func.isRequired, // Asegúrate de requerir la función de navegación
};
