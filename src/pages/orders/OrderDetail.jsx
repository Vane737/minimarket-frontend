import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetail = () => {
    const { id } = useParams();
    const [orden, setOrden] = useState(null);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        obtenerOrden();
        obtenerProductos();
    }, []);

    const obtenerOrden = async () => {
        try {
            const respuesta = await axios.get(`https://api-gateway-production-cbf6.up.railway.app/api/order-microservice/orders/${id}`);
            setOrden(respuesta.data);
        } catch (error) {
            console.error('Error al obtener la orden:', error);
        }
    };

    const obtenerProductos = async () => {
        try {
            const respuesta = await axios.get('https://api-gateway-production-cbf6.up.railway.app/api/inventory-microservice/products');
            setProductos(respuesta.data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    const obtenerNombreProducto = (codigoProducto) => {
        const productoEncontrado = productos.find((producto) => producto.code === codigoProducto);
        return productoEncontrado ? productoEncontrado.name : 'Producto no encontrado';
    };

    if (!orden || !productos.length) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl mb-4">Detalles de la Orden</h1>
            <div className="mb-4">
                <strong>ID de Orden:</strong> {orden.id}
            </div>
            <div className="mb-4">
                <strong>Total:</strong> ${orden.total}
            </div>
            <div className="mb-4">
                <strong>Total de Cantidad Ordenada:</strong> {orden.qtyOrdered}
            </div>
            <div className="mb-4">
                <strong>Estado:</strong> {orden.status}
            </div>
            <div className="mb-4">
                <strong>Fecha de Solicitud:</strong> {orden.applicationDate}
            </div>
            <div className="mb-4">
                <strong>Fecha de Entrega:</strong> {orden.deliveryDate}
            </div>
            <div className="mb-4">
                <strong>Proveedor:</strong> {orden.supplier.name}
            </div>

            <h2 className="text-2xl mt-8 mb-4">Productos Ordenados</h2>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID de Producto</th>
                        <th className="border px-4 py-2">Nombre de Producto</th>
                        <th className="border px-4 py-2">Precio</th>
                        <th className="border px-4 py-2">Total</th>
                        <th className="border px-4 py-2">Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {orden.details.map((detalle) => (
                        <tr key={detalle.id}>
                            <td className="border px-4 py-2">{detalle.productId}</td>
                            <td className="border px-4 py-2">{obtenerNombreProducto(detalle.productId)}</td>
                            <td className="border px-4 py-2">${detalle.price}</td>
                            <td className="border px-4 py-2">${detalle.total}</td>
                            <td className="border px-4 py-2">{detalle.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mb-4 flex justify-end text-xl ">
                <div className='block border border-gray-400 px-7 rounded-md'>
                    <strong>Total:</strong> ${orden.total}
                </div>
            </div>
        </div>
    );
};
export default OrderDetail;