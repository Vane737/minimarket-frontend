import { useEffect, useState } from "react";
import api from '../../api/gatewayApi';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function CreateEditProduct() {

  const { id } = useParams();
  const navigation = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [idCategoria, setIdCategoria] = useState("");
  const [producto, setProducto] = useState({
    brand: "",
    code: "",
    description: "",
    idCategory: "",
    name: "",
    price: 0,
    stock: 0,
    unitMeasurement: "",
  });
  // const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    if (id) {
      // Modo edición, cargar datos del producto por ID
      api
        .get(`/inventory-microservice/products/${id}`)
        .then((res) => {
          setProducto(res.data);
          setIdCategoria(res.data.category.id);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    api
    .get(`/inventory-microservice/categories`)
    .then((response) => {
      console.log(response.data);
      setCategorias(response.data);
      // setCategoria(response.data[0].id)
    })
    .catch((error) => {
      console.error('Error al obtener las categorias:', error);
    });
    
  }, [id]);
  
  const handleCancelar = () => {
    setProducto({});
    navigation('/productos')
  };
  
  const handleRegistrar = () => {
    if (id) {
      // Modo edición, hacer la solicitud para actualizar
      api
      .put(`/inventory-microservice/products/${id}`, producto)
      .then((res) => {
        console.log(res.data);
        setProducto({});
        navigation('/productos')
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      console.log(producto);
      if (producto.idCategory === "") {
        console.log("Debe seleccionar una categoria");
      } else {
        // Modo registro, hacer la solicitud para crear
        api
          .post(`/inventory-microservice/products`, producto)
          .then((res) => {
              console.log(res.data);
              setProducto({});
              navigation('/productos');
            })
            .catch((err) => {
                console.log("Error!!", err);
              });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  return (
    <div className="container mx-auto p-12">
      <form className="mb-4">
        <h1 className="text-3xl mb-4">Producto</h1>
        <div className="flex space-x-4">
          <div className="flex-1 mb-2">
            <label className="block text-sm font-medium text-gray-600">Categoría:</label>
            <select
              // value={categoria}
              name="idCategory"
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id} defaultValue={id ? categoria.id === idCategoria : false} >
                  {categoria.name}
                </option>
              ))}
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
              name="code"
              value={producto.code}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="flex-1 mb-2">
            <label className="block text-sm font-medium text-gray-600">Marca:</label>
            <input
              type="text"
              name="brand"
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