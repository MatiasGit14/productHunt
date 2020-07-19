//Esta funcion sera el validador para crear cuenta que va a recibir un objeto con los datos ingresados por el usuario

export default function validarCrearCuenta(valores) {
  let errores = {};
  console.log(valores);
  //Validar el nombre del usuario
  if (!valores.nombre) {
    errores.nombre = "El nombre es obligatorio";
  }
  //Validar el email
  if (!valores.email) {
    errores.email = "El Email es obligatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
    errores.email = "Email no válido";
  }

  //Validar el password
  if (!valores.password) {
    errores.password = "El password es obligatorio";
  } else if (valores.password.length < 6) {
    errores.password = "El password debe ser de al menos 6 carácteres";
  }
  return errores;
}
