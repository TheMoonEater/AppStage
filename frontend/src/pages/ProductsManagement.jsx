import { useEffect, useState } from "react";
import api from "../services/api";

function ProductsManagement() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    loadProducts();

  }, []);

  const loadProducts = () => {

    api.get("products/")
      .then(res => {

        setProducts(
          res.data.results || res.data
        );

      });

  };

  const deleteProduct = async (id) => {

    if (
      !window.confirm(
        "Supprimer ce produit ?"
      )
    )
      return;

    await api.delete(
      `products/${id}/`
    );

    loadProducts();

  };

  return (

    <div className="page-container">

      <h1>
        Gestion Produits
      </h1>

      <table className="clients-table">

        <thead>

          <tr>

            <th>Nom</th>

            <th>Prix</th>

            <th>Stock</th>

            <th>Catégorie</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {products.map(product => (

            <tr key={product.id}>

              <td>{product.nom}</td>

              <td>{product.prix}</td>

              <td>

                {product.stock}

                {product.stock < 3 && (
                  <span>
                    ⚠
                  </span>
                )}

              </td>

              <td>
                {product.category}
              </td>

              <td>

                <button
                  className="btn-danger"
                  onClick={() =>
                    deleteProduct(
                      product.id
                    )
                  }
                >
                  Supprimer
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default ProductsManagement;