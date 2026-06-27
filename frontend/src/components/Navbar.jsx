import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import logo from "../assets/logo.png";

function Navbar() {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const role =
    localStorage.getItem("role") || "CLIENT";

  const logout = () => {

    localStorage.clear();

    navigate("/");
  };

  const closeMenu = () => {

    setMenuOpen(false);
  };

  return (

    <nav className="navbar">

      <Link
        to="/home"
        className="navbar-logo"
        onClick={closeMenu}
      >
        <img
          src={logo}
          alt="Al Salam Bank"
        />
      </Link>

      {/* Bouton Hamburger */}

      <button
        className="menu-toggle"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div
        className={`navbar-links ${
          menuOpen ? "active" : ""
        }`}
      >

        <Link
          to="/home"
          onClick={closeMenu}
        >
          Accueil
        </Link>

        {/* PANIER UNIQUEMENT CLIENT */}

        {role === "CLIENT" && (

          <Link
            to="/cart"
            onClick={closeMenu}
          >
            Panier
          </Link>

        )}

        <Link
          to="/scoring"
          onClick={closeMenu}
        >
          Scoring
        </Link>

        {role === "CLIENT" && (

          <Link
            to="/my-folder"
            onClick={closeMenu}
          >
            Mon dossier
          </Link>

        )}

        {[
          "EMPLOYE",
          "RETAIL",
          "COMITE",
          "ADMIN"
        ].includes(role) && (

          <>
            <Link
              to="/clients"
              onClick={closeMenu}
            >
              Clients
            </Link>

            <Link
              to="/dashboard"
              onClick={closeMenu}
            >
              Dashboard
            </Link>
          </>

        )}

        {[
          "ADMIN",
          "RETAIL"
        ].includes(role) && (

          <>

            <Link
              to="/admin/products"
              onClick={closeMenu}
            >
              Produits
            </Link>

            <Link
              to="/scoring-config"
              onClick={closeMenu}
            >
              Paramètres scoring
            </Link>

          </>

        )}

        {role === "ADMIN" && (

          <Link
            to="/admin/users"
            onClick={closeMenu}
          >
            Utilisateurs
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