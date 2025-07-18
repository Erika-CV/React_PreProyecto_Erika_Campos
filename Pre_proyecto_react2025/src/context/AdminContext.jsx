import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from "react-toastify";

const AdminContext = createContext();

const API_URL = 'https://687909fd63f24f1fdca09597.mockapi.io/products';

export const AdminProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [open, setOpen] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);

  // 🔄 Cargar productos desde MockAPI
  const obtenerProductos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  // ✅ Crear producto
  const agregarProducto = async (nuevoProducto) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto),
      });
      const data = await res.json();
      setProductos((prev) => [...prev, data]);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  // ✏️ Actualizar producto
  const actualizarProducto = async (productoEditado) => {
    try {
      const res = await fetch(`${API_URL}/${String(productoEditado.id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoEditado),
      });
      const data = await res.json();
      setProductos((prev) =>
        prev.map((prod) => (prod.id === data.id ? data : prod))
      );
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  };

  // ❌ Eliminar producto
  const eliminarProducto = async (id) => {
    try {
      const respuesta = await fetch(`https://687909fd63f24f1fdca09597.mockapi.io/products/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        if (respuesta.status === 404) {
          toast.error("El producto ya fue eliminado o no existe.");
          return;
        }
        toast.error("Error al eliminar el producto.");
        return;
      }

      setProductos((prevProductos) =>
        prevProductos.filter((producto) => producto.id !== id)
      );

      toast.success("Producto eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar producto:", error.message);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        productos,
        cargando,
        open,
        setOpen,
        openEditor,
        setOpenEditor,
        seleccionado,
        setSeleccionado,
        agregarProducto,
        actualizarProducto,
        eliminarProducto,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
