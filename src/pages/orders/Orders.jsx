import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Orders = () => {
    const [compras, setCompras] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        obtenerCompras(currentPage);
    }, [currentPage]);

    const obtenerCompras = async (page) => {
        try {
            const response = await axios.get(`https://api-gateway-production-cbf6.up.railway.app/api/order-microservice/orders?page=${page}`);
            setCompras(response.data.data);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error('Error al obtener las compras:', error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl mb-4">Listado de Compras</h1>
            <Link to="/compras/create">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Agregar Compra
                </button>
            </Link>
            <table className="w-full mt-8">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Id</th>
                        <th className="border px-4 py-2">Fecha de Solicitud</th>
                        <th className="border px-4 py-2">Fecha de Entrega</th>
                        <th className="border px-4 py-2">Estado</th>
                        <th className="border px-4 py-2">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {compras.map((compra) => (
                        <tr key={compra.id}>
                            <td className="border px-4 py-2">{compra.id}</td>
                            <td className="border px-4 py-2">{compra.applicationDate}</td>
                            <td className="border px-4 py-2">{compra.deliveryDate}</td>
                            <td className="border px-4 py-2">{compra.status}</td>
                            <td className="border px-4 py-2">
                                <Link to={`/ver/${compra.id}`}>
                                    <button className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600">
                                        Ver
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

export default Orders;
