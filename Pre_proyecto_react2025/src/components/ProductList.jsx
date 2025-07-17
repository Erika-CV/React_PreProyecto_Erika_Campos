import React, { useContext } from 'react';
import Productos from './Productos';
import { CartContext } from '../context/CartContext';

const ProductList = () => {
  const {
    productosFiltrados,
    cargando,
    error,
    handleAddToCart,
  } = useContext(CartContext);

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>Hubo un error al cargar los productos.</p>;
  if (!productosFiltrados || productosFiltrados.length === 0) {
    return <p>No se encontraron productos.</p>;
  }

  return (
    <>
      <h2>Galería de productos</h2>
      <div className="product-grid">
        {productosFiltrados.map(producto => (
          <Productos
            key={producto.id}
            producto={producto}
            agregarCarrito={handleAddToCart}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;
