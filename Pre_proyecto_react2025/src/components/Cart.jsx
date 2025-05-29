import React from 'react'
import './styleCart.css'

const Cart = ({ cartItems, isOpen, onClose, borrarProducto, vaciarCarrito }) => {
  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
      <div className='cart-header'>
        <h2 className='cart-title'>Carrito de Compras</h2>
        <button onClick={onClose} className='close-button'>X</button>
      </div>

      <div className='cart-content'>
        {cartItems.length === 0 ? (
          <p className='empty-cart'>El carrito está vacío</p>
        ) : (
          <ul className='cart-items'>
            {cartItems.map((item) => (
              <li key={item.id} className='cart-item'>
                <span className='item-details'>
                  {item.title} - ${item.price} x {item.quantity}
                </span>
                <button className='delete-btn' onClick={() => borrarProducto(item)}>
                  <i className="fa-solid fa-trash trash-icon"></i>
                </button>
              </li>
            ))}
          </ul>
        )}

        {cartItems.length > 0 && (
          <>
            <div className='cart-total'>
              <strong>Total:</strong> ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
            </div>

            <div className='cart-actions'>
              <button className='btn-clear' onClick={vaciarCarrito}>Vaciar carrito</button>
              <button className='btn-checkout' onClick={() => alert('¡Gracias por tu compra!')}>
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};


export default Cart