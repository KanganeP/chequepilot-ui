import "../../styles/dashboard.css";
import { Link } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

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
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";

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

/**
 * Persistent left navigation. Rendered once by <Layout />, so it stays
 * mounted while only the page content (<Outlet />) swaps between routes.
 * Active state is derived from the current URL, not hardcoded.
 */
function Sidebar() {
  const { pathname } = useLocation();

  const isActive = (to) => pathname === to || pathname.startsWith(`${to}/`);

  return (
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
            className={`menu-item ${isActive(to) ? "active" : ""}`}
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
            className={`menu-item ${isActive(to) ? "active" : ""}`}
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
  );
}

export default Sidebar;
