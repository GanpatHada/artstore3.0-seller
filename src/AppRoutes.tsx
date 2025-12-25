import React, { type JSX } from 'react'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Help from './pages/help/Help';

import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard';
import NotFoundPage from './pages/not_found/NotFoundPage';
import AddProduct from './pages/add_product/AddProduct';
import { ProductFormProvider } from './contexts/ProductFormContext';
import MyProducts from './pages/my_products/MyProducts';
import StoreForm from './pages/StoreForm/StoreForm';
import { StoreFormProvider } from './contexts/StoreContext';
import MyStore from './pages/my_store/MyStore';
import Settings from './pages/settings/Settings';
import ProtectedRoute from './components/ProtectedRoute';


const AppRoutes: React.FC = (): JSX.Element => {
   return (
      <Routes>
         <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path='/my-products' element={<MyProducts />} />
            <Route path='/my-store' element={<MyStore />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/store-form' element={
               <StoreFormProvider>
                  <StoreForm />
               </StoreFormProvider>} />
            <Route path='/list-product' element={
               <ProductFormProvider>
                  <AddProduct />
               </ProductFormProvider>} />
            <Route path='/help' element={<Help />} />
         </Route>
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
   )
}

export default AppRoutes
