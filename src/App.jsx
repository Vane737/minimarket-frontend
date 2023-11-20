// import React from "react";

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import SideBar from './components/SideBar';
import Products from './pages/products/Products';
import Categories from './pages/categories/Categories';

const App = () => {
  return (
    <div className=''>
      <BrowserRouter> {/* Proveedor de la libreria */}
        {/* <NavBar /> */}
        <div className='flex'>
        <SideBar />
        <Routes>       {/* El que contendra las rutas */}
          <Route path='/' element={<Home />} />
          <Route path='/home' element={ <Home /> } />

          <Route path='/productos'>
            <Route index element={<Products /> } />
            <Route path='create' element={<Home /> } />
            <Route path='edit' element={<Home /> } />
            <Route path=':id' element={<Home /> } />
          </Route>
          <Route path='/categorias'>
            <Route index element={<Categories /> } />
            <Route path='create' element={<Home /> } />
            <Route path='edit' element={<Home /> } />
            <Route path=':id' element={<Home /> } />
          </Route>

        </Routes>
      </div>
      </BrowserRouter>
    </div>
  )
}

export default App;