
import React, { useState } from 'react';
import { useAdmin } from "../../context/AdminContext";

function FormularioProducto() {
  const { agregarProducto, setOpen } =  useAdmin();

  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    stock: '',
    imagen: '',
    categoria: '',
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!producto.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    }
    if (!producto.precio || producto.precio <= 0) {
      nuevosErrores.precio = 'El precio debe ser mayor a 0.';
    }
    if (!producto.categoria.trim() || producto.categoria.length < 5) {
      nuevosErrores.categoria = 'La categoría debe tener al menos 5 caracteres.';
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    agregarProducto(producto);
    setProducto({
      nombre: '',
      precio: '',
      stock: '',
      imagen: '',
      categoria: '',
    });
    setOpen(false); // Cerrar el formulario tras agregar
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Producto</h2>
      <div>
        <label>Nombre:</label>
        <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} required />
        {errores.nombre && <p style={{ color: 'red' }}>{errores.nombre}</p>}
      </div>

      <div>
        <label>Precio:</label>
        <input type="number" name="precio" value={producto.precio} onChange={handleChange} required min="0" />
        {errores.precio && <p style={{ color: 'red' }}>{errores.precio}</p>}
      </div>

      <div>
        <label>Stock:</label>
        <input type="number" name="stock" value={producto.stock} onChange={handleChange} required />
      </div>

      <div>
        <label>Imagen URL:</label>
        <input type="text" name="imagen" value={producto.imagen} onChange={handleChange} required />
      </div>

      <div>
        <label>Categoría:</label>
        <input type="text" name="categoria" value={producto.categoria} onChange={handleChange} required />
        {errores.categoria && <p style={{ color: 'red' }}>{errores.categoria}</p>}
      </div>

      <button type="submit">Agregar Producto</button>
    </form>
  );
}

export default FormularioProducto;
