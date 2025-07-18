
import React, { useContext } from 'react';
import Productos from './Productos';
import { CartContext } from '../context/CartContext';
import './styleProductos.css';

const ProductList = () => {
  const {
    productosPaginados,
    cargando,
    error,
    busqueda,
    setBusqueda,
    paginaActual,
    cambiarPagina,
    totalPaginas
  } = useContext(CartContext);

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>Hubo un error al cargar los productos.</p>;

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    cambiarPagina(1);
  };

  return (
    <div>
      <h2>Galería de productos</h2>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={handleChange}
        className="form-control mb-3"
      />

      {productosPaginados.length === 0 ? (
        <p>No se encontraron productos.</p>
      ) : (
        <>
          <div className="product-grid">
            {productosPaginados.map((producto) => (
              <Productos key={producto.id} producto={producto} />
            ))}
          </div>

          <div className="pagination mt-4">
            {Array.from({ length: totalPaginas }, (_, i) => (
              <button
                key={i}
                className={`btn btn-sm mx-1 ${paginaActual === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => cambiarPagina(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
