import React, { useState } from "react";
import { css } from "@emotion/core";
import Router from "next/router";
import Layout from "../components/layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/layout/ui/Formulario";

//Firebase
import firebase from "../firebase";

//Validaciones Hook personalizado de validacion
import useValidacion from "../hooks/useValidacion";
import validarIniciarSesion from "../validacion/validarIniciarSesion";

//Falso State del componente que va a pasar al hook de validacion
const STATE_INICIAL = {
  email: "",
  password: "",
};

const Login = () => {
  const [error, guardarError] = useState(false);

  const {
    valores,
    errores,
    submitForm,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

  const { email, password } = valores;

  async function iniciarSesion() {
    try {
      await firebase.login(email, password);
      Router.push("/");
    } catch (error) {
      console.error("Hubo un error al iniciar sesion", error.message);
      guardarError(error.message);
    }
  }
  return (
    <div className="container">
      <Layout>
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >
          Iniciar Sesión
        </h1>
        <Formulario onSubmit={handleSubmit} noValidate>
          <Campo>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Tu Email"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>
          {errores.email && <Error>{errores.email}</Error>}
          <Campo>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Tu Password"
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>
          {errores.password && <Error>{errores.password}</Error>}
          {error && <Error>{error}</Error>}
          <InputSubmit type="submit" value="Iniciar Sesión" />
        </Formulario>
      </Layout>
    </div>
  );
};

export default Login;
