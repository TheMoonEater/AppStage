import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Clients() {

  const [clients, setClients] = useState([]);

  useEffect(() => {

    api.get("clients/")
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (

    <div className="page-container">

      <h1>
        Gestion des clients
      </h1>

      <div className="table-container">

        <table className="clients-table">

          <thead>

            <tr>

              <th>Nom</th>

              <th>Salaire</th>

              <th>Contrat</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {clients.map((client) => (

              <tr key={client.id}>

                <td>
                  {client.prenom} {client.nom}
                </td>

                <td>
                  {client.salaire_mensuel} DA
                </td>

                <td>
                  {client.type_contrat}
                </td>

                <td>

                  <Link
                    to={`/clients/${client.id}`}
                    className="btn-primary"
                  >
                    Voir dossier
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Clients;