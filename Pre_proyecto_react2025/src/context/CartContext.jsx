import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuth] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  // Cargar productos desde el JSON
  useEffect(() => {
    fetch('/data/data.json')
      .then(res => res.json())
      .then(datos => {
        setTimeout(() => {
          setProductos(datos);
          setCargando(false);
        }, 2000);
      })
      .catch(err => {
        console.error('Error al cargar productos:', err);
        setCargando(false);
        setError(true);
      });
  }, []);

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Filtro de búsqueda
  const productosFiltrados = productos.filter(producto =>
    producto?.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Agregar al carrito
  const handleAddToCart = (product) => {
    const productInCart = cart.find(item => item.id === product.id);

    if (productInCart) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + product.quantity }
          : item
      ));
    } else {
      toast.success(`El producto "${product.title}" se ha agregado al carrito`);
      setCart([...cart, { ...product, quantity: product.quantity }]);
    }
  };

  // Eliminar del carrito
  const handleDeleteFromCart = (product) => {
    toast.error(`El producto "${product.title}" se ha eliminado del carrito`);
    setCart(prevCart =>
      prevCart
        .map(item => {
          if (item.id === product.id) {
            return item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : null;
          } else {
            return item;
          }
        })
        .filter(item => item !== null)
    );
  };

  // Vaciar carrito
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    toast.info('¡Compra finalizada!');
  };

  //  Resetear contadores de cantidad
  const resetCounters = () => {
    setCart(prevCart =>
      prevCart.map(product => ({
        ...product,
        quantity: 0
      }))
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        productos,
        cargando,
        error,
        handleAddToCart,
        handleDeleteFromCart,
        clearCart,
        resetCounters, 
        isAuthenticated,
        setIsAuth,
        productosFiltrados,
        busqueda,
        setBusqueda
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
