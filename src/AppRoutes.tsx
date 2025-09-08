import React, { type JSX } from 'react'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

import {Routes, Route } from "react-router-dom";

const AppRoutes: React.FC = (): JSX.Element => {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
      </Routes>
   )
}

export default AppRoutes
