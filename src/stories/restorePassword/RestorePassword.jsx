import React, { useState } from "react";
import "./restorePassword.css"; // Asegúrate de tener un archivo CSS correspondiente
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import { useAuth } from "../../Context/AuthContext";
import Swal from "sweetalert2/dist/sweetalert2.js";

export const RestorePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { restorePassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === "" || confirmPassword === "") {
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
        customClass: {
          title: "swal-title",
          icon: "swal-icon",
          confirmButton: "swal-button",
        },
      }).fire({
        icon: "error",
        title: "Please fill all the fields",
      });
      return;
    }
    if (password !== confirmPassword) {
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
        customClass: {
          title: "swal-title",
          icon: "swal-icon",
          confirmButton: "swal-button",
        },
      }).fire({
        icon: "error",
        title: "Passwords do not match",
      });
      return;
    }
    await restorePassword(password);
  };

  return (
    <article className="article-restore">
      <div className="restore">
        <div className="restore-container">
          <h3>Restore Password</h3>

          <Input
            primary={true}
            type="password"
            placeholder="Enter your id"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Input
            primary={true}
            type="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <Button
            label="Restore"
            primary={true}
            size="medium"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </article>
  );
};
