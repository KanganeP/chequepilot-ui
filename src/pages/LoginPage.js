import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../controllers/loginController";
import {
    Box,
    Grid,
    Card,
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Divider,
    Paper,
    Link
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";



export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg,#f1f5f9,#eff6ff,#e0e7ff)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 3,
            }}
        >
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 1400,
                    borderRadius: 6,
                    overflow: "hidden",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                }}
            >
                <Grid container>
                    {/* Left Section */}

                    <Grid
                        size={{ xs: 12, md: 6 }}
                        sx={{
                            position: "relative",
                            background:
                                "linear-gradient(135deg,#1d4ed8,#312e81)",
                            color: "#fff",
                            p: 6,
                            minHeight: 700,
                        }}
                    >
                        <Box
                            component="img"
                            src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=1200"
                            alt="Cheque"
                            sx={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                opacity: 0.08,
                            }}
                        />

                        <Box sx={{ position: "relative", zIndex: 2 }}>
                            <Typography variant="h3" fontWeight="bold">
                                ChequeFlow AI
                            </Typography>

                            <Typography sx={{ mt: 1, opacity: 0.8 }}>
                                Smart Cheque Management System
                            </Typography>

                            <Typography
                                variant="h4"
                                sx={{ mt: 8, mb: 3, fontWeight: 700 }}
                            >
                                Manage Your Cheques with AI Automation
                            </Typography>

                            <Typography sx={{ opacity: 0.9 }}>
                                Track credit, debit, pending, overdue and
                                security cheques with OCR extraction and
                                smart notifications.
                            </Typography>

                            <Paper
                                sx={{
                                    mt: 5,
                                    p: 3,
                                    bgcolor: "rgba(255,255,255,0.1)",
                                    color: "#fff",
                                }}
                            >
                                <Typography fontWeight="bold">
                                    AI OCR Detection
                                </Typography>
                                <Typography variant="body2">
                                    Extract cheque details automatically.
                                </Typography>
                            </Paper>

                            <Paper
                                sx={{
                                    mt: 3,
                                    p: 3,
                                    bgcolor: "rgba(255,255,255,0.1)",
                                    color: "#fff",
                                }}
                            >
                                <Typography fontWeight="bold">
                                    Smart Notifications
                                </Typography>
                                <Typography variant="body2">
                                    Alerts before cheque due date.
                                </Typography>
                            </Paper>

                            <Paper
                                sx={{
                                    mt: 3,
                                    p: 3,
                                    bgcolor: "rgba(255,255,255,0.1)",
                                    color: "#fff",
                                }}
                            >
                                <Typography fontWeight="bold">
                                    Multi User Access
                                </Typography>
                                <Typography variant="body2">
                                    Role-based access for staff.
                                </Typography>
                            </Paper>
                        </Box>
                    </Grid>

                    {/* Right Section */}

                    <Grid
                        size={{ xs: 12, md: 6 }}
                        sx={{
                            p: 8,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Box width="100%" maxWidth={450}>
                            <Box textAlign="center" mb={5}>
                                <Box
                                    sx={{
                                        width: 90,
                                        height: 90,
                                        mx: "auto",
                                        borderRadius: 4,
                                        background:
                                            "linear-gradient(135deg,#1d4ed8,#312e81)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#fff",
                                        fontSize: 34,
                                        fontWeight: "bold",
                                    }}
                                >
                                    CF
                                </Box>

                                <Typography
                                    variant="h4"
                                    fontWeight="bold"
                                    mt={3}
                                >
                                    Welcome Back
                                </Typography>

                                <Typography color="text.secondary">
                                    Login to continue managing your cheques.
                                </Typography>
                            </Box>

                            <TextField
                                fullWidth
                                label="Email Address"
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                mt={2}
                            >
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Remember Me"
                                />

                                <Typography
                                    color="primary"
                                    sx={{ cursor: "pointer" }}
                                >
                                    Forgot Password?
                                </Typography>
                            </Box>

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{
                                    mt: 3,
                                    py: 1.7,
                                    borderRadius: 3,
                                }}
                                onClick={() =>loginUser(email,password, navigate)}
                            >
                                Login
                            </Button>

                            <Divider sx={{ my: 4 }}>
                                Quick Features
                            </Divider>

                            <Grid container spacing={2}>
                                <Grid size={4}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            textAlign: "center",
                                            bgcolor: "#eff6ff",
                                        }}
                                    >
                                        <Typography fontWeight="bold">
                                            24/7
                                        </Typography>
                                        <Typography variant="caption">
                                            Monitoring
                                        </Typography>
                                    </Paper>
                                </Grid>

                                <Grid size={4}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            textAlign: "center",
                                            bgcolor: "#eef2ff",
                                        }}
                                    >
                                        <Typography fontWeight="bold">
                                            AI
                                        </Typography>
                                        <Typography variant="caption">
                                            OCR
                                        </Typography>
                                    </Paper>
                                </Grid>

                                <Grid size={4}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            textAlign: "center",
                                            bgcolor: "#f0f9ff",
                                        }}
                                    >
                                        <Typography fontWeight="bold">
                                            100%
                                        </Typography>
                                        <Typography variant="caption">
                                            Secure
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>

                            <Typography textAlign="center" mt={5} color="text.secondary">
                                Don't have an account?{" "}
                                <Link
                                    component={RouterLink}
                                    to="/signup"
                                    underline="hover"
                                    fontWeight="bold"
                                >
                                    Create Account
                                </Link>
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
}