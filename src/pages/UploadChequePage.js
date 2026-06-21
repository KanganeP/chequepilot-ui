import React, { useState } from "react";
import {
    Box,
    Card,
    Typography,
    Button,
    Grid,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Paper,
    Divider,
} from "@mui/material";

export default function UploadChequePage() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    const [formData, setFormData] = useState({
        chequeType: "Credit",
        chequeCategory: "Regular",
        partyName: "",
        bankName: "",
        chequeNumber: "",
        accountNumber: "",
        amount: "",
        chequeDate: "",
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleOCRScan = () => {
        // Dummy OCR Data
        setFormData({
            ...formData,
            partyName: "ABC Traders",
            bankName: "State Bank of India",
            chequeNumber: "123456",
            accountNumber: "9876543210",
            amount: "25000",
            chequeDate: "2026-06-20",
        });

        alert("OCR Scan Completed");
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpload = () => {
        console.log(formData);
        alert("Cheque Uploaded Successfully");
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg,#e2e8f0,#eff6ff,#dbeafe)",
                p: 4,
            }}
        >
            <Card
                sx={{
                    maxWidth: 1300,
                    mx: "auto",
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
                }}
            >
                <Grid container>
                    {/* LEFT PANEL */}

                    {/* <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{
                            background:
                                "linear-gradient(135deg,#1e40af,#312e81)",
                            color: "#fff",
                            p: 5,
                        }}
                    >
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            mb={2}
                        >
                            Upload Cheque
                        </Typography>

                        <Typography color="#dbeafe">
                            Upload cheque image and let AI
                            automatically extract details.
                        </Typography>

                        <Box mt={5}>
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
                                    OCR Extraction
                                </Typography>

                                <Typography variant="body2">
                                    Read cheque details instantly.
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
                                    Automatic reminder alerts.
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
                                    Secure Storage
                                </Typography>

                                <Typography variant="body2">
                                    Save cheque images safely.
                                </Typography>
                            </Paper>
                        </Box>
                    </Grid> */}

                    {/* RIGHT PANEL */}

                    <Grid
                        item
                        xs={12}
                        md={8}
                        sx={{
                            p: 5,
                        }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            mb={3}
                        >
                            Upload Cheque Image
                        </Typography>

                        {/* Upload Area */}

                        <Paper
                            sx={{
                                border: "2px dashed #1976d2",
                                p: 4,
                                textAlign: "center",
                                borderRadius: 3,
                                backgroundColor: "#f8fbff",
                            }}
                        >
                            <Button
                                component="label"
                                variant="contained"
                                size="large"
                            >
                                Select Image
                                <input
                                    hidden
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </Button>

                            <Typography mt={2}>
                                Drag & Drop Cheque Image Here
                            </Typography>
                        </Paper>

                        {/* Preview */}

                        {preview && (
                            <Box mt={3}>
                                <Typography
                                    fontWeight="bold"
                                    mb={2}
                                >
                                    Image Preview
                                </Typography>

                                <img
                                    src={preview}
                                    alt="preview"
                                    style={{
                                        width: "100%",
                                        maxHeight: 250,
                                        objectFit: "contain",
                                        borderRadius: 12,
                                        border: "1px solid #ddd",
                                    }}
                                />
                            </Box>
                        )}

                        <Divider sx={{ my: 4 }} />

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Typography fontWeight="bold">
                                    Cheque Type
                                </Typography>

                                <RadioGroup
                                    row
                                    value={formData.chequeType}
                                    onChange={handleChange}
                                    name="chequeType"
                                >
                                    <FormControlLabel
                                        value="Credit"
                                        control={<Radio />}
                                        label="Credit"
                                    />

                                    <FormControlLabel
                                        value="Debit"
                                        control={<Radio />}
                                        label="Debit"
                                    />
                                </RadioGroup>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography fontWeight="bold">
                                    Cheque Category
                                </Typography>

                                <RadioGroup
                                    row
                                    value={formData.chequeCategory}
                                    onChange={handleChange}
                                    name="chequeCategory"
                                >
                                    <FormControlLabel
                                        value="Regular"
                                        control={<Radio />}
                                        label="Regular"
                                    />

                                    <FormControlLabel
                                        value="Security"
                                        control={<Radio />}
                                        label="Security"
                                    />
                                </RadioGroup>
                            </Grid>
                        </Grid>

                        <Button
                            variant="outlined"
                            size="large"
                            sx={{ mt: 3 }}
                            onClick={handleOCRScan}
                        >
                            OCR Scan Cheque
                        </Button>

                        <Divider sx={{ my: 4 }} />

                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            mb={2}
                        >
                            Auto Filled Cheque Details
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Party Name"
                                    name="partyName"
                                    value={formData.partyName}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Bank Name"
                                    name="bankName"
                                    value={formData.bankName}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Cheque Number"
                                    name="chequeNumber"
                                    value={formData.chequeNumber}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Account Number"
                                    name="accountNumber"
                                    value={formData.accountNumber}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Amount"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    name="chequeDate"
                                    value={formData.chequeDate}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{
                                mt: 4,
                                py: 1.7,
                                borderRadius: 3,
                            }}
                            onClick={handleUpload}
                        >
                            Upload Cheque
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
}