import { useEffect, useState } from "react";
import api from '../../api/gatewayApi';
import { Link } from 'react-router-dom';

export default function CreateEditProduct() {
  const [categoria, setCategoria] = useState({ name: '', description: '' });
  const [categorias, setCategorias] = useState([]);
  const [producto, setProducto] = useState({});
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    api
      .get(`/inventory-microservice/categories`)
      .then((res) => {
        setCategorias(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCancelar = () => {
    setProducto({});
  };

  const handleRegistrar = () => {
    api
      .post(`/inventory-microservice/products`, producto)
      .then((res) => {
        console.log(res.data);
        setProducto({});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoria({ ...categoria, [name]: value });
  };

  return (
    <div className="container mx-auto p-12">
      <form className="mb-4">
        <h1 className="text-3xl mb-4">Categorias</h1>
        <div className="flex space-x-4">
          <div className="flex-1 mb-2">
            <label className="block text-sm font-medium text-gray-600">Categoría:</label>
            <select
              name="idCategory"
              value={categoria.categoria} // Ajusta esto según la estructura de tu objeto de categoría
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              {categorias.map((categoria, id) => {
                return (
                  <option key={id} value={categoria.id}>{categoria.name}</option>
                )
              })}
            </select>
          </div>
          <div className="flex-1 mb-2">
            <label className="block text-sm font-medium text-gray-600">Nombre:</label>
            <input
              type="text"
              name="name"
              value={producto.name}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1 mb-2">
            <label className="block text-sm font-medium text-gray-600">Descripcion:</label>
            <input
              type="text"
              name="description"
              value={producto.description}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

        </div>
        <div className="flex space-x-4">
          <div className="flex-1 mb-2">
            <label className="block text-sm font-medium text-gray-600">Codigo:</label>
            <input
              type="text"
              name="name"
              value={producto.code}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="flex-1 mb-2">
            <label className="block text-sm font-medium text-gray-600">Marca:</label>
            <input
              type="text"
              name="description"
              value={producto.brand}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="flex-1 mb-2">
            <label className="block text-sm font-medium text-gray-600">Medida:</label>
            <input
              type="text"
              name="unitMeasurement"
              value={producto.unitMeasurement}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1 mb-2">
            <label className="block text-sm font-medium text-gray-600">Precio:</label>
            <input
              type="text"
              name="price"
              value={producto.price}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="flex-1 mb-2">
            <label className="block text-sm font-medium text-gray-600">Stock:</label>
            <input
              type="text"
              name="stock"
              value={producto.stock}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Link to={'/productos'}
            type="button"
            onClick={handleCancelar}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
          >
            Cancelar
          </Link>
          <button
            type="button"
            onClick={handleRegistrar}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}