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
      <Toaster />
      <SellerProvider>
        <SellerInitializer>
          <Router>
            <main id="app-content">
              <AppRoutes />
            </main>
            <footer>
              main footer
            </footer>
          </Router>
        </SellerInitializer>
      </SellerProvider>
    </div>
  );
};

export default App;

