import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const CreateOrder = () => {
    const navigate = useNavigate();

    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [supplierId, setSupplierId] = useState(null);
    const [total, setTotal] = useState(0);
    const [deliveryDate, setDeliveryDate] = useState(''); // Nueva fecha de entrega
    const [status, setStatus] = useState(''); // Nuevo estado
    const [userId, setUserId] = useState(1); // Puedes obtenerlo de la sesión o ajustar según necesidades
    const [details, setDetails] = useState([
        {
            product_id: '',
            quantity: 0,
            price: 0,
        },
    ]);

    useEffect(() => {
        obtenerProveedores();
        obtenerProductos();
    }, []);

    const obtenerProveedores = async () => {
        try {
            const response = await axios.get('https://api-gateway-production-cbf6.up.railway.app/api/order-microservice/suppliers');
            setSuppliers(response.data);
        } catch (error) {
            console.error('Error al obtener los proveedores:', error);
        }
    };

    const obtenerProductos = async () => {
        try {
            const response = await axios.get('https://api-gateway-production-cbf6.up.railway.app/api/inventory-microservice/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    const handleSupplierChange = (selectedOption) => {
        setSupplierId(selectedOption?.value);
    };

    const handleProductChange = (index, selectedOption) => {
        const selectedProductCode = selectedOption?.value;
        const selectedProduct = products.find((product) => product.code === selectedProductCode);

        const updatedDetails = details.map((detail, i) =>
            i === index
                ? {
                    ...detail,
                    product_id: selectedProductCode,
                    price: selectedProduct?.price || 0,
                }
                : detail
        );
        setDetails(updatedDetails);

        actualizarTotal(updatedDetails);
    };

    const handleQuantityChange = (index, e) => {
        const quantity = parseInt(e.target.value, 10);
        const selectedProduct = products.find((product) => product.code === details[index].product_id);

        const updatedDetails = details.map((detail, i) =>
            i === index
                ? {
                    ...detail,
                    quantity,
                }
                : detail
        );
        setDetails(updatedDetails);

        actualizarTotal(updatedDetails);
    };

    const handleAddProduct = () => {
        setDetails([
            ...details,
            { product_id: '', quantity: 0, price: 0 },
        ]);
    };

    const handleRemoveProduct = (index) => {
        const updatedDetails = details.filter((_, i) => i !== index);
        setDetails(updatedDetails);

        actualizarTotal(updatedDetails);
    };

    const actualizarTotal = (details) => {
        const newTotal = details.reduce((acc, detail) => acc + detail.price * detail.quantity, 0);
        setTotal(newTotal);
    };

    const handleCreateOrder = async () => {
        console.log({ deliveryDate, status, userId, supplierId, total, details });
        try {
            const response = await axios.post('https://api-gateway-production-cbf6.up.railway.app/api/order-microservice/orders', {
                deliveryDate,
                status,
                userId,
                supplierId,
                details,
            });
            navigate('/compras');
            console.log('Orden creada:', response.data);
        } catch (error) {
            console.error('Error al crear la orden:', error);
        }
    };

    const supplierOptions = suppliers.map((supplier) => ({
        value: supplier.id,
        label: supplier.name,
    }));

    const productOptions = products.map((product) => ({
        value: product.code,
        label: product.name,
    }));

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl mb-4">Crear Orden</h1>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Proveedor:</label>
                <Select
                    options={supplierOptions}
                    value={supplierOptions.find((option) => option.value === supplierId)}
                    onChange={handleSupplierChange}
                    isSearchable
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Fecha de Entrega:</label>
                <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Estado:</label>
                <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>
            <table className="w-full mb-4">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Producto</th>
                        <th className="border px-4 py-2">Cantidad</th>
                        <th className="border px-4 py-2">Precio</th>
                        <th className="border px-4 py-2">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {details.map((detail, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">
                                <Select
                                    options={productOptions}
                                    value={productOptions.find((option) => option.value === detail.product_id)}
                                    onChange={(selectedOption) => handleProductChange(index, selectedOption)}
                                    isSearchable
                                />
                            </td>
                            <td className="border px-4 py-2">
                                <input
                                    type="number"
                                    min="1"
                                    value={detail.quantity}
                                    onChange={(e) => handleQuantityChange(index, e)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </td>
                            <td className="border px-4 py-2">{detail.price}</td>
                            <td className="border px-4 py-2">
                                <button
                                    type="button"
                                    onClick={() => handleRemoveProduct(index)}
                                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                type="button"
                onClick={handleAddProduct}
                className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
            >
                Agregar Producto
            </button>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600">Total:</label>
                <input
                    type="number"
                    min="0"
                    value={total}
                    onChange={(e) => setTotal(parseFloat(e.target.value))}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>
            <div className="mt-4">
                <button
                    type="button"
                    onClick={handleCreateOrder}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                    Crear Orden
                </button>
            </div>
        </div>
    );
};

export default CreateOrder;
