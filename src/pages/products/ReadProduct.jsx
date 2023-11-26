import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/gatewayApi";

export default function ReadProduct() {
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  const [categoria, setCategoria] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`inventory-microservice/products/${id}`);
        setProducto(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="container mx-auto p-12">
      <div className="max-w-lg mx-auto bg-white rounded-md overflow-hidden shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{producto.name}</h2>
          <div className="mb-4">
            <p className="text-gray-700"><strong>Descripción:</strong> {producto.description}</p>
            <p className="text-gray-700"><strong>Código:</strong> {producto.code}</p>
            <p className="text-gray-700"><strong>Marca:</strong> {producto.brand}</p>
            <p className="text-gray-700"><strong>Unidad de Medida:</strong> {producto.unitMeasurement}</p>
            <p className="text-gray-700"><strong>Precio:</strong> ${producto.price}</p>
            <p className="text-gray-700"><strong>Stock:</strong> {producto.stock}</p>
            {/* <p className="text-gray-700"><strong>Categoría:</strong> {producto.category.name}</p> */}
          </div>
          <div className="flex justify-end">
            <Link to={`/productos/edit/${producto.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Editar
            </Link>
            <button className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}