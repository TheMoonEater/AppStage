import { useEffect, useState } from "react";
import api from "../services/api";

function ScoringConfig() {

  const [config,setConfig] =
    useState(null);

  useEffect(() => {

    api.get("scoring-config/")
      .then(res => {

        setConfig(res.data);

      });

  }, []);

  const handleChange = (e) => {

    setConfig({

      ...config,

      [e.target.name]:
      e.target.value

    });

  };

  const saveConfig = async (e) => {

    e.preventDefault();

    await api.put(
      "scoring-config/",
      config
    );

    alert(
      "Paramètres enregistrés"
    );

  };

  if (!config)
    return <h2>Chargement...</h2>;

  return (

    <div className="scoring-config-page">

      <h1 className="page-title">
        Paramètres du Scoring
      </h1>

      <form
        className="config-card"
        onSubmit={saveConfig}
      >

        <table className="config-table">

          <thead>

            <tr>
              <th>Critère</th>
              <th>Points</th>
            </tr>

          </thead>

          <tbody>

            <tr>
              <td>Salaire ≥ 100000</td>
              <td>
                <input
                  name="salaire_100k"
                  value={config.salaire_100k}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Salaire ≥ 50000</td>
              <td>
                <input
                  name="salaire_50k"
                  value={config.salaire_50k}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Mariage</td>
              <td>
                <input
                  name="mariage"
                  value={config.mariage}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>CDI</td>
              <td>
                <input
                  name="cdi"
                  value={config.cdi}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Fonctionnaire</td>
              <td>
                <input
                  name="fonctionnaire"
                  value={config.fonctionnaire}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Seuil Acceptation</td>
              <td>
                <input
                  name="seuil_acceptation"
                  value={config.seuil_acceptation}
                  onChange={handleChange}
                />
              </td>
            </tr>

          </tbody>

        </table>

        <br />

        <button
          className="btn-primary"
        >
          Sauvegarder
        </button>

      </form>

    </div>

  );
}

export default ScoringConfig;