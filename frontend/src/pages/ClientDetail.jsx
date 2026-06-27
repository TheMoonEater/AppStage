import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function ClientDetail() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [dossier, setDossier] = useState(null);

  useEffect(() => {

    loadDossier();

  }, [id]);

  const loadDossier = async () => {

    try {

      const res = await api.get(
        `clients/${id}/dossier/`
      );

      setDossier(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const downloadPdf = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/api/clients/${id}/pdf/`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      const blob =
        await response.blob();

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      const client =
        dossier.client;

      link.download =
        `Dossier_${client.nom}_${client.prenom}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

    } catch (error) {

      console.log(error);

    }

  };

  if (!dossier) {

    return <h2>Chargement...</h2>;

  }

  const client = dossier.client;

  return (

    <div className="page-container">

      <button
        className="btn-secondary"
        onClick={() =>
          navigate("/clients")
        }
      >
        ← Retour à la liste
      </button>

      <h1>
        Dossier Client
      </h1>

      {/* ========================= */}
      {/* INFORMATIONS CLIENT */}
      {/* ========================= */}

      <div className="card">

        <h2>
          {client.prenom} {client.nom}
        </h2>

        <p>
          Age :
          {" "}
          {client.age}
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
          Adresse :
          {" "}
          {client.adresse}
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

      {/* ========================= */}
      {/* PROFESSIONNEL */}
      {/* ========================= */}

      <div className="card">

        <h2>
          Situation Professionnelle
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

      {/* ========================= */}
      {/* FINANCIER */}
      {/* ========================= */}

      <div className="card">

        <h2>
          Situation Financière
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

      {/* ========================= */}
      {/* DERNIER SCORING */}
      {/* ========================= */}

      <div className="card">

        <h2>
          Dernier Scoring
        </h2>

        {

          dossier.dernier_scoring ? (

            <>

              <p>
                Score :
                {" "}
                {
                  dossier
                  .dernier_scoring
                  .score
                }
              </p>

              <p>
                Décision :
                {" "}
                {
                  dossier
                  .dernier_scoring
                  .decision
                }
              </p>

              <p>
                Taux endettement :
                {" "}
                {
                  dossier
                  .dernier_scoring
                  .taux_endettement
                }
                %
              </p>

            </>

          ) : (

            <p>
              Aucun scoring
            </p>

          )

        }

      </div>

      {/* ========================= */}
      {/* HISTORIQUE */}
      {/* ========================= */}

      <div className="card">

        <h2>
          Historique des scorings
        </h2>

        {

          dossier.historique_scoring
            .length === 0 ? (

            <p>
              Aucun scoring
            </p>

          ) : (

            <div
              style={{
                overflowX: "auto"
              }}
            >

              <table
                className="history-table"
              >

                <thead>

                  <tr>

                    <th>ID</th>

                    <th>Score</th>

                    <th>Décision</th>

                    <th>Date</th>

                  </tr>

                </thead>

                <tbody>

                  {

                    dossier
                      .historique_scoring
                      .map(item => (

                        <tr
                          key={item.id}
                        >

                          <td>
                            {item.id}
                          </td>

                          <td>
                            {item.score}
                          </td>

                          <td>
                            {item.decision}
                          </td>

                          <td>

                            {
                              new Date(
                                item.date
                              )
                              .toLocaleDateString()
                            }

                          </td>

                        </tr>

                      ))

                  }

                </tbody>

              </table>

            </div>

          )

        }

      </div>

      {/* ========================= */}
      {/* DOCUMENTS */}
      {/* ========================= */}

      <div className="card">

        <h2>
          Documents déposés
        </h2>

        {

          dossier.documents
            .length === 0 ? (

            <p>
              Aucun document
            </p>

          ) : (

            dossier.documents.map(
              doc => (

                <div
                  key={doc.id}
                  style={{
                    marginBottom:
                      "10px"
                  }}
                >

                  <a
                    href={
                      "http://127.0.0.1:8000"
                      + doc.fichier
                    }
                    target="_blank"
                    rel="noreferrer"
                  >

                    📄
                    {" "}
                    {
                      doc.type_document
                    }

                  </a>

                  <span
                    style={{
                      marginLeft:
                        "10px"
                    }}
                  >

                    {
                      doc.valide
                        ? "✅ Validé"
                        : "⏳ En attente"
                    }

                  </span>

                </div>

              )
            )

          )

        }

      </div>

      {/* ========================= */}
      {/* PDF */}
      {/* ========================= */}

      <div
        style={{
          textAlign: "center",
          marginTop: "20px"
        }}
      >

        <button
          className="btn-primary"
          onClick={downloadPdf}
        >

          Télécharger PDF

        </button>

      </div>

    </div>

  );

}

export default ClientDetail;