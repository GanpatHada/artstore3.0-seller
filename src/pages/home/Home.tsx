import React from "react";
import AddProduct from "../add_product/AddProduct";
import './Home.css'
import { ProductFormProvider } from "../../contexts/ProductFormContext";

const Home: React.FC = () => {
  return <div id="home">
    <ProductFormProvider>
      <AddProduct />
    </ProductFormProvider>
  </div>;
};

export default Home;