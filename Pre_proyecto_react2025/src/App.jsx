import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AcercaDe from './pages/AcercaDe'
import GaleriaDeProductos from './pages/GaleriaDeProductos'
import Contacto from './pages/Contacto'
import NotFound from './pages/NotFound'

function App() {
  const [cart, setCart] = useState([])//ver funcionamiento carga de productos
  const [productos, setProductos] = useState([]) //actualizar los productos
  const [cargando, setCargando] = useState(true) // carga de productos -cuando se cargan los productos cambia a false
  const [error, setError] = useState(false) //true cuando hay error con la api

  useEffect(() => {
    fetch('/data/data.json')
      .then(respuesta => respuesta.json()) //busca la respuesta
      .then(datos => {                     //devolucion de la promesa
        setTimeout(() => {
          setProductos(datos)
          setCargando(false)
        }, 2000)
      })
      .catch(error => {
        console.log('Error', error)
        setCargando(false)
        setError(true)
      })

  }, [])
  //console.log(productos)

  const handleAddToCart = (product) => {

    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {

      setCart(cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)); //suma la cantidad elegida
    } else {
      setCart([...cart, { ...product, quantity: product.cantidad }]);
    }
  };

  const handleDeleteFromCart = (product) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === product.id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null; // Si quantity es 1, marcamos para eliminar
          }
        } else {
          return item; // Si no es el producto, lo dejamos igual
        }
      }).filter(item => item !== null); // Quitamos los productos nulos
    });
  };
  const handleClearCart = () => {
    setCart([]);
  };



  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home borrarProducto={handleDeleteFromCart} agregarCarrito={handleAddToCart} cart={cart} productos={productos} cargando={cargando} vaciarCarrito={handleClearCart} />} />

        <Route path='/acercade' element={<AcercaDe borrarProducto={handleDeleteFromCart} cart={cart} vaciarCarrito={handleClearCart}/>} />

        <Route path='/productos' element={<GaleriaDeProductos borrarProducto={handleDeleteFromCart} agregarCarrito={handleAddToCart} cart={cart} productos={productos} cargando={cargando} vaciarCarrito={handleClearCart} />} />

        <Route path='/contacto' element={<Contacto borrarProducto={handleDeleteFromCart} cart={cart} vaciarCarrito={handleClearCart} />} />

        <Route path='*' element={<NotFound />} />

      </Routes>
    </Router>
  )
}

export default App
