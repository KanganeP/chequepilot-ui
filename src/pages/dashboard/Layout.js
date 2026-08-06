import "../../styles/dashboard.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

/**
 * Shared app shell. Put this as the parent route (see App.js example
 * below) so the sidebar renders once and persists across navigation,
 * while <Outlet /> swaps in each page's own content.
 */
function Layout() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
