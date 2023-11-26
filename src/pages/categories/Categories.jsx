import React, { useState, useEffect } from 'react';
import api from '../../api/gatewayApi';

const Categories = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState({ name: '', description: '' });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const obtenerCategorias = async () => {
    try {
      const response = await api.get('/inventory-microservice/categories');
      setCategorias(response.data);
    } catch (error) {
      console.error('Error al obtener las categorias:', error);
    }
  };

  const agregarCategoria = async () => {
    try {
      await api.post('/inventory-microservice/categories', categoria);
      obtenerCategorias();
      limpiarFormulario();
    } catch (error) {
      console.error('Error al agregar una categoria:', error);
    }
  };

  const editarCategoria = async () => {
    try {
      await api.put(`/inventory-microservice/categories/${idEditando}`, categoria);
      obtenerCategorias();
      limpiarFormulario();
      setModoEdicion(false);
    } catch (error) {
      console.error('Error al editar el proveedor:', error);
    }
  };

  const eliminarCategoria = async (id) => {
    try {
      await api.delete(`inventory-microservice/categories/${id}`);
      obtenerCategorias();
    } catch (error) {
      console.error('Error al eliminar una categoria:', error);
    }
  };

  const limpiarFormulario = () => {
    setCategoria({ name: '', description: '' });
    setIdEditando(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoria({ ...categoria, [name]: value });
  };
  

  const seleccionarCategoria = (categoria) => {
    setCategoria(categoria);
    setIdEditando(categoria.id);
    setModoEdicion(true);
  };

  return (
    <div className="container mx-auto p-12">
      <form className="mb-4">
        <h1 className="text-3xl mb-4">Categorias</h1>
        <div className="flex space-x-4">
          <div className="flex-1 mb-2">
            <label className="block text-sm font-medium text-gray-600">Nombre:</label>
            <input
              type="text"
              name="name"
              value={categoria.name}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="flex-1 mb-2">
            <label className="block text-sm font-medium text-gray-600">Descripcion:</label>
            <input
              type="text"
              name="description"
              value={categoria.description}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>
        <div className="flex space-x-2">
          {modoEdicion ? (
            <button
              type="button"
              onClick={editarCategoria}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Editar Categoria
            </button>
          ) : (
            <button
              type="button"
              onClick={agregarCategoria}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Agregar Categoria
            </button>
          )}
          <button
            type="button"
            onClick={limpiarFormulario}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Limpiar Formulario
          </button>
        </div>
      </form>

      <table className="min-w-full bg-white border border-gray-300 mb-8">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Descripcion</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td className="py-2 px-4 border-b">{categoria.name}</td>
              <td className="py-2 px-4 border-b">{categoria.description}</td>
              <td className="py-2 px-4 border-b">
                <button
                  type="button"
                  onClick={() => seleccionarCategoria(categoria)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => eliminarCategoria(categoria.id)}
                  className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Categories;