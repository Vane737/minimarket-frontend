// import React from "react";

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SideBar from './components/SideBar';
import Navbar from './components/NavBar';
import Products from './pages/products/Products';
import Categories from './pages/categories/Categories';
import Suppliers from './pages/suppliers/Suppliers';
import Orders from './pages/orders/Orders';
import CreateEditProduct from './pages/products/CreateEditProduct';
import ReadProduct from './pages/products/ReadProduct';
import Sales from './pages/sales/Sales';
import SaleDetails from './pages/sales/SaleDetail';
import CreateSale from './pages/sales/CreateSale';
import OrderDetail from './pages/orders/OrderDetail';
import CreateOrder from './pages/orders/CreateOrder';

const App = () => {
  return (
    <div className=''>
      <BrowserRouter>
        <div className='flex'>
          <div className='basis-[12%] h-[100vh] border'>
            <SideBar />
          </div>
          <div className='basis-[88%] border overflow-y-auto'>
            <Navbar />
            <div className='p-4'>
              <Routes>       
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/productos'>
                  <Route index element={<Products />} />
                  <Route path='create' element={<CreateEditProduct />} />
                  <Route path='edit/:id' element={<CreateEditProduct />} />
                  <Route path=':id' element={<ReadProduct />} />
                </Route>
                <Route path='/categorias'>
                  <Route index element={<Categories />} />
                  <Route path='create' element={<Home />} />
                  <Route path='edit' element={<Home />} />
                  <Route path=':id' element={<Home />} />
                </Route>
                <Route path='/proveedores'>
                  <Route index element={<Suppliers />} />
                  <Route path='create' element={<Home />} />
                  <Route path='edit' element={<Home />} />
                  <Route path=':id' element={<Home />} />
                </Route>
                <Route path='/compras'>
                  <Route index element={<Orders />} />
                  <Route path='create' element={<CreateOrder />} />
                  <Route path='details/:id' element={<OrderDetail />} />
                </Route>
                <Route path='/ventas'>
                  <Route index element={<Sales />} />
                  <Route path='create' element={<CreateSale />} />
                  <Route path='details/:id' element={<SaleDetails />} />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;