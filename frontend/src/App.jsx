import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import UsersManagement from "./pages/UsersManagement";
import ProductsManagement from "./pages/ProductsManagement";
import Cart from "./pages/Cart";
import Simulation from "./pages/Simulation";
import Scoring from "./pages/Scoring";
import ScoringConfig from "./pages/ScoringConfig";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import ClientDetail from "./pages/ClientDetail";
import ClientDashboard from "./pages/ClientDashboard";

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
          path="/my-folder"
          element={
            <Layout>
              <ClientDashboard />
            </Layout>
          }
        />

        <Route
          path="/admin/users"
          element={
            <Layout>
              <UsersManagement />
            </Layout>
          }
        />

        <Route
          path="/admin/products"
          element={
            <Layout>
              <ProductsManagement />
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