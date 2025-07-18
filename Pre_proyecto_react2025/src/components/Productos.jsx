import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import '../components/styleProductos.css';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';

const Productos = ({ producto }) => {
  const [cantidad, setCantidad] = useState(0);
  const { handleAddToCart } = useContext(CartContext);

  const increase = () => {
    if (cantidad < producto.count) {
      setCantidad(prev => prev + 1);
    }
  };

  const decrease = () => {
    if (cantidad > 1) {
      setCantidad(prev => prev - 1);
    }
  };

  const handleAgregarCarrito = () => {
    if (producto.count === 0) {
      toast.warn("Este producto no tiene stock disponible.");
      return;
    }

    if (cantidad === 0) {
      toast.warn("Por favor, seleccioná una cantidad antes de agregar al carrito.");
      return;
    }

    handleAddToCart({ ...producto, quantity: cantidad });
    setCantidad(0);
  };

  return (
    <section className="card">
      <div className="imganContainer">
        <img src={producto.image} alt={producto.title} className="imagen" />
      </div>

      <h3 className="nombre">{producto.title}</h3>
      <p className="precio">${parseFloat(producto.price).toFixed(2)}</p>
      <p className="descripcion">{producto.description}</p>
      <p className="categoria">Categoría: {producto.category}</p>
      <p className="stock">Stock disponible: {producto.count}</p>

      <div className="cantidadContainer">
        <button
          className="qtyButton"
          onClick={decrease}
          disabled={cantidad <= 1}
        >
          -
        </button>
        <span className="cantidad">{cantidad}</span>
        <button
          className="qtyButton"
          onClick={increase}
          disabled={cantidad >= producto.count}
        >
          +
        </button>
      </div>

      <button
        onClick={handleAgregarCarrito}
        className="btn-agregar"
        disabled={producto.count === 0}
      >
        Agregar al carrito
      </button>

      <Link to={`/product/${producto.id}`}>
        <button className="btn-detalle">Ver detalle</button>
      </Link>
    </section>
  );
};

export default Productos;
