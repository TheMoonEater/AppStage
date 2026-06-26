import { useEffect, useState } from "react";
import api from "../services/api";

function ScoringConfig() {

  const [config, setConfig] = useState(null);

  useEffect(() => {

    loadConfig();

  }, []);

  const loadConfig = async () => {

    try {

      const res = await api.get(
        "scoring-config/"
      );

      setConfig(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setConfig({

      ...config,

      [e.target.name]: e.target.value

    });

  };

  const saveConfig = async (e) => {

    e.preventDefault();

    try {

      await api.put(
        "scoring-config/",
        config
      );

      alert(
        "Paramètres enregistrés"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Erreur sauvegarde"
      );

    }

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

            {/* ================= IDENTIFICATION ================= */}

            <tr>
              <td colSpan="2">
                <strong>
                  Identification
                </strong>
              </td>
            </tr>

            <tr>
              <td>Age jeune</td>
              <td>
                <input
                  name="age_jeune"
                  value={config.age_jeune}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Age moyen</td>
              <td>
                <input
                  name="age_moyen"
                  value={config.age_moyen}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Age senior</td>
              <td>
                <input
                  name="age_senior"
                  value={config.age_senior}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Personnes à charge</td>
              <td>
                <input
                  name="personnes_charge"
                  value={config.personnes_charge}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Habitation propriétaire</td>
              <td>
                <input
                  name="habitation_proprietaire"
                  value={
                    config.habitation_proprietaire
                  }
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Habitation locataire</td>
              <td>
                <input
                  name="habitation_locataire"
                  value={
                    config.habitation_locataire
                  }
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Niveau universitaire</td>
              <td>
                <input
                  name="niveau_universitaire"
                  value={
                    config.niveau_universitaire
                  }
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Niveau secondaire</td>
              <td>
                <input
                  name="niveau_secondaire"
                  value={
                    config.niveau_secondaire
                  }
                  onChange={handleChange}
                />
              </td>
            </tr>

            {/* ================= PROFESSION ================= */}

            <tr>
              <td colSpan="2">
                <strong>
                  Situation Professionnelle
                </strong>
              </td>
            </tr>

            <tr>
              <td>Secteur public</td>
              <td>
                <input
                  name="secteur_public"
                  value={config.secteur_public}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Secteur privé</td>
              <td>
                <input
                  name="secteur_prive"
                  value={config.secteur_prive}
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
              <td>CDD</td>
              <td>
                <input
                  name="cdd"
                  value={config.cdd}
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
              <td>Ancienneté</td>
              <td>
                <input
                  name="anciennete"
                  value={config.anciennete}
                  onChange={handleChange}
                />
              </td>
            </tr>

            {/* ================= FINANCIER ================= */}

            <tr>
              <td colSpan="2">
                <strong>
                  Situation Financière
                </strong>
              </td>
            </tr>

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
              <td>Salaire minimum</td>
              <td>
                <input
                  name="salaire_min"
                  value={config.salaire_min}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Autres revenus</td>
              <td>
                <input
                  name="autres_revenus"
                  value={config.autres_revenus}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Taux d'endettement</td>
              <td>
                <input
                  name="endettement"
                  value={config.endettement}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>
                Seuil d'acceptation
              </td>
              <td>
                <input
                  name="seuil_acceptation"
                  value={
                    config.seuil_acceptation
                  }
                  onChange={handleChange}
                />
              </td>
            </tr>

          </tbody>

        </table>

        <br />

        <button
          type="submit"
          className="btn-primary"
        >
          Sauvegarder
        </button>

      </form>

    </div>

  );
}

export default ScoringConfig;