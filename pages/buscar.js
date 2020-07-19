import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import DetallesProducto from "../components/layout/DetallesProducto";
import useProductos from "../hooks/useProductos";

const Buscar = () => {
  const router = useRouter();
  const {
    query: { q },
  } = router;

  //Todos los productos
  const { productos } = useProductos("creado");

  //State
  const [resultado, guardarResultado] = useState([]);

  useEffect(() => {
    const busqueda = q.toLocaleLowerCase();
    const filtro = productos.filter((producto) => {
      return (
        producto.nombre.toLocaleLowerCase().includes(busqueda) ||
        producto.descripcion.toLocaleLowerCase().includes(busqueda)
      );
    });
    guardarResultado(filtro);
  }, [q, productos]);
  return (
    <div className="container">
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {resultado.map((producto) => (
                <DetallesProducto key={producto.id} producto={producto} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Buscar;
