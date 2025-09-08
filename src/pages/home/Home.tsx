import React from "react";
import AddProduct from "../add_product/AddProduct";
import './Home.css'
import { ProductFormProvider } from "../../contexts/ProductFormContext";
import { useSeller } from "../../contexts/SellerContext";
import Navbar from "../../components/navbar/Navbar";

const Home: React.FC = () => {
  const {seller,loading}=useSeller();

  console.log(seller,loading)
  return <div id="home">
    <Navbar/>
    <ProductFormProvider>
      <AddProduct />
    </ProductFormProvider>
  </div>;
};

export default Home;