import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";

function ProductDetail() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {

    api.get(`products/${id}/`)
      .then(res => {
        setProduct(res.data);
      });

  }, [id]);

  if (!product)
    return <h2>Chargement...</h2>;

  return (

    <div className="product-detail">

      <img
        src={product.image}
        alt={product.nom}
      />

      <div className="product-info">

        <h1>{product.nom}</h1>

        <p>{product.description}</p>

        <h2>
          {product.prix} DA
        </h2>

        <div className="actions">

          <button className="btn-primary">
            Ajouter au panier
          </button>

          <button className="btn-secondary">
            Simulation
          </button>

        </div>

      </div>

    </div>

  );
}

export default ProductDetail;