import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BadgeDelta, Card, Flex, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from '@tremor/react';

const LastSales = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getLastSales();
    }, []);

    const getLastSales = async () => {
        try {
            const response = await axios.post(`https://api-gateway-production-cbf6.up.railway.app/api/sale-microservice/last-sales`);

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
                            <Title> Últimas Ventas </Title>
                        </Flex>
                    </div>
                    <Table className="mt-6">
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>Cliente</TableHeaderCell>
                                <TableHeaderCell className="text-right">Total Venta (Bs.-)</TableHeaderCell>
                                <TableHeaderCell className="text-right">Cantidad (U)</TableHeaderCell>
                                <TableHeaderCell className="text-right">Fecha </TableHeaderCell>
                                <TableHeaderCell className="text-right">Status</TableHeaderCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.sale_id}>
                                    <TableCell>{item.nombre_cliente}</TableCell>
                                    <TableCell className="text-right">{item.total_comprado}</TableCell>
                                    <TableCell className="text-right">{item.cantidad_items_comprados}</TableCell>
                                    <TableCell className="text-right">{item.fecha_venta}</TableCell>
                                    <TableCell className="text-right">
                                        <BadgeDelta deltaType="increase" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </>
            </Card>
        </div>
    );
};

export default LastSales;
