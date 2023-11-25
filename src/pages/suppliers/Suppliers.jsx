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
        <div className="container mx-auto p-12">
            <form className="mb-4">
                <h1 className="text-3xl mb-4">Proveedores</h1>
                <div className="flex space-x-4">
                    <div className="flex-1 mb-2">
                        <label className="block text-sm font-medium text-gray-600">Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            value={proveedor.name}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div className="flex-1 mb-2">
                        <label className="block text-sm font-medium text-gray-600">Correo electrónico:</label>
                        <input
                            type="text"
                            name="email"
                            value={proveedor.email}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                </div>
                <div className="flex space-x-4">
                    <div className="flex-1 mb-2">
                        <label className="block text-sm font-medium text-gray-600">Teléfono:</label>
                        <input
                            type="text"
                            name="cellphone"
                            value={proveedor.cellphone}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div className="flex-1 mb-2">
                        <label className="block text-sm font-medium text-gray-600">Compañía/Empresa:</label>
                        <input
                            type="text"
                            name="company"
                            value={proveedor.company}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
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

            <table className="min-w-full bg-white border border-gray-300 mb-8">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Compañía/Empresa</th>
                        <th className="py-2 px-4 border-b">Correo Electrónico</th>
                        <th className="py-2 px-4 border-b">Teléfono</th>                       
                        <th className="py-2 px-4 border-b">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {proveedores.map((proveedor) => (
                        <tr key={proveedor.id}>
                            <td className="py-2 px-4 border-b">{proveedor.company}</td>
                            <td className="py-2 px-4 border-b">{proveedor.email}</td>
                            <td className="py-2 px-4 border-b">{proveedor.cellphone}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    type="button"
                                    onClick={() => seleccionarProveedor(proveedor)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Suppliers;
