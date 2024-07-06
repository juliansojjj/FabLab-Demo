import { faker } from '@faker-js/faker';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { selectUserLogin, userLogin } from "../../features/content/contentSlice";
import Logo from "../../icons/logo.svg";
import "./Sign.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogged = useSelector(selectUserLogin)

  
  function createRandomUser(role){
    return {
      id: faker.string.uuid(),
      user: `${faker.person.firstName()} ${faker.person.lastName()}`,
      email: faker.internet.email(),
      admin:role,
      viewed:[]
    };
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const role = e.currentTarget.attributes.getNamedItem("data-role").value;
    const user = createRandomUser(role)
    dispatch(userLogin(user));
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
          <button className="sign-form--btn" data-role="admin" onClick={handleSubmit}>
            Iniciar Sesión como Administrador
          </button>
          <button className="sign-form--btn" data-role="manager" onClick={handleSubmit}>
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
