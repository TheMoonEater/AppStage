import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

      nom: "",
      prenom: "",
      username: "",
      email: "",
      phone: "",
      date_naissance: "",
      numero_cni: "",
      password: "",
      confirmPassword: ""

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      alert(
        "Les mots de passe ne correspondent pas"
      );

      return;
    }

    const response = await fetch(

      "http://127.0.0.1:8000/api/auth/register/",

      {

        method: "POST",

        headers: {
          "Content-Type":
          "application/json"
        },

        body: JSON.stringify({

            nom: formData.nom,
            prenom: formData.prenom,
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            date_naissance: formData.date_naissance,
            numero_cni: formData.numero_cni,
            password: formData.password

          })

      }

    );

    const data =
      await response.json();

    if (response.ok) {

      alert(
        "Compte créé avec succès"
      );

      navigate("/");

    } else {

      console.log(data);

      alert(
        "Erreur lors de l'inscription"
      );

    }

  };

  return (

    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">

          <h1>
            Créer un compte
          </h1>

          <p>
            Rejoignez Al Salam Bank
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="nom"
            placeholder="Nom"
            onChange={handleChange}
          />

          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Téléphone"
            onChange={handleChange}
          />

          <input
            type="date"
            name="date_naissance"
            onChange={handleChange}
          />

          <input
            type="text"
            name="numero_cni"
            placeholder="Numéro carte nationale"
            onChange={handleChange}
          />

          <input
            type="text"
            name="username"
            placeholder="Nom utilisateur"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer le mot de passe"
            onChange={handleChange}
          />

          <button
            className="login-btn"
          >
            Créer le compte
          </button>

        </form>

        <p
          style={{
            marginTop:"20px",
            textAlign:"center"
          }}
        >

          Déjà inscrit ?

          <Link
            to="/"
            style={{
              color:"#F2643B",
              marginLeft:"5px"
            }}
          >
            Se connecter
          </Link>

        </p>

      </div>

    </div>

  );
}

export default Register;