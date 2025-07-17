import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './styleEstatico.css';
import Cart from '../../components/Cart';
import { CartContext } from "../../context/CartContext";

const Header = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const { cart } = useContext(CartContext); 

  // Evitás errores si hay valores undefined o NaN
  const totalCantidad = Array.isArray(cart)
    ? cart.reduce((total, item) => total + (item.quantity || 0), 0)
    : 0;

  return (
    <header>
      <nav>
        <ul>
          <li><Link to='/' className='link'>Inicio</Link></li>
          <li><Link to='/acercade' className='link'>Sobre nosotros</Link></li>
          <li><Link to='/productos' className='link'>Galería de productos</Link></li>
          <li><Link to='/contacto' className='link'>Contacto</Link></li>
          <li className='cartnav'>
            <button className='btnCart' onClick={() => setCartOpen(true)}>
              <i className="fa-solid fa-cart-shopping"></i>
              {totalCantidad > 0 && (
                <span className="cart-count">{totalCantidad}</span>
              )}
            </button>

        
            <Cart
              isOpen={isCartOpen}
              onClose={() => setCartOpen(false)}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
