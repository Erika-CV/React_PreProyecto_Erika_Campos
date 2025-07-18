import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Button } from "react-bootstrap";

const DetallesProducto = () => {
  const { id } = useParams();
  const { getProductoPorId, handleAddToCart } = useContext(CartContext);

  const producto = getProductoPorId(id);

  if (!producto) {
    return (
      <div className="text-center mt-5">
        <h3>Producto no encontrado 😕</h3>
      </div>
    );
  }

  const productoConCantidad = { ...producto, quantity: 1 };

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6 text-center">
          <img
            src={producto.image}
            alt={producto.title}
            className="img-fluid rounded"
            style={{ maxHeight: "400px" }}
          />
        </div>
        <div className="col-md-6">
          <h2>{producto.title}</h2>
          <p>{producto.description}</p>
          <h4 className="text-success">${producto.price}</h4>
          <Button
            variant="primary"
            onClick={() => handleAddToCart(productoConCantidad)}
          >
            Agregar al carrito
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetallesProducto;
