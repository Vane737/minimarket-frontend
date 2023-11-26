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
import OrderForm from './pages/orders/Order-create';

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
                  <Route path='create' element={<Home />} />
                  <Route path='edit' element={<Home />} />
                  <Route path=':id' element={<Home />} />
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
                  <Route path='create' element={<OrderForm />} />
                  <Route path='edit' element={<Home />} />
                  <Route path=':id' element={<Home />} />
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