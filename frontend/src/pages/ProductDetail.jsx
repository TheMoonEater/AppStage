import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function ProductDetail() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const navigate = useNavigate();


  const addToCart = async () => {

  try {

    await api.post(
      "cart-items/add/",
      {
        user_id: 1,
        product_id: product.id
      }
    );

    alert("Produit ajouté au panier");

  } catch (error) {

    console.log(error);

    alert("Erreur ajout panier");
  }
};


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

          <button
            className="btn-primary"
            onClick={addToCart}
          >
            Ajouter au panier
          </button>

          <button
            className="btn-secondary"
            onClick={() =>
              navigate(`/simulation/${product.id}`)
            }
          >
            Simulation
          </button>

          <button
            className="btn-secondary"
            onClick={() => navigate("/home")}
          >
            ← Retour au catalogue
          </button>

        </div>

      </div>

    </div>

  );
}

export default ProductDetail;