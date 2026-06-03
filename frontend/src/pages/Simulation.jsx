import { useState } from "react";
import api from "../services/api";

function Simulation() {

    const [form, setForm] = useState({
        client_id: "",
        prix_bien: "",
        apport: "",
        marge: "",
        duree_mois: ""
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

            const res = await api.post(
                "simulation/create/",
                form
            );

            setResultat(res.data);

        } catch (error) {

            console.log(error);
            alert("Erreur simulation");
        }
    };

    return (
        <div>

            <h1>Simulation Murabaha</h1>

            <form onSubmit={handleSubmit}>

                <input
                    name="client_id"
                    placeholder="Client ID"
                    onChange={handleChange}
                />

                <input
                    name="prix_bien"
                    placeholder="Prix du bien"
                    onChange={handleChange}
                />

                <input
                    name="apport"
                    placeholder="Apport"
                    onChange={handleChange}
                />

                <input
                    name="marge"
                    placeholder="Marge (%)"
                    onChange={handleChange}
                />

                <input
                    name="duree_mois"
                    placeholder="Durée (mois)"
                    onChange={handleChange}
                />

                <button type="submit">
                    Calculer
                </button>

            </form>

            {resultat && (

                <div>

                    <h2>Résultat</h2>

                    <p>
                        Montant financé :
                        {resultat.montant_finance}
                    </p>

                    <p>
                        Prix final :
                        {resultat.prix_final}
                    </p>

                    <p>
                        Mensualité :
                        {resultat.mensualite}
                    </p>

                </div>

            )}

        </div>
    );
}

export default Simulation;