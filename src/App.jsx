import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importa BrowserRouter

import { LoginPage } from "./stories/loginPage/LoginPage";
import { RegisterPage } from "./stories/registerPage/RegisterPage";
import "./App.css";

function App() {
  return (
    <Router> {/* Utiliza BrowserRouter aquí */}
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
