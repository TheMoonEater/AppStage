import { useState } from "react";
import api from "../services/api";

function Scoring() {

  const [form,setForm] = useState({

    salaire:"",
    marie:"non",
    enfants:"",
    type_contrat:"cdi",
    anciennete:"",
    apport:"",
    charges:""

  });

  const [resultat,setResultat] = useState(null);

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const res = await api.post(
      "scoring/calculate/",
      form
    );

    setResultat(res.data);

  };

  return (

    <div className="scoring-page">

      <h1 className="page-title">
        Calcul du Score Client
      </h1>

      <form
        className="scoring-card"
        onSubmit={handleSubmit}
      >

        <div className="form-grid">

          <div className="form-group">
            <label>Salaire</label>
            <input
              name="salaire"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Situation</label>

            <select
              name="marie"
              onChange={handleChange}
            >
              <option value="oui">Marié</option>
              <option value="non">Célibataire</option>
            </select>

          </div>

          <div className="form-group">
            <label>Nombre enfants</label>

            <input
              name="enfants"
              onChange={handleChange}
            />

          </div>

          <div className="form-group">
            <label>Contrat</label>

            <select
              name="type_contrat"
              onChange={handleChange}
            >
              <option value="cdi">
                CDI
              </option>

              <option value="fonctionnaire">
                Fonctionnaire
              </option>

            </select>

          </div>

          <div className="form-group">
            <label>Ancienneté</label>

            <input
              name="anciennete"
              onChange={handleChange}
            />

          </div>

          <div className="form-group">
            <label>Apport</label>

            <input
              name="apport"
              onChange={handleChange}
            />

          </div>

          <div className="form-group">
            <label>Charges</label>

            <input
              name="charges"
              onChange={handleChange}
            />

          </div>

        </div>

        <br />

        <button
          className="btn-primary"
        >
          Calculer
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
            Taux endettement :
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