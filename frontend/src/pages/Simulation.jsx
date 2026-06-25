import { useState } from "react";
import api from "../services/api";

function Simulation() {

    const [form, setForm] = useState({
        client_id: "",
        prix_bien: "",
        salaire_acheteur: "",
        salaire_co_acheteur: "",
        credit_consomme: "",
        duree_mois: ""
    });

    const [resultat, setResultat] =
        useState(null);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log("DONNEES ENVOYEES :", form);

        try {

            const res = await api.post(
                "simulation/create/",
                form
            );

            console.log("REPONSE API :", res.data);

            setResultat(res.data);

        } catch (error) {

            console.log(error);
            alert("Erreur simulation");
        }
    };


    
    return (
    <div>
        <h1>TEST SIMULATION</h1>
    </div>
);
}

export default Simulation;