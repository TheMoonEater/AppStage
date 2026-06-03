import { useEffect,useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Home(){

  const [products,setProducts] = useState([]);

  useEffect(()=>{

    api.get("products/")
      .then(res => res.data)
      .then(data => setProducts(data));

  },[]);

  return(
    <div>

      <h1>Catalogue</h1>

      {
        products.map(product => (

          <div key={product.id}>

            <h3>{product.nom}</h3>

            <p>{product.prix} DA</p>

          </div>

        ))
      }

    </div>
  );
}

export default Home;