import { useEffect, useMemo, useState } from "react";
import "../../styles/dashboard.css";
import "../../styles/users-table.css";
import axios from "axios";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

const ROLE_BADGE = {
    owner: "role-owner",
    admin: "role-admin",
    manager: "role-manager",
    accountant: "role-accountant",
    worker: "role-worker",
};

function formatDate(value) {
    if (!value) return "—";
    const d = new Date(value);
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function formatDateTime(value) {
    if (!value) return "Never";
    const d = new Date(value);
    return `${d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}, ${d.toLocaleTimeString(
        "en-IN",
        { hour: "2-digit", minute: "2-digit" }
    )}`;
}

function initials(name) {
    if (!name) return "?";
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase())
        .join("");
}

function UsersTable() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [togglingId, setTogglingId] = useState(null);

    const loadUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem("token");
            const res = await axios.get(
                "http://localhost:3001/api/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setUsers(res.data.data || []);
        } catch (err) {
            console.log(err);
            setError(
                err.response?.data?.message ||
                "Couldn't load users. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return users;
        return users.filter(
            (u) =>
                u.full_name?.toLowerCase().includes(q) ||
                u.email?.toLowerCase().includes(q) ||
                u.mobile?.toLowerCase().includes(q) ||
                u.role_name?.toLowerCase().includes(q)
        );
    }, [users, search]);

    const handleToggleActive = async (user) => {
        const nextActive = !user.is_active;
        setTogglingId(user.id);
        // Optimistic update
        setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, is_active: nextActive } : u)));
        try {
            const token = localStorage.getItem("token");
            await axios.patch(
                `http://localhost:3001/api/users/${user.id}/status`,
                {
                    isActive: nextActive
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        } catch {
            // Roll back on failure
            setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, is_active: user.is_active } : u)));
        } finally {
            setTogglingId(null);
        }
    };

    return (
        <>
            <header className="page-header">
                <div>
                    <h1 className="page-title">Users</h1>
                    <p className="page-subtitle">
                        {loading ? "Loading team members…" : `${users.length} user${users.length === 1 ? "" : "s"} in your shop`}
                    </p>
                </div>

                <div className="header-actions">
                    <button type="button" className="icon-btn" aria-label="Refresh" onClick={loadUsers}>
                        <RefreshRoundedIcon fontSize="small" />
                    </button>
                    <Link component={RouterLink} to="/users/create" underline="none" className="add-user-btn">
                        <PersonAddAlt1RoundedIcon fontSize="small" />
                        <span>Add User</span>
                    </Link>
                </div>
            </header>

            <div className="widget-card users-table-card">
                <div className="users-table-toolbar">
                    <div className="users-search">
                        <SearchRoundedIcon fontSize="small" />
                        <input
                            type="text"
                            placeholder="Search by name, email, mobile or role"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {error && <div className="users-table-error">{error}</div>}

                <div className="users-table-scroll">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Last Login</th>
                                <th>Created</th>
                                <th aria-label="Actions" />
                            </tr>
                        </thead>
                        <tbody>
                            {loading &&
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={`skeleton-${i}`} className="skeleton-row">
                                        <td colSpan={8}>
                                            <div className="skeleton-bar" />
                                        </td>
                                    </tr>
                                ))}

                            {!loading && filtered.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="users-table-empty">
                                        {search ? "No users match your search." : "No users yet. Add your first team member."}
                                    </td>
                                </tr>
                            )}

                            {!loading &&
                                filtered.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className="user-cell">
                                                <span className="user-cell-avatar">
                                                    {user.profile_image ? (
                                                        <img src={user.profile_image} alt={user.full_name} />
                                                    ) : (
                                                        <span>{initials(user.full_name)}</span>
                                                    )}
                                                </span>
                                                <span className="user-cell-name">{user.full_name || "—"}</span>
                                            </div>
                                        </td>
                                        <td className="cell-muted">{user.email}</td>
                                        <td className="cell-muted">{user.mobile || "—"}</td>
                                        <td>
                                            <span className={`role-badge ${ROLE_BADGE[user.role_name] || "role-default"}`}>
                                                {user.role_name
                                                    ? user.role_name.charAt(0).toUpperCase() + user.role_name.slice(1)
                                                    : "—"}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className={`status-toggle-pill ${user.is_active ? "active" : "inactive"}`}
                                                disabled={togglingId === user.id}
                                                onClick={() => handleToggleActive(user)}
                                            >
                                                <span className="status-dot" />
                                                {user.is_active ? "Active" : "Inactive"}
                                            </button>
                                        </td>
                                        <td className="cell-muted">{formatDateTime(user.last_login)}</td>
                                        <td className="cell-muted">{formatDate(user.created_at)}</td>
                                        <td>
                                            <Link
                                                component={RouterLink}
                                                to={`/users/${user.id}/edit`}
                                                underline="none"
                                                className="row-edit-btn"
                                                aria-label={`Edit ${user.full_name}`}
                                            >
                                                <EditRoundedIcon fontSize="small" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default UsersTable;
