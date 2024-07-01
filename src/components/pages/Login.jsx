import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {userLogin} from "../../features/content/contentSlice"
import { selectUserLogin } from "../../features/content/contentSlice";
import "./Sign.css";
import Logo from "../../icons/logo.svg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userType, setuserType] = useState();
  const userLogged = useSelector(selectUserLogin)

  


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(userType));
    navigate('/');
  };

  if(userLogged) return <Navigate to='/' />

  return (
    <div className="base-sign">
      <div className="presentation-container">
        <img src={Logo} alt="FabLab" className="presentation-img" />
      </div>
      <div className="main">
        <form onSubmit={handleSubmit} className="sign-form">
          <button type="submit" className="sign-form--btn" onClick={()=>setuserType({
            "id":"101",
            "user":"Juan Doe",
            "email":"admin@email.com",
            "pass":"123456",
            "admin":"admin"
          })}>
            Iniciar Sesión como Administrador
          </button>
          <button type="submit" className="sign-form--btn" onClick={()=>setuserType({
            "id":"202",
            "user":"Joe Quark",
            "email":"manager@email.com",
            "pass":"123456",
            "admin":"manager"
          })}>
            Iniciar Sesión como manager
          </button>
          <Link to="/signup" className="sign-redirect">
            ¿No tenés cuenta? Registrate
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
