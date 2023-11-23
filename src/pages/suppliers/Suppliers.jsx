import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Suppliers = () => {
    const [proveedores, setProveedores] = useState([]);
    const [proveedor, setProveedor] = useState({ name: '', email: '', cellphone: '', company: '' });
    const [modoEdicion, setModoEdicion] = useState(false);
    const [idEditando, setIdEditando] = useState(null);

    useEffect(() => {
        obtenerProveedores();
    }, []);

    const obtenerProveedores = async () => {
        try {
            const response = await axios.get('http://3.135.147.220/api/suppliers/');
            setProveedores(response.data);
        } catch (error) {
            console.error('Error al obtener los proveedores:', error);
        }
    };

    const agregarProveedor = async () => {
        try {
            await axios.post('http://3.135.147.220/api/suppliers/', proveedor);
            obtenerProveedores();
            limpiarFormulario();
        } catch (error) {
            console.error('Error al agregar el proveedor:', error);
        }
    };

    const editarProveedor = async () => {
        try {
            await axios.put(`http://3.135.147.220/api/suppliers/${idEditando}`, proveedor);
            obtenerProveedores();
            limpiarFormulario();
            setModoEdicion(false);
        } catch (error) {
            console.error('Error al editar el proveedor:', error);
        }
    };

    const eliminarProveedor = async (id) => {
        try {
            await axios.delete(`http://3.135.147.220/api/suppliers/${id}`);
            obtenerProveedores();
        } catch (error) {
            console.error('Error al eliminar el proveedor:', error);
        }
    };

    const limpiarFormulario = () => {
        setProveedor({ name: '', email: '', cellphone: '', company: '' });
        setIdEditando(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProveedor({ ...proveedor, [name]: value });
    };

    const seleccionarProveedor = (proveedor) => {
        setProveedor(proveedor);
        setIdEditando(proveedor.id);
        setModoEdicion(true);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Proveedores</h1>
            <form className="mb-4">
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-600">Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={proveedor.name}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-600">Correo electrónico:</label>
                    <input
                        type="text"
                        name="email"
                        value={proveedor.email}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-600">Teléfono:</label>
                    <input
                        type="text"
                        name="cellphone"
                        value={proveedor.cellphone}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-600">Compañía/Empresa:</label>
                    <input
                        type="text"
                        name="company"
                        value={proveedor.company}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="flex space-x-2">
                    {modoEdicion ? (
                        <button
                            type="button"
                            onClick={editarProveedor}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Editar Proveedor
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={agregarProveedor}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                            Agregar Proveedor
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

            <ul>
                {proveedores.map((proveedor) => (
                    <li key={proveedor.id} className="mb-2 bg-gray-100 p-2 rounded-md">
                        {proveedor.nombre} - {proveedor.direccion} - {proveedor.telefono}
                        <button
                            type="button"
                            onClick={() => seleccionarProveedor(proveedor)}
                            className="ml-2 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                        >
                            Editar
                        </button>
                        <button
                            type="button"
                            onClick={() => eliminarProveedor(proveedor.id)}
                            className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Suppliers;
