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

    apport: "",
    marge: "10",
    duree_mois: ""

  });

  const [resultat, setResultat] = useState(null);

  useEffect(() => {

    api.get(`products/${id}/`)
      .then(res => {
        setProduct(res.data);
      });

  }, [id]);

  const handleChange = (e) => {

    setSimulation({

      ...simulation,

      [e.target.name]:
      e.target.value

    });

  };

  const calculerSimulation = async () => {

    try {

      const res = await api.post(
        "simulation/create/",
        {

          client_id: 1,

          prix_bien: product.prix,

          apport: simulation.apport,

          marge: simulation.marge,

          duree_mois:
            simulation.duree_mois

        }
      );

      setResultat(res.data);

    } catch (error) {

      console.log(error);

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
        onClick={() => navigate("/home")}
      >
        ← Retour au catalogue
      </button>

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
              Apport
            </label>

            <input
              name="apport"
              onChange={handleChange}
            />

          </div>

          <div>

            <label>
              Marge %
            </label>

            <input
              name="marge"
              value={simulation.marge}
              onChange={handleChange}
            />

          </div>

          <div>

            <label>
              Durée (mois)
            </label>

            <input
              name="duree_mois"
              onChange={handleChange}
            />

          </div>

          <button
            className="btn-primary"
            onClick={calculerSimulation}
          >
            Calculer
          </button>

          {resultat && (

            <div
              className="result-card"
            >

              <h3>
                Résultat
              </h3>

              <p>
                Montant financé :
                {" "}
                {resultat.montant_finance}
                {" "}DA
              </p>

              <p>
                Prix final :
                {" "}
                {resultat.prix_final}
                {" "}DA
              </p>

              <p>
                Mensualité :
                {" "}
                {resultat.mensualite}
                {" "}DA
              </p>

            </div>

          )}

        </div>

      )}

    </div>

  );
}

export default ProductDetail;