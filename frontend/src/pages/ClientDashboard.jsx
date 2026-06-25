import { useEffect, useState } from "react";
import api from "../services/api";

function ClientDashboard() {

  const [client, setClient] =
    useState(null);

  const [documents, setDocuments] =
    useState([]);

  const [file, setFile] =
    useState(null);

  const [typeDocument, setTypeDocument] =
    useState("CNI");

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      const clientRes =
        await api.get("clients/me/");

      setClient(clientRes.data);

      const docsRes =
        await api.get("documents/");

      setDocuments(docsRes.data);

    } catch (error) {

      console.log(error);

    }

  };

  const uploadDocument =
    async () => {

      if (!file) {

        alert(
          "Choisissez un fichier"
        );

        return;
      }

      const formData =
        new FormData();

      formData.append(
        "fichier",
        file
      );

      formData.append(
        "type_document",
        typeDocument
      );

      try {

        await api.post(
          "documents/",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data"
            }
          }
        );

        alert(
          "Document envoyé"
        );

        loadData();

      } catch (error) {

        console.log(error);

      }

    };

  if (!client)
    return <h2>Chargement...</h2>;

  return (

    <div className="client-dashboard">

      <h1>
        Mon dossier
      </h1>

      <div className="dashboard-card">

        <h2>Mon Compte</h2>

        <p>
          Nom :
          {" "}
          {client.nom}
        </p>

        <p>
          Prénom :
          {" "}
          {client.prenom}
        </p>

        <p>
          Email :
          {" "}
          {client.email}
        </p>

        <p>
          Téléphone :
          {" "}
          {client.telephone}
        </p>

        <p>
          Date naissance :
          {" "}
          {client.date_naissance}
        </p>

        <p>
          Mot de passe :
          ********
        </p>

      </div>

      <div className="dashboard-card">

        <h2>Identification</h2>

        <p>
          Âge : {client.age} ans
        </p>

        <p>
          Situation familiale :
          {" "}
          {client.situation_familiale}
        </p>

        <p>
          Personnes à charge :
          {" "}
          {client.nombre_personnes_charge}
        </p>

        <p>
          Habitation :
          {" "}
          {client.habitation}
        </p>

        <p>
          Niveau instruction :
          {" "}
          {client.niveau_instruction}
        </p>

      </div>

      <div className="dashboard-card">

        <h2>
          Situation professionnelle
        </h2>

        <p>
          Secteur :
          {" "}
          {client.secteur_activite}
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
          {" "}
          ans
        </p>

      </div>

      <div className="dashboard-card">

        <h2>
          Situation financière
        </h2>

        <p>
          Salaire :
          {" "}
          {client.salaire_mensuel}
          {" "}
          DA
        </p>

        <p>
          Autres revenus :
          {" "}
          {client.autres_revenus}
          {" "}
          DA
        </p>

        <p>
          Charges :
          {" "}
          {client.charges_mensuelles}
          {" "}
          DA
        </p>

        <p>
          Crédits en cours :
          {" "}
          {client.credits_en_cours}
          {" "}
          DA
        </p>

      </div>

      <div className="dashboard-card">

        <h2>
          Mes documents
        </h2>

        {

          documents.length === 0 ? (

            <p>
              Aucun document
            </p>

          ) : (

            documents.map(doc => (

              <p key={doc.id}>

                📄

                {" "}

                {doc.fichier
                  .split("/")
                  .pop()}

              </p>

            ))

          )

        }

      </div>

      <div className="dashboard-card">

        <input
          type="file"
          onChange={(e) =>
            setFile(
              e.target.files[0]
            )
          }
        />

        <br />
        <br />

        <label>
          Type :
        </label>

        <select
          value={typeDocument}
          onChange={(e) =>
            setTypeDocument(
              e.target.value
            )
          }
        >

          <option value="CNI">
            Carte identité
          </option>

          <option value="PAIE">
            Fiche de paie
          </option>

          <option value="TRAVAIL">
            Attestation travail
          </option>

          <option value="AUTRE">
            Autre
          </option>

        </select>

        <br />
        <br />

        <button
          className="btn-primary"
          onClick={uploadDocument}
        >
          Envoyer
        </button>

      </div>

    </div>

  );
}

export default ClientDashboard;