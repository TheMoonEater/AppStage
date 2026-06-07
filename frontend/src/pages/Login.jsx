import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    const response = await fetch(
      "http://127.0.0.1:8000/api/auth/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      }
    );

    const data = await response.json();

    if (response.ok) {

      localStorage.setItem(
        "token",
        data.access
      );

      navigate("/home");

    } else {

      alert("Identifiants incorrects");

    }
  };

  return (

    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">

          <h1>Al Salam Bank</h1>

          <p>
            Plateforme de financement islamique
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>
              Nom d'utilisateur
            </label>

            <input
              type="text"
              placeholder="Votre identifiant"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

          </div>

          <div className="form-group">

            <label>
              Mot de passe
            </label>

            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          <button
            className="login-btn"
            type="submit"
          >
            Se connecter
          </button>

          <p
            style={{
              textAlign:"center",
              marginTop:"20px"
            }}
          >

            Pas de compte ?

            <Link
              to="/register"
              style={{
                color:"#F2643B",
                marginLeft:"5px"
              }}
            >
              Créer un compte
            </Link>

          </p>

        </form>

      </div>

    </div>

  );
}

export default Login;