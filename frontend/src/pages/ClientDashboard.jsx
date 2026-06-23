import { useEffect, useState } from "react";
import api from "../services/api";

function ClientDashboard() {

  const [dossier, setDossier] =
    useState(null);

  useEffect(() => {

    api.get("clients/me/")
      .then((res) => {

        setDossier(res.data);

      })
      .catch(console.log);

  }, []);

  if (!dossier)
    return <h2>Chargement...</h2>;

  return (

    <div className="page-container">

      <h1>Mon dossier</h1>

      <div className="card">

        <h2>
          Informations personnelles
        </h2>

        <p>
          {dossier.client.nom}
          {" "}
          {dossier.client.prenom}
        </p>

        <p>
          {dossier.client.email}
        </p>

        <p>
          {dossier.client.telephone}
        </p>

        <p>
          {dossier.client.adresse}
        </p>

      </div>

      <div className="card">

        <h2>
          Situation professionnelle
        </h2>

        <p>
          Salaire :
          {" "}
          {dossier.client.salaire}
          {" "}
          DA
        </p>

        <p>
          Contrat :
          {" "}
          {dossier.client.contrat}
        </p>

        <p>
          Ancienneté :
          {" "}
          {dossier.client.anciennete}
          {" "}
          ans
        </p>

      </div>

      {dossier.demande && (

        <div className="card">

          <h2>
            Etat du dossier
          </h2>

          <p>

            <strong>

              {dossier.demande.statut}

            </strong>

          </p>

          <p>

            {dossier.demande.commentaire}

          </p>

        </div>

      )}

      <div className="card">

        <h2>
          Mes documents
        </h2>

        {

          dossier.documents.map(
            doc => (

              <div key={doc.id}>

                <p>

                  {doc.type}

                  {" - "}

                  {

                    doc.valide

                    ? "✅ Validé"

                    : "⏳ En attente"

                  }

                </p>

              </div>

            )
          )

        }

      </div>

      <a
        href="http://127.0.0.1:8000/api/dossier-client-pdf/"
        className="btn-primary"
      >
        Télécharger PDF
      </a>

    </div>

  );
}

export default ClientDashboard;