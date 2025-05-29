import React, { useState } from 'react'
import './styleProductos.css'

const Productos = ({ producto, agregarCarrito }) => {

  const [cantidad, setCantidad] = useState(0);

  const increase = () => setCantidad(prev => (prev < producto.count ? prev + 1 : prev));
  const decrease = () => setCantidad(prev => (prev > 1 ? prev - 1 : 0));

  return (
    <section className='card'>
      <div className='imganContainer'>
        <img src={producto.image} alt="" className='imagen' />
      </div>

      <h3 className='nombre'>{producto.title}</h3>
      <p className='precio'>${producto.price}</p>
      <p className='descripcion'>{producto.description}</p>
      <p className='categoria'>{producto.category}</p>
      <p className='stock'>{producto.count}</p>


      <div className='cantidadContainer'>
        <button className='qtyButton' onClick={decrease} disabled={cantidad === 0}>-</button>
        <span>{cantidad}</span>
        <button className='qtyButton' onClick={increase}>+</button>
      </div>
  
      <button disabled={cantidad === 0}
        onClick={() => agregarCarrito({ ...producto, cantidad },
          setCantidad(0))}> Agregar al carrito</button>

    </section >
  )
}

export default Productos
