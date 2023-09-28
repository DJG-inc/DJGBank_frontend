import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./confirmEmail.css";

export const ConfirmEmail = () => {
  const { token } = useParams();
  const { confirmEmail } = useAuth();

  // Decodifica el token en Base64
  const decodedToken = atob(token);

  useEffect(() => {
    confirmEmail(decodedToken);
  } , [confirmEmail, decodedToken]);  

  return (
    <div className="confirm-email-container">
        <div>
          <p className="confirming-message">
            Confirmando el correo electrónico...
          </p>
        </div>
    </div>
  );
};


