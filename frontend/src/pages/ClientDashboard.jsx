import { useEffect, useState } from "react";
import api from "../services/api";

function ClientDashboard() {

  const [client, setClient] =
    useState(null);

  const [form, setForm] = useState({});

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
      setForm(clientRes.data);

      const docsRes =
        await api.get("documents/");

      setDocuments(docsRes.data.results);

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

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

    const deleteDocument = async (id) => {

      if (!window.confirm("Supprimer ce document ?"))
        return;

      try {

        await api.delete(`documents/${id}/`);

        alert("Document supprimé");

        loadData();

      } catch (error) {

        console.log(error);

        alert("Erreur");

      }

    };

    const save = async () => {

        try {

            await api.patch(
                "clients/me/",
                form
            );

            alert("Informations enregistrées");

            loadData();

        } catch (error) {

            console.log(error);

            alert("Erreur lors de l'enregistrement");

        }

    };

  if (!client)
    return <h2>Chargement...</h2>;

  const typesDocuments = {
  CNI: "Carte d'identité",
  PAIE: "Fiche de paie",
  TRAVAIL: "Attestation de travail",
  JUSTIFICATIF: "Justificatif",
  AUTRE: "Autre",
};

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
         Age : {client.age} ans
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

                <div
                  key={doc.id}
                  className="document-item"
                >

                  <span>
                    <strong>{typesDocuments[doc.type_document]}</strong>
                    <br />
                    {doc.fichier.split("/").pop()}
                  </span>

                  <div className="document-actions">

                    <a
                      href={"http://127.0.0.1:8000" + doc.fichier}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-download"
                    >
                      Télécharger
                    </a>

                    <button
                      className="btn-delete"
                      onClick={() => deleteDocument(doc.id)}
                    >
                      Supprimer
                    </button>

                  </div>

                </div>

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


        <div className="dashboard-card">

        <h2>Modifier les informations</h2>

        <h3>Mon Compte </h3>

        <div className="form-group">

        <label>
          Nom :
        </label>  

        <input
          type="text"
          name="nom"
          value={form.nom || ""}
          onChange={handleChange}
        />
        </div>

        <div className="form-group">

        <label>
          Prénom :
        </label>    

        <input
          type="text"
          name="prenom"
          value={form.prenom || ""}
          onChange={handleChange}
        />  
        </div>

        <div className="form-group">

        <label>
          Email :
        </label>  

        <input
          type="email"
          name="email"
          value={form.email || ""}
          onChange={handleChange}
        />
        </div>

        <div className="form-group">

        <label>
          Téléphone :
        </label>  

        <input
          type="text"
          name="telephone"
          value={form.telephone || ""}
          onChange={handleChange}
        />
        </div>

        <div className="form-group">

        <label>
          Date de naissance :
        </label>  

        <input
          type="date"
          name="date_naissance"
          value={form.date_naissance || ""}
          onChange={handleChange}
        />
        </div>

        <div className="form-group">

        <label>
          Mot de passe :
        </label>

        <input
          type="password"
          name="password"
          value={form.password || ""}
          onChange={handleChange}
        />
        </div>

        <h3>Identification  </h3>

        <div className="form-group">
          <label>
          Situation familiale :
        </label>

        <select
              name="situation_familiale"
              value={form.situation_familiale || ""}
              onChange={handleChange}
          >

          <option value="CELIBATAIRE">Célibataire</option>

          <option value="MARIE">Marié</option>

          <option value="DIVORCE">Divorcé</option>

          </select>

          </div>

          <div className="form-group">
          <label>
          Personnes à charge :
        </label>

          <input
            type="number"
            name="nombre_personnes_charge"
            value={form.nombre_personnes_charge || ""}
            onChange={handleChange}
            />

            </div>

            <div className="form-group">
          <label>
          Habitation :
        </label>

            <select
            name="habitation"
            value={form.habitation || ""}
            onChange={handleChange}
            >

            <option value="Proprietaire">Propriétaire</option>

            <option value="Locataire">Locataire</option>

            <option value="Familiale">Familiale</option>

            </select>

            </div>

            <div className="form-group">
          <label>
          Niveau instruition :
        </label>

            <select
              name="niveau_instruction"
              value={form.niveau_instruction || ""}
              onChange={handleChange}
              >

              <option value="Primaire">Primaire</option>

              <option value="Secondaire">Secondaire</option>

              <option value="Universitaire">Universitaire</option>

              <option value="Master">Master</option>

              <option value="Doctorat">Doctorat</option>

              </select>

              </div>


          <h3>Situation professionnelle</h3>

          <div className="form-group">
          <label>
          Secteur d'activité :
        </label>

            <select
              name="secteur_activite"
              value={form.secteur_activite || ""}
              onChange={handleChange}
              >

              <option value="Public">Public</option>

              <option value="Privé">Privé</option>

              </select>

              </div>

              <div className="form-group">
          <label>
          Type de contrat :
        </label>

            <select
              name="type_contrat"
              value={form.type_contrat || ""}
              onChange={handleChange}
              >

              <option value="CDI">CDI</option>

              <option value="CDD">CDD</option>

              <option value="Fonctionnaire">Fonctionnaire</option>

              </select>

              </div>

              <div className="form-group">
          <label>
          Ancienneté :
        </label>

          <input
              type="number"
              name="anciennete_annees"
              value={form.anciennete_annees || ""}
              onChange={handleChange}
            />
          </div>

            

            <div className="form-group">
          <label>
          Personnes à charge :
        </label>

          <input
            type="number"
            name="salaire_mensuel"
            value={form.salaire_mensuel || ""}
            onChange={handleChange}
            />

            </div>

            <div className="form-group">
          <label>
          Autres revenus :
        </label>

          <input
            type="number"
            name="autres_revenus"
            value={form.autres_revenus || ""}
            onChange={handleChange}
            />

            </div>

            <div className="form-group">
          <label>
          Charges mensuelles :
        </label>

          <input
            type="number"
            name="charges_mensuelles"
            value={form.charges_mensuelles || ""}
            onChange={handleChange}
            />

            </div>

            <div className="form-group">
          <label>
          Crédits en cours :
        </label>

          <input
            type="number"
            name="credits_en_cours"
            value={form.credits_en_cours || ""}
            onChange={handleChange}
            />

            </div>
          




        <button
          className="btn-primary"
          onClick={save}
        >
          Enregistrer
        </button>





    </div>

    </div>

  );
}

export default ClientDashboard;