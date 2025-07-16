import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from './estaticos/Header'
import Footer from './estaticos/Footer'
import { CartContext } from '../context/CartContext'
const DetallesProducto = () => {
  const { id } = useParams()
  const { productos, agregarCarrito } = useContext(CartContext)

  const producto = productos.find(producto => producto.id === parseInt(id))

  if (!producto) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: '#c00' }}>Detalle del producto: {id}</h1>
        <p style={{ fontSize: '1.2rem' }}>Producto no encontrado</p>
      </div>
    )
  }

  return (
    <>
      <Header />
      <section
        style={{
          maxWidth: '600px',
          margin: '32px auto',
          padding: '2rem',
          border: '1px solid #eee',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
          background: '#fff',
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#333' }}>
          {producto.title}
        </h1>

        {producto.image && (
          <img
            src={producto.image}
            alt={producto.title}
            style={{
              width: '100%',
              maxHeight: '300px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '1.5rem',
            }}
          />
        )}

        <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#555' }}>
          {producto.description}
        </p>

        <p style={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#007b55' }}>
          Precio: ${producto.price}
        </p>

        <details style={{ marginBottom: '1.5rem' }}>
          <summary style={{ fontWeight: 'bold', color: '#333' }}>
            Detalles del producto
          </summary>
          <ul style={{ paddingLeft: '1.5rem', color: '#555' }}>
            <li>Categoría: {producto.category}</li>
            <li>SKU: {producto.id * 1234}</li>
            <li>Fecha de lanzamiento: {new Date().toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}</li>
          </ul>
        </details>

        <p style={{ fontSize: '1rem', color: '#888', marginBottom: '1.5rem' }}>
          Stock disponible: {producto.count}
        </p>

        <button
          onClick={() => agregarCarrito({ ...producto, cantidad: 1 })}
          style={{
            padding: '0.5rem 1rem',
            background: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Agregar al carrito
        </button>

        <br /><br />
        <Link
          to="/productos"
          style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: '#007bff',
            color: '#fff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Volver a productos
        </Link>
      </section>
      <Footer />
    </>
  )
}

export default DetallesProducto



