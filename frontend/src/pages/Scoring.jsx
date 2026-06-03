import { useState } from "react";
import axios from "axios";

function Scoring() {

  const [form, setForm] = useState({
    salaire: "",
    marie: "non",
    enfants: "",
    type_contrat: "cdi",
    anciennete: "",
    apport: "",
    charges: ""
  });

  const [resultat, setResultat] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/api/scoring/calculate/",
        form
      );

      setResultat(response.data);

    } catch (error) {
      console.log(error);
      alert("Erreur scoring");
    }
  };

  return (
    <div>

      <h1>Scoring Client</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="number"
          name="salaire"
          placeholder="Salaire"
          onChange={handleChange}
        />

        <br /><br />

        <select
          name="marie"
          onChange={handleChange}
        >
          <option value="oui">Marié</option>
          <option value="non">Non marié</option>
        </select>

        <br /><br />

        <input
          type="number"
          name="enfants"
          placeholder="Nombre d'enfants"
          onChange={handleChange}
        />

        <br /><br />

        <select
          name="type_contrat"
          onChange={handleChange}
        >
          <option value="cdi">CDI</option>
          <option value="cdd">CDD</option>
          <option value="fonctionnaire">
            Fonctionnaire
          </option>
        </select>

        <br /><br />

        <input
          type="number"
          name="anciennete"
          placeholder="Ancienneté"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="apport"
          placeholder="Apport"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="charges"
          placeholder="Charges"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Calculer le scoring
        </button>

      </form>

      {resultat && (

        <div>

          <h2>Résultat</h2>

          <p>
            Score : {resultat.score}
          </p>

          <p>
            Décision : {resultat.decision}
          </p>

          <p>
            Taux d'endettement :
            {" "}
            {resultat.taux_endettement} %
          </p>

        </div>

      )}

    </div>
  );
}

export default Scoring;