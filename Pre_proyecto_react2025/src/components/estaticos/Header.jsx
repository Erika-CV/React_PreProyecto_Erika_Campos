
import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './styleEstatico.css';
import Cart from '../../components/Cart';
import { CartContext } from '../../context/CartContext';
import { FaCartShopping } from 'react-icons/fa6';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaUserShield, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const { isAuth, logout } = useAuth();

  const totalItems = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + (item.quantity || 0), 0)
    : 0;

  return (
    <header>
      <nav>
        <ul>
          <li><Link to='/' className='link'>Inicio</Link></li>
          <li><Link to='/acercade' className='link'>Sobre nosotros</Link></li>
          <li><Link to='/productos' className='link'>Galería de productos</Link></li>
          <li><Link to='/contacto' className='link'>Contacto</Link></li>

          {/* Carrito */}
          <li className='cartnav'>
            <button className='btnCart' onClick={() => setCartOpen(true)}>
              <FaCartShopping color="red" />
              {totalItems > 0 && (
                <span className="cart-count">{totalItems}</span>
              )}
            </button>
            <Cart isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
          </li>

          {/* Login / Admin / Logout */}
          {!isAuth ? (
            <li className="nav-item">
              <NavLink className="link" to="/login" title="Iniciar sesión">
                <FaUser size={20} />
              </NavLink>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <NavLink className="link" to="/admin" title="Panel de administrador">
                  <FaUserShield size={20} />
                </NavLink>
              </li>
              <li className="nav-item">
                <button
                  onClick={logout}
                  className="link"
                  title="Cerrar sesión"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <FaSignOutAlt size={20} />
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
