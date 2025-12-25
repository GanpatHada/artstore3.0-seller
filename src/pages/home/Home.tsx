import React, { useState } from "react";
import './Home.css'
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";


const Home: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false)

  return <div id="home">
    {showSidebar && <Sidebar setShowSidebar={setShowSidebar} />}
    <header>
      <Navbar setShowSidebar={setShowSidebar} />
    </header>
    <main>
      <Outlet />
    </main>
  </div>;
};

export default Home;