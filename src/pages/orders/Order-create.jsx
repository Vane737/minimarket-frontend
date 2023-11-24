import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const OrderForm = () => {
  const [compra, setCompra] = useState({ fechaEntrega: '', proveedorId: '' });
  const [productos, setProductos] = useState([]);
  const [productoNuevo, setProductoNuevo] = useState({ productoId: '', cantidad: 0 });
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    obtenerProductos();
    obtenerProveedores();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get('URL_DE_TU_API/productos');
      setProductosDisponibles(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  const obtenerProveedores = async () => {
    try {
      const response = await axios.get('URL_DE_TU_API/proveedores');
      setProveedores(response.data);
    } catch (error) {
      console.error('Error al obtener los proveedores:', error);
    }
  };

  const agregarProducto = () => {
    setProductos([...productos, { ...productoNuevo }]);
    setProductoNuevo({ productoId: '', cantidad: 0 });
  };

  const agregarCompra = async () => {
    try {
      // Lógica para agregar la compra junto con los productos
      await axios.post('URL_DE_TU_API/compras', { ...compra, productos });
      // Puedes redirigir a la página de listado después de agregar la compra si es necesario
      // history.push('/listado');
    } catch (error) {
      console.error('Error al agregar la compra:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompra({ ...compra, [name]: value });
  };

  const handleProductoChange = (e) => {
    const { name, value } = e.target;
    setProductoNuevo({ ...productoNuevo, [name]: value });
  };

  return (
    <div className="container mx-auto p-12">
      <form className="mb-4">
        <h1 className="text-3xl mb-4">Registrar Compra</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="mb-4">
              <label htmlFor="fechaEntrega" className="block text-sm font-medium text-gray-600">
                Fecha de Entrega:
              </label>
              <input
                type="date"
                id="fechaEntrega"
                name="fechaEntrega"
                value={compra.fechaEntrega}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="proveedorId" className="block text-sm font-medium text-gray-600">
                Proveedor:
              </label>
              <select
                id="proveedorId"
                name="proveedorId"
                value={compra.proveedorId}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="" disabled>
                  Seleccionar Proveedor
                </option>
                {proveedores.map((proveedor) => (
                  <option key={proveedor.id} value={proveedor.id}>
                    {proveedor.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-md">
              <h2 className="text-lg font-semibold mb-2">Resumen de Compra</h2>
              <div className="mb-2">
                <strong>Total:</strong> 
              </div>
              <div>
                <strong>Estado:</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1 mb-4">
            <label htmlFor="productoId" className="block text-sm font-medium text-gray-600">
              Producto:
            </label>
            <select
              id="productoId"
              name="productoId"
              value={productoNuevo.productoId}
              onChange={handleProductoChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="" disabled>
                Seleccionar Producto
              </option>
              {productosDisponibles.map((producto) => (
                <option key={producto.id} value={producto.id}>
                  {producto.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 mb-4">
            <label htmlFor="cantidad" className="block text-sm font-medium text-gray-600">
              Cantidad:
            </label>
            <input
              type="number"
              id="cantidad"
              name="cantidad"
              value={productoNuevo.cantidad}
              onChange={handleProductoChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="flex-1 mb-4">
            <label htmlFor="total" className="block text-sm font-medium text-gray-600">
              Total:
            </label>
            <input
              type="text"
              id="total"
              name="total"
              value={productoNuevo.cantidad}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              readOnly
            />
          </div>
        </div>

        {productos.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Productos Agregados</h2>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Producto</th>
                  <th className="py-2 px-4 border-b">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{producto.productoId}</td>
                    <td className="py-2 px-4 border-b">{producto.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex space-x-2 mb-4">
          <button
            type="button"
            onClick={agregarProducto}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Agregar Producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
