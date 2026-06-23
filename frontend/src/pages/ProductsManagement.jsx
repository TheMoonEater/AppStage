import { useEffect, useState } from "react";
import api from "../services/api";

function ProductsManagement() {

  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    nom: "",
    description: "",
    prix: "",
    image: "",
    stock: "",
    category: "VOITURE"
  });

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

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value

    });

  };

  const addProduct = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "products/",
        form
      );

      setForm({
        nom: "",
        description: "",
        prix: "",
        image: "",
        stock: "",
        category: "VOITURE"
      });

      loadProducts();

      alert(
        "Produit ajouté"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Erreur ajout produit"
      );

    }

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

      <form className="product-form" onSubmit={addProduct}>

        <h2>
          Ajouter un produit
        </h2>

        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={form.nom}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="prix"
          placeholder="Prix"
          value={form.prix}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="URL image"
          value={form.image}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >

          <option value="VOITURE">
            Voiture
          </option>

          <option value="MOTO">
            Moto
          </option>

          <option value="ELECTROMENAGER">
            Électroménager
          </option>

        </select>

        <button
          type="submit"
          className="btn-primary"
        >
          Ajouter
        </button>

      </form>

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
                  <span> ⚠ </span>
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