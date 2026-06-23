import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";



function ClientDetail() {

  const { id } = useParams();

  const [client, setClient] = useState(null);

  useEffect(() => {

    api.get(`clients/${id}/`)
      .then((res) => {
        setClient(res.data);
      });

  }, [id]);

  if (!client)
    return <h2>Chargement...</h2>;

  return (

    <div className="page-container">

      <h1>
        Dossier Client
      </h1>

      <div className="card">

        <h2>
          {client.prenom} {client.nom}
        </h2>

        <p>
          Email : {client.email}
        </p>

        <p>
          Téléphone : {client.telephone}
        </p>

        <p>
          Adresse : {client.adresse}
        </p>

        <p>
          Salaire : {client.salaire_mensuel} DA
        </p>

        <p>
          Contrat : {client.type_contrat}
        </p>

        <p>
          Ancienneté : {client.anciennete_annees} ans
        </p>

      </div>

      <div className="card">

        <h2>
          Résultat Scoring
        </h2>

        <p>
          Score : En attente
        </p>

        <p>
          Décision : En attente
        </p>

      </div>

      <div className="card">

        <h2>
          Documents déposés
        </h2>

        <ul>

          <li>Carte identité</li>

          <li>Fiche de paie</li>

          <li>Relevé bancaire</li>

        </ul>

      </div>

      <div className="card">

        <h2>
          Décision Comité
        </h2>

        <p>
          Non traitée
        </p>

      </div>

      <button
      className="btn-primary"
      onClick={() =>
        validateDocument(doc.id)
      }
      >
      Valider
      </button>

      <button className="btn-primary">

        Télécharger PDF

      </button>

    </div>

  );

}

export default ClientDetail;