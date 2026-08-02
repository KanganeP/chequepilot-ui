import { useState } from "react";
import "../../styles/dashboard.css";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";

import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---------- Static / mock data (wire up to real API later) ---------- */

const navItems = [
  { label: "Dashboard", icon: DashboardRoundedIcon, to: "/dashboard" },
  { label: "Cheques", icon: ReceiptLongRoundedIcon, to: "/upload-cheques" },
  { label: "Security Cheques", icon: VerifiedUserRoundedIcon, to: "/security-cheques" },
  { label: "Parties", icon: GroupsRoundedIcon, to: "/parties" },
  { label: "Transactions", icon: SwapHorizRoundedIcon, to: "/transactions" },
  { label: "Reports", icon: AssessmentRoundedIcon, to: "/reports" },
];

const bottomNavItems = [
  { label: "Notifications", icon: NotificationsRoundedIcon, to: "/notifications", badge: 8 },
  { label: "Users", icon: PeopleAltRoundedIcon, to: "/users" },
  { label: "Settings", icon: SettingsRoundedIcon, to: "/settings" },
  { label: "Activity Log", icon: HistoryRoundedIcon, to: "/activity-log" },
];

const chequeStatusData = [
  { name: "Pending", value: 32, color: "#F5A623" },
  { name: "Due Today", value: 12, color: "#3E7BFA" },
  { name: "Overdue", value: 7, color: "#EF4444" },
  { name: "Cleared", value: 68, color: "#22A366" },
  { name: "Bounced", value: 5, color: "#7C3AED" },
  { name: "Security", value: 4, color: "#06B6D4" },
];
const totalCheques = chequeStatusData.reduce((sum, d) => sum + d.value, 0);

const trendData = [
  { date: "21 May", credit: 12, debit: 6 },
  { date: "23 May", credit: 14, debit: 7 },
  { date: "26 May", credit: 15, debit: 8 },
  { date: "28 May", credit: 18, debit: 9 },
  { date: "31 May", credit: 17, debit: 10 },
  { date: "03 Jun", credit: 19, debit: 11 },
  { date: "05 Jun", credit: 20, debit: 12 },
  { date: "08 Jun", credit: 22, debit: 13 },
  { date: "10 Jun", credit: 38, debit: 24 },
  { date: "12 Jun", credit: 36, debit: 23 },
  { date: "15 Jun", credit: 35, debit: 22 },
  { date: "18 Jun", credit: 37, debit: 26 },
  { date: "21 Jun", credit: 39, debit: 25 },
];

const upcomingCheques = [
  { date: "22", month: "MAY", party: "ABC Enterprises", bank: "HDFC Bank", ref: "554421", amount: "₹1,25,000", status: "Due Tomorrow", tone: "warn" },
  { date: "23", month: "MAY", party: "Shree Traders", bank: "ICICI Bank", ref: "123456", amount: "₹75,000", status: "In 2 Days", tone: "info" },
  { date: "24", month: "MAY", party: "Kumar Distributors", bank: "Axis Bank", ref: "987654", amount: "₹2,50,000", status: "In 3 Days", tone: "info" },
  { date: "25", month: "MAY", party: "Global Solutions", bank: "SBI Bank", ref: "112233", amount: "₹1,10,000", status: "In 4 Days", tone: "info" },
];

const activities = [
  {
    icon: AddCircleRoundedIcon,
    tone: "add",
    title: "New cheque uploaded",
    detail: "Cheque No. 554421 by Ramesh",
    time: "21 May 2025, 10:30 AM",
  },
  {
    icon: EditRoundedIcon,
    tone: "edit",
    title: "Cheque status updated",
    detail: "Cheque No. 123456 marked as Cleared",
    time: "21 May 2025, 10:15 AM",
  },
  {
    icon: CancelRoundedIcon,
    tone: "bounce",
    title: "Cheque bounced",
    detail: "Cheque No. 778899 bounced",
    time: "21 May 2025, 09:45 AM",
  },
  {
    icon: ShieldRoundedIcon,
    tone: "security",
    title: "Security cheque added",
    detail: "For party - XYZ Traders",
    time: "21 May 2025, 09:30 AM",
  },
];

const chequeSummary = [
  { label: "Total Cheques", value: 128 },
  { label: "Credit Cheques", value: 78, tone: "credit" },
  { label: "Debit Cheques", value: 45, tone: "debit" },
  { label: "Security Cheques", value: 5, tone: "security" },
];

/* ---------- Small presentational helpers ---------- */

function StatCard({ title, value, growth, growthLabel, iconBg, icon: Icon, iconColor }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span className="stat-title">{title}</span>
        <span className="stat-icon" style={{ background: iconBg, color: iconColor }}>
          <Icon fontSize="small" />
        </span>
      </div>
      <div className="stat-value">{value}</div>
      {growth && (
        <div className={`stat-growth ${growth.startsWith("-") ? "negative" : "positive"}`}>
          {growth} <span className="stat-growth-label">{growthLabel}</span>
        </div>
      )}
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-label">{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="chart-tooltip-row">
          <span className="dot" style={{ background: p.color }} />
          {p.name}: ₹{p.value}L
        </div>
      ))}
    </div>
  );
}

/* ---------- Main component ---------- */

function Dashboard() {
  const [orgOpen, setOrgOpen] = useState(false);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">
          <span className="logo-mark">
            <ReceiptLongRoundedIcon fontSize="small" />
          </span>
          <div>
            <div className="logo-title">ChequeFlow AI</div>
            <div className="logo-subtitle">Cheque Management System</div>
          </div>
        </div>

        <nav className="menu-list">
          {navItems.map(({ label, icon: Icon, to }) => (
            <Link
              key={label}
              component={RouterLink}
              to={to}
              underline="none"
              className={`menu-item ${label === "Dashboard" ? "active" : ""}`}
            >
              <Icon fontSize="small" className="menu-icon" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="menu-divider" />

        <nav className="menu-list">
          {bottomNavItems.map(({ label, icon: Icon, to, badge }) => (
            <Link
              key={label}
              component={RouterLink}
              to={to}
              underline="none"
              className="menu-item"
            >
              <Icon fontSize="small" className="menu-icon" />
              <span>{label}</span>
              {badge && <span className="menu-badge">{badge}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="premium-card">
            <div className="premium-card-icon">
              <WorkspacePremiumRoundedIcon fontSize="small" />
            </div>
            <div className="premium-title">Premium Plan</div>
            <div className="premium-subtitle">Valid till 31 Dec 2025</div>
            <button type="button" className="upgrade-btn">Upgrade Plan</button>
          </div>

          <div className="user-card">
            <div className="user-avatar">AD</div>
            <div className="user-info">
              <div className="user-name">Arjun Demo</div>
              <div className="user-role">Owner</div>
            </div>
            <ExpandMoreRoundedIcon fontSize="small" className="user-caret" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="page-header">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Welcome back, Arjun Demo</p>
          </div>

          <div className="header-actions">
            <button type="button" className="date-range-btn">
              <CalendarTodayRoundedIcon fontSize="small" />
              <span>21 May 2025 - 21 Jun 2025</span>
              <ExpandMoreRoundedIcon fontSize="small" />
            </button>

            <button type="button" className="icon-btn" aria-label="Notifications">
              <NotificationsRoundedIcon fontSize="small" />
              <span className="icon-btn-badge">8</span>
            </button>

            <button
              type="button"
              className="org-btn"
              onClick={() => setOrgOpen((o) => !o)}
            >
              <span className="org-avatar">
                <ReceiptLongRoundedIcon fontSize="inherit" />
              </span>
              <span>Demo Traders Pvt Ltd</span>
              <ExpandMoreRoundedIcon fontSize="small" />
            </button>
          </div>
        </header>

        {/* Stat Cards */}
        <div className="stats-grid">
          <StatCard
            title="Total Credit"
            value="₹45,75,000"
            growth="+12.5%"
            growthLabel="vs last month"
            iconBg="#E9F0FF"
            iconColor="#3E7BFA"
            icon={ArrowDownwardRoundedIcon}
          />
          <StatCard
            title="Total Debit"
            value="₹32,40,000"
            growth="+8.2%"
            growthLabel="vs last month"
            iconBg="#E5F7EE"
            iconColor="#22A366"
            icon={ArrowUpwardRoundedIcon}
          />
          <StatCard
            title="Pending Cheques"
            value="32"
            growth="-5"
            growthLabel="vs last month"
            iconBg="#FFF4E0"
            iconColor="#F5A623"
            icon={AccessTimeRoundedIcon}
          />
          <StatCard
            title="Overdue Cheques"
            value="7"
            growth="-2"
            growthLabel="vs last month"
            iconBg="#FDE9E9"
            iconColor="#EF4444"
            icon={WarningRoundedIcon}
          />
        </div>

        {/* Row 2: donut / upcoming / activity */}
        <div className="dashboard-grid">
          <div className="widget-card">
            <div className="widget-title">Cheque Status Overview</div>

            <div className="donut-wrap">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={chequeStatusData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={62}
                    outerRadius={92}
                    paddingAngle={2}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {chequeStatusData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="donut-center">
                <div className="donut-center-value">{totalCheques}</div>
                <div className="donut-center-label">Total</div>
              </div>
            </div>

            <ul className="legend-list">
              {chequeStatusData.map((d) => (
                <li key={d.name} className="legend-row">
                  <span className="legend-dot" style={{ background: d.color }} />
                  <span className="legend-name">{d.name}</span>
                  <span className="legend-value">
                    {d.value} ({Math.round((d.value / totalCheques) * 100)}%)
                  </span>
                </li>
              ))}
            </ul>

            <Link component={RouterLink} to="/upload-cheques" underline="none" className="view-all-btn">
              View All Cheques →
            </Link>
          </div>

          <div className="widget-card">
            <div className="widget-title-row">
              <div className="widget-title">Upcoming Cheques</div>
              <Link component={RouterLink} to="/upload-cheques" underline="hover" className="view-all-link">
                View All
              </Link>
            </div>

            <ul className="cheque-list">
              {upcomingCheques.map((c) => (
                <li key={c.ref} className="cheque-item">
                  <div className="cheque-date-box">
                    <span className="cheque-date-num">{c.date}</span>
                    <span className="cheque-date-month">{c.month}</span>
                  </div>
                  <div className="cheque-item-main">
                    <span className="party-name">{c.party}</span>
                    <span className="cheque-meta">{c.bank} • {c.ref}</span>
                  </div>
                  <div className="cheque-item-side">
                    <span className="amount">{c.amount}</span>
                    <span className={`status-pill ${c.tone}`}>{c.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="widget-card">
            <div className="widget-title-row">
              <div className="widget-title">Recent Activities</div>
              <Link component={RouterLink} to="/activity-log" underline="hover" className="view-all-link">
                View All
              </Link>
            </div>

            <ul className="activity-list">
              {activities.map((a, i) => (
                <li key={i} className="activity-item">
                  <span className={`activity-icon ${a.tone}`}>
                    <a.icon fontSize="small" />
                  </span>
                  <div className="activity-body">
                    <span className="activity-title">{a.title}</span>
                    <span className="activity-detail">{a.detail}</span>
                    <span className="activity-time">{a.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Row 3: trend chart / summary */}
        <div className="dashboard-grid-2">
          <div className="widget-card">
            <div className="widget-title-row">
              <div className="widget-title">Credit vs Debit Trend</div>
              <div className="chart-legend">
                <span className="chart-legend-item">
                  <span className="dot" style={{ background: "#22A366" }} /> Credit (₹)
                </span>
                <span className="chart-legend-item">
                  <span className="dot" style={{ background: "#EF4444" }} /> Debit (₹)
                </span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="creditFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22A366" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#22A366" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="debitFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#EEF1F6" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#8A94A6" }} />
                <YAxis
                  tickFormatter={(v) => `${v}L`}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#8A94A6" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="credit"
                  name="Credit"
                  stroke="#22A366"
                  strokeWidth={2}
                  fill="url(#creditFill)"
                  dot={{ r: 3, stroke: "#22A366", strokeWidth: 2, fill: "#fff" }}
                  activeDot={{ r: 5 }}
                />
                <Area
                  type="monotone"
                  dataKey="debit"
                  name="Debit"
                  stroke="#EF4444"
                  strokeWidth={2}
                  fill="url(#debitFill)"
                  dot={{ r: 3, stroke: "#EF4444", strokeWidth: 2, fill: "#fff" }}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="widget-card summary-card">
            <div className="widget-title">Cheque Summary</div>

            <ul className="summary-list">
              {chequeSummary.map((s) => (
                <li key={s.label} className={`summary-row ${s.tone ? "" : "summary-row-strong"}`}>
                  <span>{s.label}</span>
                  <span className={s.tone ? `summary-value ${s.tone}` : "summary-value"}>{s.value}</span>
                </li>
              ))}
            </ul>

            <div className="summary-divider" />

            <div className="summary-row summary-row-total">
              <span>Total Amount</span>
              <span className="summary-value total">₹78,15,000</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
