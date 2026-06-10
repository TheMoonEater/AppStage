import { useEffect, useState } from "react";

import api from "../services/api";

import Hero from "../components/Hero";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function Home() {

  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState("");

  const [ordering, setOrdering] =
    useState("");

  useEffect(() => {

    api.get(
      `products/?page=${page}&search=${search}&category=${category}&ordering=${ordering}`
    )
      .then(res => {

        setProducts(
          res.data.results
        );

        setTotalPages(
          Math.ceil(
            res.data.count / 6
          )
        );

      })
      .catch(err => {

        console.log(err);

      });

  }, [
      page,
      search,
      category,
      ordering
  ]);

  return (

    <>

      <Hero />

      <Categories />

      <div className="products-container">

        <h2 className="products-title">
          Produits disponibles
        </h2>

        <div className="catalog-filters">

          <input
            type="text"
            placeholder="🔍 Rechercher un produit..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
          >

            <option value="">
              Toutes catégories
            </option>

            <option value="VOITURE">
              Voitures
            </option>

            <option value="MOTO">
              Motos
            </option>

            <option value="ELECTROMENAGER">
              Électroménager
            </option>

          </select>

          <select
            value={ordering}
            onChange={(e) =>
              setOrdering(
                e.target.value
              )
            }
          >

            <option value="">
              Trier par prix
            </option>

            <option value="prix">
              Prix croissant
            </option>

            <option value="-prix">
              Prix décroissant
            </option>

          </select>

        </div>

        <div className="products-grid">

          {products.map(product => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

        <div className="pagination">

          <button
            disabled={page === 1}
            onClick={() =>
              setPage(page - 1)
            }
          >
            ←
          </button>

          <span>
            Page {page} / {totalPages}
          </span>

          <button
            disabled={
              page === totalPages
            }
            onClick={() =>
              setPage(page + 1)
            }
          >
            →
          </button>

        </div>

      </div>

      <Footer />

    </>

  );

}

export default Home;