import "../../styles/dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-section">
          <div className="logo-title">ChequeFlow AI</div>
          <div className="logo-subtitle">
            Cheque Management System
          </div>
        </div>

        <div className="menu-item active">Dashboard</div>
        <div className="menu-item">Cheques</div>
        <div className="menu-item">Security Cheques</div>
        <div className="menu-item">Parties</div>
        <div className="menu-item">Reports</div>
        <div className="menu-item">Users</div>
        <div className="menu-item">Settings</div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Welcome back, Demo User
        </p>

        {/* Stat Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-title">Total Credit</div>
            <div className="stat-value">₹45,75,000</div>
            <div className="stat-growth">+12.5%</div>
          </div>

          <div className="stat-card">
            <div className="stat-title">Total Debit</div>
            <div className="stat-value">₹32,40,000</div>
            <div className="stat-growth">+8.2%</div>
          </div>

          <div className="stat-card">
            <div className="stat-title">Pending Cheques</div>
            <div className="stat-value">32</div>
          </div>

          <div className="stat-card">
            <div className="stat-title">Overdue Cheques</div>
            <div className="stat-value">7</div>
          </div>
        </div>

        {/* Widgets */}
        <div className="dashboard-grid">

          <div className="widget-card">
            <div className="widget-title">
              Cheque Status Overview
            </div>
            <p>Pie Chart Here</p>
          </div>

          <div className="widget-card">
            <div className="widget-title">
              Upcoming Cheques
            </div>

            <div className="cheque-item">
              <span className="party-name">
                ABC Enterprises
              </span>

              <span className="amount">
                ₹1,25,000
              </span>
            </div>
          </div>

          <div className="widget-card">
            <div className="widget-title">
              Recent Activities
            </div>

            <p>Cheque uploaded</p>
            <p>Status updated</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;