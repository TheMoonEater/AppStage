import { useEffect, useState } from "react";
import api from "../services/api";

function ScoringConfig() {

  const [config, setConfig] = useState(null);

  useEffect(() => {

    api.get("scoring/config/")
      .then(res => {
        setConfig(res.data);
      });

  }, []);

  const handleChange = (e) => {

    setConfig({
      ...config,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await api.put(
      "scoring/config/",
      config
    );

    alert(
      "Configuration enregistrée"
    );

  };

  if (!config)
    return <h2>Chargement...</h2>;

  return (

    <div className="page-container">

      <h1>
        Paramètres de Scoring
      </h1>

      <form
        className="card"
        onSubmit={handleSubmit}
      >

        <label>
          Points salaire ≥ 100000
        </label>

        <input
          name="salaire_100k"
          value={config.salaire_100k}
          onChange={handleChange}
        />

        <label>
          Points salaire ≥ 50000
        </label>

        <input
          name="salaire_50k"
          value={config.salaire_50k}
          onChange={handleChange}
        />

        <label>
          Points CDI
        </label>

        <input
          name="cdi"
          value={config.cdi}
          onChange={handleChange}
        />

        <label>
          Points Fonctionnaire
        </label>

        <input
          name="fonctionnaire"
          value={config.fonctionnaire}
          onChange={handleChange}
        />

        <label>
          Seuil d'acceptation
        </label>

        <input
          name="seuil_acceptation"
          value={config.seuil_acceptation}
          onChange={handleChange}
        />

        <button
          className="btn-primary"
          type="submit"
        >
          Sauvegarder
        </button>

      </form>

    </div>

  );
}

export default ScoringConfig;