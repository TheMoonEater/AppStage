import { useEffect,useState } from "react";

function Home(){

  const [products,setProducts] = useState([]);

  useEffect(()=>{

    fetch("http://127.0.0.1:8000/api/products/")
      .then(res=>res.json())
      .then(data=>setProducts(data));

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