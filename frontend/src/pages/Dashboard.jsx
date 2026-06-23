import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

  const [data, setData] = useState(null);

useEffect(() => {

  api.get("clients/me/")
    .then((res) => {

      console.log("SUCCESS");
      console.log(res.data);

      setData(res.data);

    })
    .catch((err) => {

      console.log("ERROR");
      console.log(err);

    });

}, []);

  if (!data)
    return <h2>Chargement...</h2>;

  const client = data.client;

  return (

    <div className="page-container">

      <h1>Mon dossier</h1>

      <div className="card">

        <h2>
          {client.prenom} {client.nom}
        </h2>

        <p>Email : {client.email}</p>

        <p>Téléphone : {client.telephone}</p>

        <p>Adresse : {client.adresse}</p>

        <p>Date naissance : {client.date_naissance}</p>

        <p>
          Situation familiale :
          {" "}
          {client.situation_familiale}
        </p>

        <p>
          Salaire :
          {" "}
          {client.salaire_mensuel}
          {" "}DA
        </p>

        <p>
          Contrat :
          {" "}
          {client.type_contrat}
        </p>

        <p>
          Ancienneté :
          {" "}
          {client.anciennete_annees}
          {" "}ans
        </p>

        <p>
          Charges :
          {" "}
          {client.charges_mensuelles}
          {" "}DA
        </p>

        <p>
          Crédits :
          {" "}
          {client.credits_en_cours}
          {" "}DA
        </p>

      </div>

      <div className="card">

        <h2>
          Mes documents
        </h2>

        {data.documents.map(doc => (

          <p key={doc.id}>

            {doc.type}

            {" - "}

            {doc.valide
              ? "✅ Validé"
              : "⏳ En attente"}

          </p>

        ))}

      </div>

      <a
        href="http://127.0.0.1:8000/api/documents/client-pdf/"
        className="btn-primary"
      >
        Télécharger mon dossier PDF
      </a>

    </div>

  );
}

export default Dashboard;