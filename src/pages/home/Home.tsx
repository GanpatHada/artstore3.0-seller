import React, { useState } from "react";
import './Home.css'
import { useSeller } from "../../contexts/SellerContext";
import Navbar from "../../components/navbar/Navbar";
import Spinner from '../../assets/spinner.svg'
import logo from '../../assets/a.svg'
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";


const Initializer = () => {
  return <div className="initializer">
    <img id="logo" src={logo} alt="a" />
    <img id='spinner' src={Spinner} alt="..." />
    <p>🚀 Please wait ...<br /> Hosted on Render, so it may take a few seconds to wake up. </p>
  </div>
}

const Home: React.FC = () => {
  const { loading } = useSeller();
  const [showSidebar,setShowSidebar]=useState<boolean>(false)

  if (loading)
    return <Initializer />
  return <div id="home">
    {showSidebar&&<Sidebar setShowSidebar={setShowSidebar}/>}
    <header>
      <Navbar setShowSidebar={setShowSidebar} />
    </header>
    <main>
      <Outlet />
    </main>
    {/* <MyProducts /> */}

    <footer>
      main footer
    </footer>
  </div>;
};

export default Home;