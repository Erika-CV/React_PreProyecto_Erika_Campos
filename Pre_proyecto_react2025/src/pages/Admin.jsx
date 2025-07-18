import React from "react";
import FormularioProducto from "../components/admin/FormularioProducto";
import FormularioEdicion from "../components/admin/FormularioEdicion";
import { useAdmin } from "../context/AdminContext";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Modal from "../components/ui/Modal";
import "./Admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useContext(CartContext);

  const {
    productos,
    loading,
    open,
    setOpen,
    openEditor,
    setOpenEditor,
    setSeleccionado,
    eliminarProducto,
  } = useAdmin();

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem("isAuth");
    navigate("/");
  };

  const handleEliminar = (id) => {
    const confirmar = window.confirm("¿Estás seguro de que querés eliminar este producto?");
    if (confirmar) {
      eliminarProducto(id);
    }
  };


  return (
    <div className="admin-container">
      {loading ? (
        <p className="loading-text">Cargando productos...</p>
      ) : (
        <>
          <nav className="admin-nav">
            <ul className="admin-nav-list">
              <li>
                <button className="logout-button" onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i> Salir
                </button>
              </li>
              <li>
                <Link to="/admin" className="admin-link">Admin</Link>
              </li>
            </ul>
          </nav>

          <h1 className="admin-title">Panel Administrativo</h1>

          <ul className="admin-product-list">
            {productos.map((product) => (
              <li key={product.id} className="product-card">
                <img src={product.image} alt={product.title} className="product-img" />
                <h3>{product.title}</h3>
                <p><strong>${product.price}</strong></p>
                <div className="product-actions">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setOpenEditor(true);
                      setSeleccionado(product);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleEliminar(product.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <button className="add-btn" onClick={() => setOpen(true)}>
            + Agregar nuevo producto
          </button>
        </>
      )}

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <FormularioProducto />
        </Modal>
      )}

      {openEditor && (
        <Modal onClose={() => {
          setOpenEditor(false);
          setSeleccionado(null);
        }}>
          <FormularioEdicion />
        </Modal>
      )}
    </div>
  );
};

export default Admin;
