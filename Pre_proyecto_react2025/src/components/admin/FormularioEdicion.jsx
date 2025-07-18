
import React, {  useEffect, useState } from 'react';
import { useAdmin } from "../../context/AdminContext";

function FormularioEdicion() {
  const {
    seleccionado,
    setSeleccionado,
    actualizarProducto,
    setOpenEditor
  } =  useAdmin();

  const [producto, setProducto] = useState(seleccionado);

  useEffect(() => {
    setProducto(seleccionado);
  }, [seleccionado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actualizarProducto(producto);
    setOpenEditor(false);
    setSeleccionado(null);
  };

  if (!producto) return null;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Producto</h2>

      <div>
        <label>ID:</label>
        <input type="number" name="id" value={producto.id || ''} onChange={handleChange} readOnly />
      </div>

      <div>
        <label>Nombre:</label>
        <input type="text" name="nombre" value={producto.nombre || ''} onChange={handleChange} required />
      </div>

      <div>
        <label>Precio:</label>
        <input type="number" name="precio" value={producto.precio || ''} onChange={handleChange} required min="0" />
      </div>

      <div>
        <label>Stock:</label>
        <input type="number" name="stock" value={producto.stock || ''} onChange={handleChange} required />
      </div>

      <div>
        <label>Imagen URL:</label>
        <input type="text" name="imagen" value={producto.imagen || ''} onChange={handleChange} required />
      </div>

      <div>
        <label>Categoría:</label>
        <input type="text" name="categoria" value={producto.categoria || ''} onChange={handleChange} required />
      </div>

      <button type="submit">Actualizar Producto</button>
    </form>
  );
}

export default FormularioEdicion;
