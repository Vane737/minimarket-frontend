import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SaleDetails = () => {
    const { id } = useParams();
    const [venta, setVenta] = useState(null);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        obtenerVenta();
        obtenerProductos();
    }, []);

    const obtenerVenta = async () => {
        try {
            const response = await axios.get(`https://api-gateway-production-cbf6.up.railway.app/api/sale-microservice/sales/${id}`);
            setVenta(response.data);
        } catch (error) {
            console.error('Error al obtener la venta:', error);
        }
    };

    const obtenerProductos = async () => {
        try {
            // const response = await axios.get('http://localhost:8080/api/v1/products');
            const response = await axios.get('https://api-gateway-production-cbf6.up.railway.app/api/inventory-microservice/products');
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    const obtenerNombreProducto = (codeProduct) => {
        const productoEncontrado = productos.find((producto) => producto.code === codeProduct);
        return productoEncontrado ? productoEncontrado.name : 'Producto no encontrado';
    };

    if (!venta || !productos.length) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl mb-4">Detalles de Venta</h1>
             <div className="mb-4">
                 <strong>ID:</strong> {venta.id}
             </div>
             <div className="mb-4">
                 <strong>Fecha de Creación:</strong> {venta.createdAt}
             </div>
             <div className="mb-4">
                 <strong>Cliente:</strong> {venta.customer.name}
             </div>
             <div className="mb-4">
                 <strong>Descuento:</strong> {venta.discount}
             </div>
            <h2 className="text-2xl mt-8 mb-4">Detalles de Productos</h2>
            <table className="w-full">
                <thead>
                    <tr>
                        {/* Resto de las columnas */} 
                        <th className="border px-4 py-2">ID</th>
                         <th className="border px-4 py-2">Código de Producto</th>
                        <th className="border px-4 py-2">Nombre del Producto</th>
                         <th className="border px-4 py-2">Precio</th>
                         <th className="border px-4 py-2">Total</th>
                         <th className="border px-4 py-2">Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {venta.saleDetail.map((detalle) => (
                        <tr key={detalle.id}>
                            {/* Resto de las celdas */}
                            <td className="border px-4 py-2">{detalle.id}</td>
                            <td className="border px-4 py-2">{detalle.codeProduct}</td>
                            <td className="border px-4 py-2">{obtenerNombreProducto(detalle.codeProduct)}</td>
                            <td className="border px-4 py-2">{detalle.price}</td>
                            <td className="border px-4 py-2">{detalle.total}</td>
                            <td className="border px-4 py-2">{detalle.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
             <div className="mb-4 flex justify-end text-xl ">
                 
                 <div className='block border- border-gray-400 px-7 rounded-md'>
                    <strong>Total:</strong> {venta.total}

                 </div>
             </div>
        </div>
    );
};

export default SaleDetails;
