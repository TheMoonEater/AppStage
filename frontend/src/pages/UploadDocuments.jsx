import { useState } from "react";
import api from "../services/api";

function UploadDocuments({ clientId }) {

  const [file, setFile] = useState(null);

  const [type, setType] = useState("CNI");

  const upload = async () => {

    const formData = new FormData();

    formData.append(
      "client",
      clientId
    );

    formData.append(
      "type_document",
      type
    );

    formData.append(
      "fichier",
      file
    );

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

  };

  return (

    <div className="card">

      <h3>
        Déposer document
      </h3>

      <select
        onChange={(e)=>
          setType(e.target.value)
        }
      >
        <option value="CNI">
          Carte identité
        </option>

        <option value="FICHE_PAIE">
          Fiche de paie
        </option>

        <option value="RIB">
          RIB
        </option>

      </select>

      <input
        type="file"
        onChange={(e)=>
          setFile(
            e.target.files[0]
          )
        }
      />

      <button
        className="btn-primary"
        onClick={upload}
      >
        Envoyer
      </button>

    </div>

  );
}

export default UploadDocuments;