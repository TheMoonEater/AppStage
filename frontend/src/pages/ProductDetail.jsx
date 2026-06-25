import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function ProductDetail() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [showSimulation, setShowSimulation] =
    useState(false);

  const [simulation, setSimulation] = useState({

    salaire_acheteur: "",

    salaire_co_acheteur: "",

    credit_consomme: "",

    apport: "0",

    marge: "30",

    duree_mois: ""

  });

  const [resultat, setResultat] =
    useState(null);

  useEffect(() => {

    api.get(`products/${id}/`)
      .then(res => {

        setProduct(res.data);

      })
      .catch(err => {

        console.log(err);

      });

  }, [id]);

  const handleChange = (e) => {

    setSimulation({

      ...simulation,

      [e.target.name]:
        e.target.value

    });

  };

  const addToCart = async () => {

      try {

        await api.post(
          "cart-items/add/",
          {
            product_id: product.id
          }
        );

        alert(
          "Produit ajouté au panier"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Erreur ajout panier"
        );
      }
    };




  const calculerSimulation = async () => {

    try {

      const res = await api.post(
        "simulation/create/",
        {

          client_id: 1,

          prix_bien: product.prix,

          salaire_acheteur:
            simulation.salaire_acheteur,

          salaire_co_acheteur:
            simulation.salaire_co_acheteur || 0,

          credit_consomme:
            simulation.credit_consomme || 0,

          apport:
            simulation.apport || 0,

          marge:
            simulation.marge || 30,

          duree_mois:
            simulation.duree_mois

        }
      );

      console.log(
        "REPONSE API :",
        res.data
      );

      setResultat(res.data);

    } catch (error) {

      console.log(
        "ERREUR :",
        error.response?.data
      );

      alert(
        "Erreur simulation"
      );

    }

  };

  if (!product)
    return <h2>Chargement...</h2>;

  return (

    <div className="product-detail-page">

      <button
        className="btn-secondary"
        onClick={() =>
          navigate("/home")
        }
      >
        ← Retour au catalogue
      </button>

      <div className="product-detail">

        <img
          src={product.image}
          alt={product.nom}
        />

        <div className="product-info">

          <h1>
            {product.nom}
          </h1>

          <p>
            {product.description}
          </p>

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
                setShowSimulation(
                  !showSimulation
                )
              }
            >
              Faire une simulation
            </button>

          </div>

        </div>

      </div>

      {showSimulation && (

        <div className="simulation-card">

          <h2>
            Simulation Murabaha
          </h2>

          <div>

            <label>
              Prix du bien
            </label>

            <input
              value={product.prix}
              disabled
            />

          </div>

          <div>

            <label>
              Salaire acheteur
            </label>

            <input
              type="number"
              name="salaire_acheteur"
              onChange={handleChange}
            />

          </div>

          <div>

            <label>
              Salaire co-acheteur
            </label>

            <input
              type="number"
              name="salaire_co_acheteur"
              onChange={handleChange}
            />

          </div>

          <div>

            <label>
              Crédit consommé
            </label>

            <input
              type="number"
              name="credit_consomme"
              onChange={handleChange}
            />

          </div>

          <div>

            <label>
              Durée (mois)
            </label>

            <input
              type="number"
              name="duree_mois"
              min="12"
              max="60"
              placeholder="Entre 12 et 60 mois"
              onChange={handleChange}
            />

          </div>

          <button
            className="btn-primary"
            onClick={
              calculerSimulation
            }
          >
            Calculer
          </button>

          {resultat && (

            <div className="result-card">

              <h3>
                Résultat
              </h3>

              <p>
                Salaire total :
                {" "}
                {resultat.salaire_total}
                {" "}
                DA
              </p>

              <p>
                CE brute :
                {" "}
                {resultat.ce_brute}
                {" "}
                DA
              </p>

              <p>
                Crédit consommé :
                {" "}
                {resultat.credit_consomme}
                {" "}
                DA
              </p>

              <p>
                CE nette :
                {" "}
                {resultat.ce_nette}
                {" "}
                DA
              </p>

              <p>
                Apport minimum :
                {" "}
                {resultat.apport}
                {" "}
                DA
              </p>

              <p>
                Montant financé :
                {" "}
                {resultat.montant_finance}
                {" "}
                DA
              </p>

              <p>
                Prix final :
                {" "}
                {resultat.prix_final}
                {" "}
                DA
              </p>

              <p>
                Mensualité :
                {" "}
                {resultat.mensualite}
                {" "}
                DA
              </p>

              <p>
                Marge totale :
                {" "}
                {resultat.montant_total_marge}
                {" "}
                DA
              </p>

              <p>
                TVA :
                {" "}
                {resultat.montant_total_tva}
                {" "}
                DA
              </p>

              <p>
                Montant remboursement :
                {" "}
                {resultat.montant_remboursement}
                {" "}
                DA
              </p>

            </div>

          )}

        </div>

      )}

    </div>

  );

}

export default ProductDetail;