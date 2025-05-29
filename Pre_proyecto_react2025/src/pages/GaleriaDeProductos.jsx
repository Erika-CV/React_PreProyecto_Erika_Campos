import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import ProductList from '../components/ProductList'
import loading from '../assets/loading.gif'

const GaleriaDeProductos = ({cart,productos, cargando, agregarCarrito, borrarProducto , vaciarCarrito}) => {
  return (
    <>
      <Header borrarProducto={borrarProducto} cartItems={cart} vaciarCarrito={vaciarCarrito}/>
      <h1>"Explora nuestra selección de productos exclusivos."</h1>
      {
          cargando ? <img src={loading} alt='loading' /> :

          <ProductList agregarCarrito={agregarCarrito} productos={productos}/>
        }

      <Footer/>
    </>
  )
}

export default GaleriaDeProductos
