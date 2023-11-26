import { Card, LineChart, Title } from "@tremor/react";
import { useState, useEffect } from "react";
import axios from "axios";

export const RevenueChart = () => {
    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(2023);

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
        console.log('year', selectedYear)
    };

    const meses = [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ];

    useEffect(() => {
        getSalesPerYear(selectedYear);
    }, [selectedYear]);

    const getSalesPerYear = async (year) => {
        try {
            const response = await axios.post(`https://api-gateway-production-cbf6.up.railway.app/api/sale-microservice/sales/income-per-year?startYear=${year}`);
            setData(response.data);
            console.log('response totales', response)
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    const chartdata = data.map(item => ({
        date: `${meses[item.month]} - ${item.year}`,
        "Total": item.total_revenue,
    }));

    console.log('chart', chartdata)
    return (
        <>
            <Card>
                <div className="flex items-center justify-between">
                    <Title>Ingresos Totales - {selectedYear} </Title>
                    <div className="flex items-center">
                        <label className="mr-2">Selecciona el año:</label>
                        <select value={selectedYear} onChange={handleYearChange}>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                        </select>
                    </div>
                </div>
                <LineChart
                    className="h-72 mt-4"
                    data={chartdata}
                    index="date"
                    categories={["Total"]}
                    colors={["blue"]}
                    yAxisWidth={30}
                />
            </Card>
        </>
    );
};