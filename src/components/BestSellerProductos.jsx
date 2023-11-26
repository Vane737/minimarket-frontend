import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Flex, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from '@tremor/react';

const BestSellerProducts = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getLastSales();
    }, []);

    const getLastSales = async () => {
        try {
            const response = await axios.post(`https://api-gateway-production-cbf6.up.railway.app/api/sale-microservice/sales/best-seller`);

            setData(response.data);
            console.log(data);
        } catch (error) {
            console.error('Error al obtener las compras:', error);
        }
    };

    return (
        <div>
            <Card>
                <>
                    <div>
                        <Flex className="space-x-0.5" justifyContent="start" alignItems="center">
                            <Title> Productos más vendidos </Title>
                        </Flex>
                    </div>
                    <Table className="mt-6">
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>Cod. Producto</TableHeaderCell>
                                <TableHeaderCell className="text-right">Cantidad (U)</TableHeaderCell>
                                <TableHeaderCell className="text-right">Clientes </TableHeaderCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.producto_id}>
                                    <TableCell>{item.producto_id}</TableCell>
                                    <TableCell className="text-right">{item.cantidad_vendida}</TableCell>
                                    <TableCell className="text-right">{item.clientes_que_compraron}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </>
            </Card>
        </div>
    );
};

export default BestSellerProducts;
