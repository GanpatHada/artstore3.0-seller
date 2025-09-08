import React from "react";
import { BrowserRouter as Router,Link} from "react-router-dom";
import './App.css'
import { Toaster } from "react-hot-toast";
import AppRoutes from "./AppRoutes";
const App: React.FC = () => {
  return (
    <div id="app">
      <Toaster/>
      <Router>
      <main id="app-content">
        <AppRoutes/>
      </main>
      <footer>
        main footer
      </footer>
    </Router>
    </div>
  );
};

export default App;

