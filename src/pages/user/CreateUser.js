import { useEffect, useRef, useState } from "react";
import "../../styles/dashboard.css";
import "../../styles/create-user.css";
import axios from "axios";
import {
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    InputAdornment,
    IconButton,
    Switch,
    CircularProgress,
    Alert,
} from "@mui/material";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";

function CreateUser() {
    const fileInputRef = useRef(null);

    const [roles, setRoles] = useState([]);
    const [rolesLoading, setRolesLoading] = useState(true);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        roleId: "",
        isActive: true,
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [banner, setBanner] = useState(null); // { type: 'success' | 'error', message }

    useEffect(() => {
        const loadRoles = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    "http://localhost:3001/api/users/roles",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setRoles(res.data.data);
            } catch (err) {
                console.log(err);
            } finally {
                setRolesLoading(false);
            }
        };
        loadRoles();
    }, []);

    const handleChange = (field) => (e) => {
        setForm((f) => ({ ...f, [field]: e.target.value }));
        setErrors((er) => ({ ...er, [field]: undefined }));
    };

    const handleAvatarPick = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const validate = () => {
        const next = {};
        if (!form.fullName.trim()) next.fullName = "Full name is required";
        if (!form.email.trim()) next.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
        if (!form.password || form.password.length < 6)
            next.password = "Password must be at least 6 characters";
        if (!form.roleId) next.role = "Please select a role";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBanner(null);
        if (!validate()) return;

        setSubmitting(true);
        try {
            const payload = new FormData();
            payload.append("fullName", form.fullName.trim());
            payload.append("email", form.email.trim());
            payload.append("mobile", form.mobile.trim());
            payload.append("password", form.password);
            payload.append("roleId", form.roleId);
            if (avatarFile) payload.append("profileImage", avatarFile);

            const token = localStorage.getItem("token");

            const res = await axios.post(
                "http://localhost:3001/api/users/create",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setBanner({ type: "success", message: res.data?.message || "User created successfully" });
            setForm({ fullName: "", email: "", mobile: "", password: "", roleId: "", isActive: true });
            setAvatarFile(null);
            setAvatarPreview(null);
        } catch (err) {
            setBanner({
                type: "error",
                message: err.response?.data?.message || "Something went wrong. Please try again.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <header className="page-header">
                <div>
                    <h1 className="page-title">Add New User</h1>
                    <p className="page-subtitle">Create a login for a team member and assign their role</p>
                </div>
            </header>

            {banner && (
                <Alert
                    severity={banner.type}
                    onClose={() => setBanner(null)}
                    className="form-alert"
                >
                    {banner.message}
                </Alert>
            )}

            <form className="widget-card user-form-card" onSubmit={handleSubmit} noValidate>
                <div className="user-form-avatar-row">
                    <div className="user-form-avatar" onClick={() => fileInputRef.current?.click()}>
                        {avatarPreview ? (
                            <img src={avatarPreview} alt="Profile preview" />
                        ) : (
                            <PersonRoundedIcon fontSize="large" />
                        )}
                        <span className="user-form-avatar-edit">
                            <CameraAltRoundedIcon fontSize="inherit" />
                        </span>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleAvatarPick}
                    />
                    <div>
                        <div className="user-form-avatar-title">Profile photo</div>
                        <div className="user-form-avatar-hint">JPG or PNG, up to 2MB — optional</div>
                    </div>
                </div>

                <div className="user-form-grid">
                    <TextField
                        label="Full Name"
                        placeholder="e.g. Ramesh Kumar"
                        value={form.fullName}
                        onChange={handleChange("fullName")}
                        error={!!errors.fullName}
                        helperText={errors.fullName}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonRoundedIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="Email"
                        type="email"
                        placeholder="name@company.com"
                        value={form.email}
                        onChange={handleChange("email")}
                        error={!!errors.email}
                        helperText={errors.email}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailRoundedIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="Mobile Number"
                        placeholder="9876543210"
                        value={form.mobile}
                        onChange={handleChange("mobile")}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneRoundedIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimum 6 characters"
                        value={form.password}
                        onChange={handleChange("password")}
                        error={!!errors.password}
                        helperText={errors.password}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockRoundedIcon fontSize="small" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword((s) => !s)} edge="end" size="small">
                                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <FormControl fullWidth error={!!errors.role}>
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={form.roleId}
                            label="Role"
                            onChange={handleChange("roleId")}
                        >
                            {rolesLoading && (
                                <MenuItem disabled>
                                    Loading...
                                </MenuItem>
                            )}
                            {!rolesLoading &&
                                roles.map((role) => (
                                    <MenuItem
                                        key={role.id}
                                        value={role.id}>
                                        {role.role_name}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                    <div className="user-form-toggle">
                        <div>
                            <div className="user-form-toggle-title">Active</div>
                            <div className="user-form-toggle-hint">User can log in immediately</div>
                        </div>
                        <Switch
                            checked={form.isActive}
                            onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                        />
                    </div>
                </div>

                <div className="user-form-actions">
                    <button
                        type="button"
                        className="btn-secondary"
                        disabled={submitting}
                        onClick={() => {
                            setForm({ fullName: "", email: "", mobile: "", password: "", roleId: "", isActive: true });
                            setAvatarFile(null);
                            setAvatarPreview(null);
                            setErrors({});
                            setBanner(null);
                        }}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary" disabled={submitting}>
                        {submitting ? <CircularProgress size={18} color="inherit" /> : "Create User"}
                    </button>
                </div>
            </form>
        </>
    );
}

export default CreateUser;
