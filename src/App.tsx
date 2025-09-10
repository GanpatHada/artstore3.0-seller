import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import './App.css'
import { Toaster } from "react-hot-toast";
import AppRoutes from "./AppRoutes";
import { SellerProvider } from "./contexts/SellerContext";
import SellerInitializer from "./components/SellerInitializer";
const App: React.FC = () => {
  return (
    <div id="app">
      <Router>
        <Toaster />
        <SellerProvider>
          <SellerInitializer>
            <main id="app-content">
              <AppRoutes />
            </main>
          </SellerInitializer>
        </SellerProvider>
      </Router>
    </div>
  );
};

export default App;

