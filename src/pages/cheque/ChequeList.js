import { useEffect, useMemo, useState } from "react";
import "../../styles/dashboard.css";
import "../../styles/cheque-table.css";
import axios from "axios";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";

// Maps cheque_status.status_name -> badge class + dot color.
// Adjust the keys if your seeded status names differ.
const STATUS_STYLE = {
    pending: { cls: "status-pending", label: "Pending" },
    "due today": { cls: "status-due", label: "Due Today" },
    overdue: { cls: "status-overdue", label: "Overdue" },
    cleared: { cls: "status-cleared", label: "Cleared" },
    bounced: { cls: "status-bounced", label: "Bounced" },
    security: { cls: "status-security", label: "Security" },
};

const STATUS_FILTERS = ["All", "Pending", "Due Today", "Overdue", "Cleared", "Bounced", "Security"];

function formatDate(value) {
    if (!value) return "—";
    const d = new Date(value);
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function formatAmount(value) {
    if (value === null || value === undefined) return "—";
    const num = Number(value);
    return `₹${num.toLocaleString("en-IN", { minimumFractionDigits: 0 })}`;
}

function ChequeList() {
    const [cheques, setCheques] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const loadCheques = () => {
        setLoading(true);
        setError(null);
        axios
            .get("/api/cheques")
            .then((res) => setCheques(res.data?.data || []))
            .catch(() => setError("Couldn't load cheques. Please try again."))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadCheques();
    }, []);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        return cheques.filter((c) => {
            const matchesSearch =
                !q ||
                c.party_name?.toLowerCase().includes(q) ||
                c.payee_name?.toLowerCase().includes(q) ||
                c.bank_name?.toLowerCase().includes(q) ||
                c.cheque_number?.toLowerCase().includes(q) ||
                c.account_number?.toLowerCase().includes(q);

            const matchesStatus =
                statusFilter === "All" || c.status_name?.toLowerCase() === statusFilter.toLowerCase();

            return matchesSearch && matchesStatus;
        });
    }, [cheques, search, statusFilter]);

    return (
        <>
            <header className="page-header">
                <div>
                    <h1 className="page-title">Cheques</h1>
                    <p className="page-subtitle">
                        {loading ? "Loading cheques…" : `${cheques.length} cheque${cheques.length === 1 ? "" : "s"} on record`}
                    </p>
                </div>

                <div className="header-actions">
                    <button type="button" className="icon-btn" aria-label="Refresh" onClick={loadCheques}>
                        <RefreshRoundedIcon fontSize="small" />
                    </button>
                    <Link component={RouterLink} to="/upload-cheques" underline="none" className="add-user-btn">
                        <AddRoundedIcon fontSize="small" />
                        <span>Add Cheque</span>
                    </Link>
                </div>
            </header>

            <div className="widget-card users-table-card">
                <div className="users-table-toolbar">
                    <div className="users-search">
                        <SearchRoundedIcon fontSize="small" />
                        <input
                            type="text"
                            placeholder="Search by party, payee, bank, cheque or account no."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="status-filter-group">
                        {STATUS_FILTERS.map((s) => (
                            <button
                                key={s}
                                type="button"
                                className={`status-filter-chip ${statusFilter === s ? "active" : ""}`}
                                onClick={() => setStatusFilter(s)}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {error && <div className="users-table-error">{error}</div>}

                <div className="users-table-scroll">
                    <table className="users-table cheque-table">
                        <thead>
                            <tr>
                                <th>Cheque</th>
                                <th>Party</th>
                                <th>Payee</th>
                                <th>Bank</th>
                                <th>Amount</th>
                                <th>Cheque Date</th>
                                <th>Clearance</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>OCR</th>
                                <th aria-label="Actions" />
                            </tr>
                        </thead>
                        <tbody>
                            {loading &&
                                Array.from({ length: 6 }).map((_, i) => (
                                    <tr key={`skeleton-${i}`} className="skeleton-row">
                                        <td colSpan={11}>
                                            <div className="skeleton-bar" />
                                        </td>
                                    </tr>
                                ))}

                            {!loading && filtered.length === 0 && (
                                <tr>
                                    <td colSpan={11} className="users-table-empty">
                                        {search || statusFilter !== "All"
                                            ? "No cheques match your filters."
                                            : "No cheques uploaded yet."}
                                    </td>
                                </tr>
                            )}

                            {!loading &&
                                filtered.map((c) => {
                                    const statusKey = c.status_name?.toLowerCase();
                                    const statusStyle = STATUS_STYLE[statusKey] || { cls: "status-default", label: c.status_name || "—" };
                                    const isOverdue = c.overdue_days > 0 && statusKey !== "cleared";

                                    return (
                                        <tr key={c.id}>
                                            <td>
                                                <div className="cheque-cell">
                                                    <span className="cheque-thumb">
                                                        {c.image_path ? (
                                                            <img src={c.image_path} alt={`Cheque ${c.cheque_number}`} />
                                                        ) : (
                                                            <ReceiptLongRoundedIcon fontSize="small" />
                                                        )}
                                                    </span>
                                                    <div className="cheque-cell-text">
                                                        <span className="cheque-number">#{c.cheque_number || "—"}</span>
                                                        <span className="cheque-meta">{c.bank_name || "—"}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="cell-strong">{c.party_name || "—"}</td>
                                            <td className="cell-muted">{c.payee_name || "—"}</td>
                                            <td className="cell-muted">
                                                <div className="bank-cell">
                                                    <span>{c.bank_name || "—"}</span>
                                                    {c.ifsc_code && <span className="bank-cell-sub">{c.ifsc_code}</span>}
                                                </div>
                                            </td>
                                            <td className="cell-strong">{formatAmount(c.amount)}</td>
                                            <td className="cell-muted">{formatDate(c.cheque_date)}</td>
                                            <td className="cell-muted">
                                                {c.clearance_date ? (
                                                    formatDate(c.clearance_date)
                                                ) : isOverdue ? (
                                                    <span className="overdue-pill">{c.overdue_days}d overdue</span>
                                                ) : (
                                                    "—"
                                                )}
                                            </td>
                                            <td className="cell-muted">{c.type_name || "—"}</td>
                                            <td>
                                                <span className={`status-badge ${statusStyle.cls}`}>{statusStyle.label}</span>
                                            </td>
                                            <td>
                                                {c.is_ocr_verified ? (
                                                    <CheckCircleRoundedIcon fontSize="small" className="ocr-verified" />
                                                ) : (
                                                    <HelpOutlineRoundedIcon fontSize="small" className="ocr-unverified" />
                                                )}
                                            </td>
                                            <td>
                                                <div className="row-actions">
                                                    <Link
                                                        component={RouterLink}
                                                        to={`/cheques/${c.id}`}
                                                        underline="none"
                                                        className="row-edit-btn"
                                                        aria-label={`View cheque ${c.cheque_number}`}
                                                    >
                                                        <VisibilityRoundedIcon fontSize="small" />
                                                    </Link>
                                                    <Link
                                                        component={RouterLink}
                                                        to={`/cheques/${c.id}/edit`}
                                                        underline="none"
                                                        className="row-edit-btn"
                                                        aria-label={`Edit cheque ${c.cheque_number}`}
                                                    >
                                                        <EditRoundedIcon fontSize="small" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ChequeList;
