function Dashboard() {

  return (

    <div className="dashboard">

      <h1 className="dashboard-title">
        Dashboard
      </h1>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Simulations</h3>
          <span>12</span>
        </div>

        <div className="stat-card">
          <h3>Commandes</h3>
          <span>4</span>
        </div>

        <div className="stat-card">
          <h3>Acceptées</h3>
          <span>3</span>
        </div>

        <div className="stat-card">
          <h3>Refusées</h3>
          <span>1</span>
        </div>

      </div>

    </div>

  );
}

export default Dashboard;