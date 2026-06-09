import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Simulation from "./pages/Simulation";
import Scoring from "./pages/Scoring";
import ScoringConfig from "./pages/ScoringConfig";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import ClientDetail from "./pages/ClientDetail";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Layout><Home /></Layout>} />

        <Route
          path="/product/:id"
          element={
            <Layout>
              <ProductDetail />
            </Layout>
          }
        />

        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />

        <Route path="/simulation/:id" element={<Simulation />} />

        <Route
          path="/scoring"
          element={
            <Layout>
              <Scoring />
            </Layout>
          }
        />

        <Route
          path="/scoring-config"
          element={<Layout><ScoringConfig /></Layout>}
        />

        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/clients"
          element={<Layout><Clients /></Layout>}
        />

        <Route
          path="/clients/:id"
          element={<Layout><ClientDetail /></Layout>}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;