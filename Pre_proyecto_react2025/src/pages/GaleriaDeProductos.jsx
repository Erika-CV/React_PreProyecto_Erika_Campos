
import React, { useContext } from 'react';
import Header from '../components/estaticos/Header';
import Footer from '../components/estaticos/Footer';
import ProductList from '../components/ProductList';
import loading from '../assets/loading.gif';
import { CartContext } from '../context/CartContext';

const GaleriaDeProductos = ({ productos, cargando }) => {
  const { cartItems, agregarCarrito, borrarProducto, vaciarCarrito } = useContext(CartContext);

  return (
    <>
      <Header 
        borrarProducto={borrarProducto} 
        cartItems={cartItems} 
        vaciarCarrito={vaciarCarrito} 
      />
      <h1>Explora nuestra selección de productos exclusivos.</h1>

      {
        cargando 
          ? <img src={loading} alt='loading' /> 
          : <ProductList agregarCarrito={agregarCarrito} productos={productos} />
      }

      <Footer />
    </>
  );
};

export default GaleriaDeProductos;
