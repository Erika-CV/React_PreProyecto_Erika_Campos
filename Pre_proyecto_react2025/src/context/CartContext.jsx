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

  // Estados para paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 8;

  const API_URL = "https://687909fd63f24f1fdca09597.mockapi.io/products";

  // Cargar productos desde MockApi
  useEffect(() => {
    fetch(API_URL)
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

  // Total de páginas
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  // Productos a mostrar en la página actual
  const indexInicio = (paginaActual - 1) * productosPorPagina;
  const indexFin = indexInicio + productosPorPagina;
  const productosPaginados = productosFiltrados.slice(indexInicio, indexFin);

  // Cambiar de página
  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  // Obtener un producto por ID
  const getProductoPorId = (id) => {
    return productos.find(producto => producto.id === parseInt(id));
  };

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

  // Resetear contadores
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
        productosPaginados,
        totalPaginas,
        paginaActual,
        cambiarPagina,
        busqueda,
        setBusqueda,
        getProductoPorId
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
