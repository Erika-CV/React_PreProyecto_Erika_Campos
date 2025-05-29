import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'

const AcercaDe = ({cart,borrarProducto, vaciarCarrito}) => {
  return (
    <>
      <Header borrarProducto={borrarProducto} cartItems={cart} vaciarCarrito={vaciarCarrito} />
      <h1>Acerca De</h1>
      <Footer />
    </>
  )
}

export default AcercaDe


