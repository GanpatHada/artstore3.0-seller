import React, { type JSX } from 'react'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

import {Routes, Route } from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard';
import NotFoundPage from './pages/not_found/NotFoundPage';

const AppRoutes: React.FC = (): JSX.Element => {
   return (
      <Routes>
         <Route path="/" element={<Home />}>
              <Route index element={<Dashboard/>} />
         </Route>
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
   )
}

export default AppRoutes
