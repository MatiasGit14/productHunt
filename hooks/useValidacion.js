import React, { useState, useEffect } from "react";

//parametros, 1° state inicial que creo como una variable en cada componente de formulario
// 2° VALIDAR: que es lo que se va a validar y como, cada formulario va a tener su archivo con las validaciones propias
// 3° funcion que se ejecuta en el submit de cada componente

const useValidation = (stateInicial, validar, fn) => {
  const [valores, guardarValores] = useState(stateInicial);
  const [errores, guardarErrores] = useState({});
  const [submitForm, guardarSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const noErrores = Object.keys(errores).length === 0;
      if (noErrores) {
        fn(); // Fn = Funcion que se ejecuta en el componente (crearProducto, Iniciar Sesion o Crear Cuenta, cualquier funcion de los submit)
      }
      guardarSubmitForm(false);
    }
  }, [errores]);

  //Funcion que se ejectura cuando el usuario escribe algo
  const handleChange = (e) => {
    guardarValores({
      ...valores,
      [e.target.name]: e.target.value,
    });
  };

  //Funcion que se ejecuta cuando el usuario hace submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validar(valores);
    guardarErrores(erroresValidacion);
    guardarSubmitForm(true);
  };

  //Cuando se realiza el evento de blur
  const handleBlur = () => {
    const erroresValidacion = validar(valores);
    guardarErrores(erroresValidacion);
  };
  return {
    valores,
    errores,
    submitForm,
    handleChange,
    handleSubmit,
    handleBlur,
  };
};

export default useValidation;
