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
          res.data.situation_familiale === "MARIE"
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

      // =====================
      // Sauvegarde Mon Dossier
      // =====================

      await api.patch(
        "clients/me/",
        {
          nombre_personnes_charge:
            form.nombre_personnes_charge,

          habitation:
            form.habitation,

          niveau_instruction:
            form.niveau_instruction,

          secteur_activite:
            form.secteur_activite,

          anciennete_annees:
            form.anciennete,

          type_contrat:
            form.type_contrat,

          salaire_mensuel:
            form.salaire,

          autres_revenus:
            form.autres_revenus,

          charges_mensuelles:
            form.charges
        }
      );

      // =====================
      // Calcul scoring
      // =====================

      const res =
        await api.post(
          "scoring/calculate/",
          {
            age: form.age,

            nombre_personnes_charge:
              form.nombre_personnes_charge,

            habitation:
              form.habitation,

            niveau_instruction:
              form.niveau_instruction,

            secteur_activite:
              form.secteur_activite,

            salaire:
              form.salaire,

            autres_revenus:
              form.autres_revenus,

            charges:
              form.charges,

            type_contrat:
              form.type_contrat.toLowerCase(),

            anciennete:
              form.anciennete,

            marie:
              form.marie,

            enfants:
              form.nombre_personnes_charge,

            apport:
              form.apport
          }
        );

      setResultat(res.data);

      alert(
        "Informations enregistrées avec succès"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Erreur lors du calcul"
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
              Nombre de personnes à charge
            </label>

            <input
              type="number"
              name="nombre_personnes_charge"
              value={form.nombre_personnes_charge}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              Habitation
            </label>

            <select
              name="habitation"
              value={form.habitation}
              onChange={handleChange}
            >
              <option value="">
                Choisir
              </option>

              <option value="Proprietaire">
                Propriétaire
              </option>

              <option value="Locataire">
                Locataire
              </option>

              <option value="Familiale">
                Logement familial
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Niveau d'instruction
            </label>

            <select
              name="niveau_instruction"
              value={form.niveau_instruction}
              onChange={handleChange}
            >
              <option value="">
                Choisir
              </option>

              <option value="Primaire">
                Primaire
              </option>

              <option value="Secondaire">
                Secondaire
              </option>

              <option value="Universitaire">
                Universitaire
              </option>

              <option value="Master">
                Master
              </option>

              <option value="Doctorat">
                Doctorat
              </option>
            </select>
          </div>

        </div>

        <h2>
          Situation professionnelle
        </h2>

        <div className="form-grid">

          <div className="form-group">
            <label>
              Secteur d'activité
            </label>

            <select
              name="secteur_activite"
              value={form.secteur_activite}
              onChange={handleChange}
            >
              <option value="">
                Choisir
              </option>

              <option value="PUBLIC">
                Public
              </option>

              <option value="PRIVE">
                Privé
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Ancienneté (années)
            </label>

            <input
              type="number"
              name="anciennete"
              value={form.anciennete}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              Nature du contrat
            </label>

            <select
              name="type_contrat"
              value={form.type_contrat}
              onChange={handleChange}
            >
              <option value="">
                Choisir
              </option>

              <option value="CDI">
                CDI
              </option>

              <option value="CDD">
                CDD
              </option>

              <option value="FONCTIONNAIRE">
                Fonctionnaire
              </option>
            </select>
          </div>

        </div>

        <h2>
          Situation financière
        </h2>

        <div className="form-grid">

          <div className="form-group">
            <label>
              Salaire mensuel
            </label>

            <input
              type="number"
              name="salaire"
              value={form.salaire}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              Autres revenus
            </label>

            <input
              type="number"
              name="autres_revenus"
              value={form.autres_revenus}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              Charges mensuelles
            </label>

            <input
              type="number"
              name="charges"
              value={form.charges}
              onChange={handleChange}
            />
          </div>

        </div>

        <br />

        <button
          className="btn-primary"
          type="submit"
        >
          Enregistrer et calculer
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
            {resultat.taux_endettement}%
          </p>

          <h3
            className={
              resultat.decision === "ACCEPTE"
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