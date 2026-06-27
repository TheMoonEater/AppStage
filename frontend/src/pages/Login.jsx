import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import bg1 from "../assets/login/bg1.jpg";
import bg2 from "../assets/login/bg2.jpg";
import bg3 from "../assets/login/bg3.jpg";


function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const images = [
    bg1,
    bg2,
    bg3
  ];

  const [currentImage, setCurrentImage] =
    useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentImage((prev) =>
        (prev + 1) % images.length
      );

    }, 10000);

    return () => clearInterval(interval);

  }, []);

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

    console.log("LOGIN =", data);

    if (response.ok) {

      localStorage.setItem(
        "token",
        data.access
      );

      localStorage.setItem(
        "role",
        data.role
      );

      localStorage.setItem(
        "user_id",
        data.id
      );

      navigate("/home");

    } else {

      alert("Identifiants incorrects");

    }
  };

  return (

    <div
      className="login-page"
      style={{
        backgroundImage:
          `url(${images[currentImage]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        transition: "background-image 1.5s ease-in-out",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "rgba(0,0,0,0.45)"
        }}
      />

      <div
        className="login-card"
        style={{
          position: "relative",
          zIndex: 2
        }}
      >

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
              textAlign: "center",
              marginTop: "20px"
            }}
          >

            Pas de compte ?

            <Link
              to="/register"
              style={{
                color: "#F2643B",
                marginLeft: "5px"
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