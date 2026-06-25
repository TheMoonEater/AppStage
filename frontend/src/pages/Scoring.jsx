import { useEffect, useState } from "react";
import api from "../services/api";

function Scoring() {

  const [form, setForm] = useState({

    age: "",

    nombre_personnes_charge: "",

    habitation: "",

    niveau_instruction: "",

    secteur_activite: "",

    anciennete: "",

    type_contrat: "",

    salaire: "",

    autres_revenus: "",

    charges: "",

    marie: "non",

    enfants: "",

    apport: "0"
  });

  const [resultat, setResultat] =
    useState(null);

  useEffect(() => {

    loadClient();

  }, []);

  const loadClient = async () => {

    try {

      const res =
        await api.get(
          "clients/me/"
        );

      setForm({

        age: res.data.age || "",

        nombre_personnes_charge:
          res.data.nombre_personnes_charge || "",

        habitation:
          res.data.habitation || "",

        niveau_instruction:
          res.data.niveau_instruction || "",

        secteur_activite:
          res.data.secteur_activite || "",

        anciennete:
          res.data.anciennete_annees || "",

        type_contrat:
          res.data.type_contrat || "",

        salaire:
          res.data.salaire_mensuel || "",

        autres_revenus:
          res.data.autres_revenus || "",

        charges:
          res.data.charges_mensuelles || "",

        marie:
          res.data.situation_familiale ===
          "MARIE"
            ? "oui"
            : "non",

        enfants:
          res.data.nombre_personnes_charge || "",

        apport: "0"

      });

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res =
        await api.post(
          "scoring/calculate/",
          {
            salaire: form.salaire,
            marie: form.marie,
            enfants: form.enfants,
            type_contrat:
              form.type_contrat,
            anciennete:
              form.anciennete,
            apport:
              form.apport,
            charges:
              form.charges
          }
        );

      setResultat(res.data);

    } catch (error) {

      console.log(error);

      alert(
        "Erreur calcul scoring"
      );

    }

  };

  return (

    <div className="scoring-page">

      <h1 className="page-title">
        Scoring Client
      </h1>

      <form
        className="scoring-card"
        onSubmit={handleSubmit}
      >

        <h2>
          Identification
        </h2>

        <div className="form-grid">

          <div className="form-group">
            <label>Age</label>
            <input
              value={form.age}
              disabled
            />
          </div>

          <div className="form-group">
            <label>
              Personnes à charge
            </label>
            <input
              value={
                form.nombre_personnes_charge
              }
              disabled
            />
          </div>

          <div className="form-group">
            <label>
              Habitation
            </label>
            <input
              value={form.habitation}
              disabled
            />
          </div>

          <div className="form-group">
            <label>
              Niveau instruction
            </label>
            <input
              value={
                form.niveau_instruction
              }
              disabled
            />
          </div>

        </div>

        <h2>
          Situation professionnelle
        </h2>

        <div className="form-grid">

          <div className="form-group">
            <label>
              Secteur activité
            </label>
            <input
              value={
                form.secteur_activite
              }
              disabled
            />
          </div>

          <div className="form-group">
            <label>
              Ancienneté
            </label>
            <input
              value={
                form.anciennete
              }
              disabled
            />
          </div>

          <div className="form-group">
            <label>
              Contrat
            </label>
            <input
              value={
                form.type_contrat
              }
              disabled
            />
          </div>

        </div>

        <h2>
          Situation financière
        </h2>

        <div className="form-grid">

          <div className="form-group">
            <label>
              Salaire
            </label>
            <input
              value={
                form.salaire
              }
              disabled
            />
          </div>

          <div className="form-group">
            <label>
              Autres revenus
            </label>
            <input
              value={
                form.autres_revenus
              }
              disabled
            />
          </div>

          <div className="form-group">
            <label>
              Charges
            </label>
            <input
              value={
                form.charges
              }
              disabled
            />
          </div>

        </div>

        <button
          className="btn-primary"
        >
          Calculer mon scoring
        </button>

      </form>

      {resultat && (

        <div className="result-card">

          <h2>
            Résultat
          </h2>

          <div className="result-score">
            {resultat.score}/100
          </div>

          <p>
            Taux d'endettement :
            {" "}
            {
              resultat.taux_endettement
            }
            %
          </p>

          <h3
            className={
              resultat.decision ===
              "ACCEPTE"
                ? "accepted"
                : "refused"
            }
          >
            {resultat.decision}
          </h3>

        </div>

      )}

    </div>

  );

}

export default Scoring;