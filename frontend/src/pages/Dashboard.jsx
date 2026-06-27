import { useEffect, useState } from "react";
import api from "../services/api";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#f59e0b",
  "#7c3aed"
];

function Dashboard() {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      const res = await api.get(
        "dashboard/stats/"
      );

      console.log(res.data);

      setDashboard(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  if (!dashboard) {

    return <h2>Chargement...</h2>;

  }

  const stats = dashboard.stats;

  const pieData = [

    {
      name: "Eligibles",
      value: dashboard.scoring.ELIGIBLE
    },

    {
      name: "A analyser",
      value: dashboard.scoring.A_ANALYSER
    },

    {
      name: "Refusés",
      value: dashboard.scoring.REFUSE
    }

  ];

    return (

    <div className="dashboard-container">

      <h1 className="dashboard-title">

        Tableau de bord

      </h1>

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-title">

          <h3>👥 Clients</h3>

          </div>

          <div className="stat-value">
            {stats.total_clients}
        </div>

        </div>

        <div className="stat-card">

          <h3> Demandes</h3>

          <div className="stat-value">
            {stats.total_demandes}
        </div>

        </div>

        <div className="stat-card">

          <h3> Acceptées</h3>

          <div className="stat-value">
            {stats.accepted}
        </div>

        </div>

        <div className="stat-card">

          <h3> Refusées</h3>

          <div className="stat-value">
            {stats.refused}
        </div>

        </div>

        <div className="stat-card">

          <h3> Montant financé</h3>

          <h2>

            {Number(stats.total_financed).toLocaleString()} DA

          </h2>

        </div>

        <div className="stat-card">

          <h3> Score moyen</h3>

          <h2>

            {stats.average_score}

          </h2>

        </div>

        <div className="stat-card acceptance">

          <h3> Taux d'acceptation</h3>

          <h2>

            {stats.acceptance_rate}%

          </h2>

        </div>

      </div>

      <div className="charts-grid">

                <div className="chart-card">

          <h2>

             Évolution des simulations

          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <LineChart
              data={
                dashboard.simulations_par_mois
              }
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="mois"
              />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="total"
                stroke="#2563eb"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

                <div className="chart-card">

          <h2>

             Décisions de scoring

          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >

                {

                  pieData.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                            COLORS.length
                          ]
                        }
                      />

                    )
                  )

                }

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="chart-card">

          <h2>

             Produits demandés

          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <BarChart
              data={
                dashboard.categories
              }
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="categorie"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="total"
                fill="#2563eb"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="tables-grid">

                <div className="table-card">

          <h2>

             Dernières demandes

          </h2>

          <table className="history-table">

            <thead>

              <tr>

                <th>Client</th>

                <th>Produit</th>

                <th>Statut</th>

              </tr>

            </thead>

            <tbody>

              {

                dashboard.dernieres_demandes.map(
                  (item) => (

                    <tr key={item.id}>

                      <td>

                        {item.client}

                      </td>

                      <td>

                        {item.produit}

                      </td>

                      <td>

                        {item.statut}

                      </td>

                    </tr>

                  )
                )

              }

            </tbody>

          </table>

        </div>

        <div className="table-card">

          <h2>

             Derniers clients inscrits

          </h2>

          <table className="history-table">

            <thead>

              <tr>

                <th>Nom</th>

                <th>Email</th>

                <th>Inscription</th>

              </tr>

            </thead>

            <tbody>

              {

                dashboard.derniers_clients.map(
                  (client) => (

                    <tr key={client.id}>

                      <td>

                        {client.prenom} {client.nom}

                      </td>

                      <td>

                        {client.email}

                      </td>

                      <td>

                        {

                          new Date(
                            client.created_at
                          ).toLocaleDateString()

                        }

                      </td>

                    </tr>

                  )
                )

              }

            </tbody>

          </table>

        </div>

        

      </div>

    </div>

  );

}

export default Dashboard;


   


   

