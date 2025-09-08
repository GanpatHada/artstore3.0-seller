import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import './App.css'
import { Toaster } from "react-hot-toast";
import AppRoutes from "./AppRoutes";
import { SellerProvider } from "./contexts/SellerContext";
const App: React.FC = () => {
  return (
    <div id="app">
      <Toaster />
      <Router>
        <SellerProvider>
          <main id="app-content">
            <AppRoutes />
          </main>
        </SellerProvider>
        <footer>
          main footer
        </footer>
      </Router>
    </div>
  );
};

export default App;

