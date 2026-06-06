import { useEffect, useState } from "react";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    api.get("products/")
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.log(err);
      });

  }, []);

  return (

    <>

      <Navbar />

      <Hero />

      <Categories />

      <div className="products-container">

        <h2 className="products-title">
          Produits disponibles
        </h2>

        <div className="products-grid">

          {
            products.map(product => (

              <ProductCard
                key={product.id}
                product={product}
              />

            ))
          }

        </div>

      </div>

      <Footer />

    </>

  );
}

export default Home;