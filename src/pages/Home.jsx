import {
  BadgeDelta,
  Card,
  Flex,
  Grid,
  Metric,
  ProgressBar,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
} from "@tremor/react";
import { useState, useEffect } from "react";
import axios from "axios";
import LastSales from "../components/LastSales";
import BestSellerProducts from "../components/BestSellerProductos";
import { RevenueChart } from "../components/RevenueChart";

const Home = () => {
  const [leadTime, setLeadTime] = useState();
  const [totalRevenue, setTotalRevenue] = useState();
  const [averageTotalRevenue, setAveraageTotalRevenue] = useState();
  const [totalCustomers, setTotalCustomers] = useState();
  const [percentCustomers, setPercentCustomers] = useState();

  useEffect(() => {
    getLeadTimeAverage();
    getTotalRevenueSales();
    getTotalCustomers();
  }, [averageTotalRevenue, percentCustomers]);

  const getLeadTimeAverage = async () => {
    try {
      const response = await axios.get('https://api-gateway-production-cbf6.up.railway.app/api/order-microservice/order/supplier-delivery-time-average');
      console.log(response)
      const promedioTiempoCicloCompras = parseFloat(response.data.promedio_tiempo_ciclo_compras).toFixed(2);
      setLeadTime(promedioTiempoCicloCompras);
    } catch (error) {
      console.error('Error al obtener el dato:', error);
    }
  };

  const getTotalRevenueSales = async () => {
    try {
      const response = await axios.post('https://api-gateway-production-cbf6.up.railway.app/api/sale-microservice/total-revenue');
      console.log(response)
      setTotalRevenue(response.data[0].total);
      setAveraageTotalRevenue((totalRevenue * 100) / 300000);
    } catch (error) {
      console.error('Error al obtener el dato:', error);
    }
  };

  const getTotalCustomers = async () => {
    try {
      const response = await axios.post('https://api-gateway-production-cbf6.up.railway.app/api/sale-microservice/customers/total');
      console.log(response)
      setTotalCustomers(response.data[0].count);
      setPercentCustomers((totalCustomers * 100) / 400);
    } catch (error) {
      console.error('Error al obtener el dato:', error);
    }
  };

  return (
    <div>
      <TabGroup className="mt-6">
        <TabList>
          <Tab>General</Tab>
          <Tab>Ventas</Tab>
          <Tab>Productos</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
              <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
                <Flex alignItems="start">
                  <div className="truncate">
                    <Text>Tiempo de Entrega Promedio </Text>
                    <Metric className="truncate">{leadTime} días</Metric>
                  </div>
                  <BadgeDelta deltaType="moderateIncrease"></BadgeDelta>
                </Flex>
              </Card>
              <Card className="max-w-xs mx-auto" decoration="top" decorationColor="yellow">
                <Flex alignItems="start">
                  <div className="truncate">
                    <Text>Ventas</Text>
                    <Metric className="truncate">Bs.- {totalRevenue}</Metric>
                  </div>
                  <BadgeDelta deltaType="increase"></BadgeDelta>
                </Flex>
                <Flex className="mt-4 space-x-2">
                  <Text className="truncate">{`${averageTotalRevenue}% (${totalRevenue})`}</Text>
                  <Text className="truncate">Bs.-300,000</Text>
                </Flex>
                <ProgressBar value={averageTotalRevenue} className="mt-2" />
              </Card>
              <Card className="max-w-xs mx-auto" decoration="top" decorationColor="green">
                <Flex alignItems="start">
                  <div className="truncate">
                    <Text>Clientes</Text>
                    <Metric className="truncate">{totalCustomers}</Metric>
                  </div>
                  <BadgeDelta deltaType="moderateDecrease"></BadgeDelta>
                </Flex>
                <Flex className="mt-4 space-x-2">
                  <Text className="truncate">{`${percentCustomers}% (${totalCustomers})`}</Text>
                  <Text className="truncate">400</Text>
                </Flex>
                <ProgressBar value={percentCustomers} className="mt-2" />
              </Card>
            </Grid>
            <div className="mt-6">
              <RevenueChart />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">
              <LastSales />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">
              <BestSellerProducts />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default Home;