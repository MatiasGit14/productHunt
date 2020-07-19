//Esta funcion sera el validador para crear cuenta que va a recibir un objeto con los datos ingresados por el usuario

export default function validarCrearCuenta(valores) {
  let errores = {};
  console.log(valores);
  //Validar el nombre del usuario
  if (!valores.nombre) {
    errores.nombre = "El nombre es obligatorio";
  }
  //Validar el nombre de empresa
  if (!valores.empresa) {
    errores.empresa = "El nombre de la empresa es obligatorio";
  }

  //Validar la url
  if (!valores.url) {
    errores.url = "La URL del producto es obligatoria";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
    errores.url = "La URL no es válida";
  }

  //Validar descripcion
  if (!valores.descripcion) {
    errores.descripcion = "Agrega una descripción de tu producto";
  }
  return errores;
}
