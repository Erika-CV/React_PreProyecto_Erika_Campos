import React, { useContext, useEffect } from 'react';
import '../components/styleCart.css';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';

const Cart = ({ isOpen, onClose }) => {
  const { cart = [], handleDeleteFromCart, clearCart, resetCounters } = useContext(CartContext);

  useEffect(() => {
    // Reinicia los contadores al cargar la página
    resetCounters?.();
  }, [ resetCounters]);

  const calcularTotal = () => {
    return cart.reduce((acc, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = item.quantity || 0;
      return acc + price * quantity;
    }, 0).toFixed(2);
  };

  const handleClearCart = () => {
    clearCart();
    toast.info("Vaciaste el carrito");
  };

  const handleCheckout = () => {
    toast.success("¡Gracias por tu compra!");
    clearCart();
  };

  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
      <div className='cart-header'>
        <h2 className='cart-title'>Carrito de Compras</h2>
        <button onClick={onClose} className='close-button'>X</button>
      </div>

      <div className='cart-content'>
        {cart.length === 0 ? (
          <p className='empty-cart'>El carrito está vacío</p>
        ) : (
          <ul className='cart-items'>
            {cart.map((item) => (
              <li key={item.id} className='cart-item'>
                <span className='item-details'>
                  {item.title} - ${parseFloat(item.price).toFixed(2)} x {item.quantity}
                </span>
                <button className='delete-btn' onClick={() => handleDeleteFromCart(item)}>
                  <i className="fa-solid fa-trash trash-icon"></i>
                </button>
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 && (
          <>
            <div className='cart-total'>
              <strong>Total:</strong> ${calcularTotal()}
            </div>

            <div className='cart-actions'>
              <button className='btn-clear' onClick={handleClearCart}>Vaciar carrito</button>
              <button className='btn-checkout' onClick={handleCheckout}>Finalizar compra</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
