import { useState, useEffect } from 'react';
import api from '../../api/gatewayApi';
import { Link } from 'react-router-dom';

const Products = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await api.get('/inventory-microservice/products');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await api.delete(`inventory-microservice/products/${id}`);
      obtenerProductos();
    } catch (error) {
      console.error('Error al eliminar un producto:', error);
    }
  };

  return (
    <div className="container mx-auto p-12">
      <h1 className="text-3xl mb-4">Productos</h1>
      <Link to="/productos/create">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Agregar Producto
        </button>
      </Link>
      <table className="min-w-full bg-white border border-gray-300 my-8">
        <thead>
          <tr>
            <th className="py-2 px-0 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Marca</th>
            <th className="py-2 px-4 border-b">Precio</th>
            <th className="py-2 px-4 border-b">Stock</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td className="py-2 px-4 border-b">{producto.name}</td>
              <td className="py-2 px-4 border-b">{producto.brand}</td>
              <td className="py-2 px-4 border-b">{producto.price}</td>
              <td className="py-2 px-4 border-b">{producto.stock}</td>
              <td className="py-2 px-4 border-b block">
                <Link to={`/productos/${producto.id}`}
                  type="button"
                  className="text-blue-500 px-3 pt-3 rounded-md hover:text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </Link>
                <Link to={`/productos/edit/${producto.id}`}
                  type="button"
                  className="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                  </svg>
                </Link>
                <button
                  type="button"
                  onClick={() => eliminarProducto(producto.id)}
                  className="ml-2  text-red-500 px-2 py-1 rounded-md hover:text-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Products;