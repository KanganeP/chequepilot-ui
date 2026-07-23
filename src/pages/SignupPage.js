import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  const plans = ["Basic", "Premium", "Enterprise"];


  const [formData, setFormData] = useState({
    shopName: "",
    ownerName: "",
    email: "",
    mobile: "",
    gstNumber: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    subscriptionPlan: "Basic",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3001/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Account Created Successfully");
        navigate("/");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#e2e8f0,#eff6ff,#dbeafe)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 1400,
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
        }}
      >
        <Grid container>
          {/* LEFT SECTION */}

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              background:
                "linear-gradient(135deg,#1e40af,#312e81)",
              color: "#fff",
              p: { xs: 4, md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="bold"
              >
                ChequeFlow AI
              </Typography>

              <Typography mt={1}>
                Smart Cheque Management System
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
                mt={8}
                mb={3}
              >
                Manage Your Cheques with AI
                Automation
              </Typography>

              <Typography
                sx={{
                  color: "#dbeafe",
                  mb: 5,
                }}
              >
                Track credit, debit, pending,
                overdue and security cheques
                with OCR extraction and smart
                notifications.
              </Typography>

              <Paper
                sx={{
                  p: 3,
                  mb: 3,
                  background:
                    "rgba(255,255,255,0.1)",
                  color: "#fff",
                }}
              >
                <Typography fontWeight="bold">
                  AI OCR Detection
                </Typography>
                <Typography variant="body2">
                  Extract cheque details
                  automatically.
                </Typography>
              </Paper>

              <Paper
                sx={{
                  p: 3,
                  mb: 3,
                  background:
                    "rgba(255,255,255,0.1)",
                  color: "#fff",
                }}
              >
                <Typography fontWeight="bold">
                  Smart Notifications
                </Typography>
                <Typography variant="body2">
                  Alerts before cheque due
                  dates.
                </Typography>
              </Paper>

              <Paper
                sx={{
                  p: 3,
                  background:
                    "rgba(255,255,255,0.1)",
                  color: "#fff",
                }}
              >
                <Typography fontWeight="bold">
                  Multi User Access
                </Typography>
                <Typography variant="body2">
                  Role based access for staff.
                </Typography>
              </Paper>
            </Box>

            <Typography
              variant="body2"
              sx={{
                mt: 5,
                color: "#dbeafe",
              }}
            >
              © 2026 ChequeFlow AI
            </Typography>
          </Grid>

          {/* RIGHT SECTION */}

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              p: 4,
              maxHeight: "95vh",
              overflowY: "auto",
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                width: "100%",
                maxWidth: 450,
                mx: "auto",
              }}
            >
              <Box textAlign="center" mb={4}>
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    bgcolor: "#1e40af",
                    color: "#fff",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                    fontWeight: "bold",
                  }}
                >
                  CF
                </Box>

                <Typography variant="h4" fontWeight="bold">
                  Create Account
                </Typography>

                <Typography color="text.secondary" mt={1}>
                  Start managing your cheques.
                </Typography>
              </Box>

              <TextField
                fullWidth
                label="Shop Name"
                name="shopName"
                margin="normal"
                value={formData.shopName}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Owner Name"
                name="ownerName"
                margin="normal"
                value={formData.ownerName}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                margin="normal"
                value={formData.email}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Mobile Number"
                name="mobile"
                margin="normal"
                value={formData.mobile}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="GST Number"
                name="gstNumber"
                margin="normal"
                value={formData.gstNumber}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={2}
                margin="normal"
                value={formData.address}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="City"
                name="city"
                margin="normal"
                value={formData.city}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="State"
                name="state"
                margin="normal"
                value={formData.state}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Country"
                name="country"
                margin="normal"
                value={formData.country}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Pincode"
                name="pincode"
                margin="normal"
                value={formData.pincode}
                onChange={handleChange}
              />

              <TextField
                select
                fullWidth
                label="Subscription Plan"
                name="subscriptionPlan"
                margin="normal"
                value={formData.subscriptionPlan}
                onChange={handleChange}
              >
                {plans.map((plan) => (
                  <MenuItem key={plan} value={plan}>
                    {plan}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                component="label"
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              >
                Upload Shop Logo
                <input hidden type="file" />
              </Button>

              <TextField
                fullWidth
                type="password"
                label="Password"
                name="password"
                margin="normal"
                value={formData.password}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                margin="normal"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 3,
                }}
              >
                Create Account
              </Button>

              <Typography textAlign="center" mt={4}>
                Already have an account?{" "}
                <Link
                  component="button"
                  underline="hover"
                  onClick={() => navigate("/")}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}