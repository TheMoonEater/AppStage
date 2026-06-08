import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role") || "CLIENT";

  const logout = () => {

    localStorage.clear();
    navigate("/");
  };

  return (

    <nav className="navbar">

      <Link to="/home" className="navbar-logo">
        <img src={logo} alt="Al Salam Bank" />
      </Link>

      <div className="navbar-links">

        <Link to="/home">
          Accueil
        </Link>

        <Link to="/cart">
          Panier
        </Link>

        <Link to="/scoring">
          Scoring
        </Link>

        {role === "CLIENT" && (
          <Link to="/dashboard">
            Mon dossier
          </Link>
        )}

        {["EMPLOYE", "RETAIL", "COMITE", "ADMIN"].includes(role) && (
          <>
            <Link to="/clients">
              Clients
            </Link>

            <Link to="/dashboard">
              Dashboard
            </Link>
          </>
        )}



        {["ADMIN", "RETAIL"].includes(role) && (

          <Link to="/scoring-config">
            Paramètres scoring
          </Link>

        )}

        <button
          className="logout-btn"
          onClick={logout}
        >
          Déconnexion
        </button>

      </div>

    </nav>

  );
}

export default Navbar;