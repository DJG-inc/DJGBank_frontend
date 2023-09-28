import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importa BrowserRouter

import { LoginPage } from "./stories/loginPage/LoginPage";
import { RegisterPage } from "./stories/registerPage/RegisterPage";
import { CompleteRegisterPage } from "./stories/CompleteRegisterPage/CompleteRegisterPage"; // Importa CompleteRegisterPage
import "./App.css";
import { AuthProvider } from "./Context/AuthContext";
import { ConfirmEmail } from "./stories/ConfirmEmailPage/ConfirmEmail";
import { HomePage } from "./stories/homePage/HomePage";
import { Dashboard } from "./stories/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/complete-register/:id"
            element={<CompleteRegisterPage />}
          />
          <Route path="/confirm-email/:token" element={<ConfirmEmail />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
