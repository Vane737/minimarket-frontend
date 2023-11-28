import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const CreateSale = () => {
  const navigate = useNavigate();

  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [customerId, setCustomerId] = useState(null);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [detalleVenta, setDetalleVenta] = useState([
    {
      productId: "",
      price: 0,
      quantity: 0,
      total: 0,
    },
  ]);

  useEffect(() => {
    obtenerClientes();
    obtenerProductos();
  }, []);

  const obtenerClientes = async () => {
    try {
      const response = await axios.get(
        "https://api-gateway-production-cbf6.up.railway.app/api/sale-microservice/customers"
      );
      setClientes(response.data);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    }
  };

  const obtenerProductos = async () => {
    try {
      const response = await axios.get(
        "https://api-gateway-production-cbf6.up.railway.app/api/inventory-microservice/products"
      );
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  const handleClienteChange = (selectedOption) => {
    setCustomerId(selectedOption?.value);
  };

  const handleProductoChange = (index, selectedOption) => {
    const selectedProductCode = selectedOption?.value;
    const selectedProduct = productos.find(
      (producto) => producto.code === selectedProductCode
    );

    const updatedDetalleVenta = detalleVenta.map((detalle, i) =>
      i === index
        ? {
            ...detalle,
            productId: selectedProductCode,
            price: selectedProduct?.price || 0,
            total: detalle.quantity * (selectedProduct?.price || 0),
          }
        : detalle
    );
    setDetalleVenta(updatedDetalleVenta);

    actualizarTotal(updatedDetalleVenta);
  };

  const handleQuantityChange = (index, e) => {
    const quantity = parseInt(e.target.value, 10);
    const selectedProduct = productos.find(
      (producto) => producto.code === detalleVenta[index].productId
    );

    const updatedDetalleVenta = detalleVenta.map((detalle, i) =>
      i === index
        ? {
            ...detalle,
            quantity,
            total: quantity * (selectedProduct?.price || 0),
          }
        : detalle
    );
    setDetalleVenta(updatedDetalleVenta);

    actualizarTotal(updatedDetalleVenta);
  };

  const handleAgregarProducto = () => {
    setDetalleVenta([
      ...detalleVenta,
      { productId: "", price: 0, quantity: 0, total: 0 },
    ]);
  };

  const handleEliminarProducto = (index) => {
    const updatedDetalleVenta = detalleVenta.filter((_, i) => i !== index);
    setDetalleVenta(updatedDetalleVenta);

    actualizarTotal(updatedDetalleVenta);
  };

  const actualizarTotal = (detalleVenta) => {
    const newTotal = detalleVenta.reduce(
      (acc, detalle) => acc + detalle.total,
      0
    );
    setTotal(newTotal);
  };

  const handleRegistrarVenta = async () => {
    console.log({ customerId, total, discount, details: detalleVenta });
    try {
      const response = await axios.post(
        "https://api-gateway-production-cbf6.up.railway.app/api/sale-microservice/sales",
        {
          customerId,
          total,
          discount,
          details: detalleVenta,
        }
      );
      navigate("/ventas");
      console.log("Venta registrada:", response.data);
    } catch (error) {
      console.error("Error al registrar la venta:", error);
    }
  };

  const clienteOptions = clientes.map((cliente) => ({
    value: cliente.id,
    label: cliente.name,
  }));

  const productoOptions = productos.map((producto) => ({
    value: producto.code,
    label: producto.name,
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Registrar Venta</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Cliente:
        </label>
        <Select
          options={clienteOptions}
          value={clienteOptions.find((option) => option.value === customerId)}
          onChange={handleClienteChange}
          isSearchable
        />
      </div>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">Producto</th>
            <th className="border px-4 py-2">Cantidad</th>
            <th className="border px-4 py-2">Precio</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          {detalleVenta.map((detalle, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">
                <Select
                  options={productoOptions}
                  value={productoOptions.find(
                    (option) => option.value === detalle.productId
                  )}
                  onChange={(selectedOption) =>
                    handleProductoChange(index, selectedOption)
                  }
                  isSearchable
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  min="1"
                  value={detalle.quantity}
                  onChange={(e) => handleQuantityChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </td>
              <td className="border px-4 py-2">{detalle.price}</td>
              <td className="border px-4 py-2">{detalle.total}</td>
              <td className="border px-4 py-2">
                <button
                  type="button"
                  onClick={() => handleEliminarProducto(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        onClick={handleAgregarProducto}
        className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
      >
        Agregar Producto
      </button>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-600">
          Total:
        </label>
        <input
          type="number"
          min="0"
          value={total}
          onChange={(e) => setTotal(parseInt(e.target.value, 10))}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-600">
          Descuento:
        </label>
        <input
          type="number"
          min="0"
          value={discount}
          onChange={(e) => setDiscount(parseInt(e.target.value, 10))}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mt-4">
        <button
          type="button"
          onClick={handleRegistrarVenta}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Registrar Venta
        </button>
      </div>
    </div>
  );
};

export default CreateSale;
