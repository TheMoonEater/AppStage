import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav className="navbar">

      <h2>Al Salam Bank</h2>

      <div className="navbar-links">

        <Link to="/home">Accueil</Link>

        <Link to="/cart">Panier</Link>

        <Link to="/scoring">Scoring</Link>

        <Link to="/dashboard">Dashboard</Link>

      </div>

    </nav>

  );
}

export default Navbar;