import React, { createContext, useContext, useEffect, useState} from "react";
import DOMPurify from "dompurify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js'


// Creamos el contexto de autenticación
const AuthContext = createContext();

// Hook para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();
 
  const register = async (id, email, password) => {
    try {

      const sanitizedId = DOMPurify.sanitize(id);
      const sanitizedEmail = DOMPurify.sanitize(email);
      const sanitizedPassword = DOMPurify.sanitize(password);

      await axios.post("http://localhost:3000/api/user/register", {
        user_id: sanitizedId,
        email: sanitizedEmail,
        password: sanitizedPassword,
      });

      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      }).fire({
        icon: 'success',
        title: 'Usuario registrado con éxito'
      })
      navigate(`/login`);
    } catch (error) {
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      }).fire({
        icon: 'error',
        title: 'Error al registrar el usuario'
      })
      console.error("Error al registrar el usuario:", error);
    }
  };

  const confirmEmail = async (token) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/user/confirm-email/${token}`);
      if (response.data.status === "Confirmed") {
        navigate(`/login`);
        Swal.fire({
          icon: 'success',
          title: 'Correo electrónico confirmado con éxito',
          showConfirmButton: false,
          timer: 3000
        });
        return;
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al confirmar el correo electrónico',
        showConfirmButton: false,
        timer: 3000
      });
      console.error("Error al confirmar el correo electrónico:", error);
    }
  };

  const login = async (userid, password) => {
    try {
      const sanitizedUserid = DOMPurify.sanitize(userid);
      const sanitizedPassword = DOMPurify.sanitize(password);

      const response = await axios.post("http://localhost:3000/api/user/login", {
        user_id: sanitizedUserid,
        password: sanitizedPassword,
      });

      if (response.data.status === "Pending") {
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        })
          .fire({ 
            icon: "warning",
            title: "Usuario pendiente de confirmación - Reenviando correo electrónico",
          })
          .then(async () => {
            await axios.post(`http://localhost:3000/api/user/resend-email/${response.data.token}`);
          });
        return;
      } else if (response.data.status === "Confirmed") {
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        })
          .fire({
            icon: "success",
            title: "Usuario logueado con éxito - Complete su registro",
          })
          .then(() => {
            navigate(`/complete-register/${response.data.id}`);
          });
        return;
      } else if (response.data.status === "Active") {
        sessionStorage.setItem('accessToken', response.data.token);
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        })
          .fire({
            icon: "success",
            title: "Usuario logueado con éxito",
          })
          .then(() => {
            navigate("/dashboard");
          });
        return; 
      }
    } catch (error) {
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      })
        .fire({
          icon: "error",
          title: "Usuario o contraseña incorrectos",
        })
      console.error("Error al loguear el usuario:", error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/login");
  };

  const completeRegister = async ( first_name, last_name, date_of_birth, address, phone_number ) => {
    try {

      //agarrar el id del parametro
      const id = window.location.pathname.split("/")[2];

      const sanitizedFirst_name = DOMPurify.sanitize(first_name);
      const sanitizedLast_name = DOMPurify.sanitize(last_name);
      const sanitizedDate_of_birth = DOMPurify.sanitize(date_of_birth);
      const sanitizedAddress = DOMPurify.sanitize(address);
      const sanitizedPhone_number = DOMPurify.sanitize(phone_number);

      //transformar la fecha 2001-05-30 a 30/05/2001
      const date = new Date(sanitizedDate_of_birth);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const newDate = day + "/" + month + "/" + year;
      const sanitizedDate_of_birth2 = DOMPurify.sanitize(newDate);

      await axios.post(`http://localhost:3000/api/user/complete-register/${id}`, {
        first_name: sanitizedFirst_name,
        last_name: sanitizedLast_name,
        date_of_birth: sanitizedDate_of_birth2,
        address: sanitizedAddress,
        phone_number: sanitizedPhone_number,
      });

    
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      })
        .fire({
          icon: "success",
          title: "Usuario completado su registro con éxito",
        })
        .then(() => {
          navigate("/dashboard");
        });
    } catch (error) { 
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      })
        .fire({
          icon: "error",
          title: "Error al completar el registro",
        })
      console.error("Error al registrar el usuario:", error);
    }
  };

  const forgotPassword = async (email) => {
    try {
      const sanitizedEmail = DOMPurify.sanitize(email);
      const response = await axios.post("http://localhost:3000/api/user/forgot-password", {
        email: sanitizedEmail,
      });
      console.log(response.data);
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      })
        .fire({
          icon: "success",
          title: "Correo electrónico enviado con éxito",
        })
        .then(() => {
          navigate("/login");
        });
    } catch (error) {
      console.error("Error al recuperar la contraseña:", error);
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      })
        .fire({
          icon: "error",
          title: "Error el Email no existe en la base de datos",
        })
      window.location.reload();
    }
  };

  const restorePassword = async (password) => {
    try {
      const sanitizedPassword = DOMPurify.sanitize(password);
      const token = window.location.pathname.split("/")[2];
      const decodedToken = atob(token);
      const response = await axios.post(`http://localhost:3000/api/user/restore-password/${decodedToken}`, {
        password: sanitizedPassword,
      });
      console.log(response.data);
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      })
        .fire({
          icon: "success",
          title: "Contraseña restaurada con éxito",
        })
        .then(() => {
          navigate("/login");
        });
    } catch (error) {
      console.error("Error al restaurar la contraseña:", error);
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      })
        .fire({
          icon: "error",
          title: "Error al restaurar la contraseña",
        })
      window.location.reload();
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        register,
        confirmEmail,
        logout,
        login,
        completeRegister,
        forgotPassword,
        restorePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
