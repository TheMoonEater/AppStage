import { Link } from "react-router-dom";

function ProductCard({ product }) {

  return (

    <div className="product-card">

      <img
        src={product.image}
        alt={product.nom}
      />

      <div className="product-content">

        <span className="product-category">
          {product.category}
        </span>

        <h3>
          {product.nom}
        </h3>

        <p>
          
          {product.description.length > 80
            ? product.description.substring(0, 80) + "..."
            : product.description}

        </p>

        <div className="product-price">
          {product.prix} DA
        </div>

        <Link
          className="product-button"
          to={`/product/${product.id}`}
        >
          Voir détails
        </Link>

      </div>

    </div>

  );
}

export default ProductCard;