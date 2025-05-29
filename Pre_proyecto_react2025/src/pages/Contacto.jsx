import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'

const Contactos = ({cart, borrarProducto , vaciarCarrito}) => {
  return (
    <>
      <Header borrarProducto={borrarProducto} cartItems={cart} vaciarCarrito={vaciarCarrito}/>
      <h1>contactos</h1>
      <Footer/>
    </>
  )
}

export default Contactos