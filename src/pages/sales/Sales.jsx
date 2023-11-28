import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Sales = () => {
    const [ventas, setVentas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        obtenerVentas(currentPage);
    }, [currentPage]);

    const obtenerVentas = async (page) => {
        try {
            const response = await axios.get(`https://api-gateway-production-cbf6.up.railway.app/api/sale-microservice/sales?page=${page}`);
            setVentas(response.data);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error('Error al obtener las ventas:', error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl mb-4">Listado de Ventas</h1>
            <Link to="/ventas/create">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Agregar Venta
                </button>
            </Link>
            <table className="w-full mt-8">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Id</th>
                        <th className="border px-4 py-2">Fecha de Creación</th>
                        <th className="border px-4 py-2">Cliente</th>
                        <th className="border px-4 py-2">Total</th>
                        <th className="border px-4 py-2">Descuento</th>
                        <th className="border px-4 py-2">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta) => (
                        <tr key={venta.id}>
                            <td className="border px-4 py-2">{venta.id}</td>
                            <td className="border px-4 py-2">{venta.createdAt}</td>
                            <td className="border px-4 py-2">{venta.customer.name}</td>
                            <td className="border px-4 py-2">{venta.total}</td>
                            <td className="border px-4 py-2">{venta.discount}</td>
                            <td className="border px-4 py-2">
                                <Link to={`/ventas/details/${venta.id}`}>
                                    <button className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600">
                                        Ver Detalles
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Controles de paginación */}
            <div>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>

                {/* Renderiza los números de página o controles adicionales aquí */}
                {Array.from({ length: lastPage }, (_, index) => (
                    <button key={index + 1} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>
                        {index + 1}
                    </button>
                ))}

                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === lastPage}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Sales;