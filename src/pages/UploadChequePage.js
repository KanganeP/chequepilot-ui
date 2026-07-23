import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { toWords } from "number-to-words";

export default function UploadChequePage() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [detectionImage, setDetectionImage] = useState("");
    const [errors, setErrors] = useState({});
    const [chequeTypes, setChequeTypes] = useState([]);
    const [chequeCategories, setChequeCategories] = useState([]);

    useEffect(() => {

        loadMasters();

    }, []);

    const loadMasters = async () => {

        const types = await axios.get(
            "http://localhost:3001/api/cheque/types"
        );

        const categories = await axios.get(
            "http://localhost:3001/api/cheque/categories"
        );

        setChequeTypes(types.data);

        setChequeCategories(categories.data);

    };

    const [formData, setFormData] = useState({
        chequeTypeId: "",
        chequeCategoryId: "",

        partyName: "",
        payeeName: "",

        bankName: "",
        bankAddress: "",
        ifscCode: "",
        micrCode: "",

        chequeNumber: "",
        accountNumber: "",

        amount: "",
        amountInWords: "",

        chequeDate: "",
        clearanceDate: "",

        remarks: "",
        signature: ""
    });

    const formatDate = (value) => {
        const numbers = value.replace(/\D/g, "");

        if (numbers.length <= 2)
            return numbers;

        if (numbers.length <= 4)
            return numbers.slice(0, 2) + "/" + numbers.slice(2);

        return (
            numbers.slice(0, 2) +
            "/" +
            numbers.slice(2, 4) +
            "/" +
            numbers.slice(4, 8)
        );
    };

    const validateForm = () => {

        let temp = {};

        if (!formData.partyName.trim())
            temp.partyName = "Party Name is required";

        if (!formData.payeeName.trim())
            temp.payeeName = "Payee Name is required";

        if (!formData.bankName.trim())
            temp.bankName = "Bank Name is required";

        if (!formData.ifscCode.trim())
            temp.ifscCode = "IFSC Code is required";
        else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode))
            temp.ifscCode = "Invalid IFSC";

        if (!formData.accountNumber.trim())
            temp.accountNumber = "Account Number is required";

        if (!formData.chequeNumber.trim())
            temp.chequeNumber = "Cheque Number is required";

        if (!formData.amount)
            temp.amount = "Amount is required";

        if (!formData.chequeDate)
            temp.chequeDate = "Cheque Date is required";

        if (!formData.bankAddress.trim())
            temp.bankAddress = "Bank Address is required";

        if (!formData.amountInWords.trim())
            temp.amountInWords = "Amount in Words is required";

        setErrors(temp);

        return Object.keys(temp).length === 0;
    };

    const handleImageChange = (event) => {

        const file = event.target.files[0];

        if (file) {

            setImage(file);

            setPreview(
                URL.createObjectURL(file)
            );

        }

    };

    const handleOCRScan = async () => {
        if (!image) {
            alert("Please select a cheque image.");
            return;
        }
        try {
            const formDataObj = new FormData();
            formDataObj.append("file", image);
            const response = await axios.post(
                "http://localhost:8000/process/",
                formDataObj,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            console.log(response.data);
            if (response.data.success) {
                const amount = response.data.amount || "";
                setFormData((prev) => ({
                    ...prev,
                    amount,
                    partyName: response.data.partyName || "",
                    payeeName: response.data.payeeName || "",
                    bankName: response.data.bankName || "",
                    ifscCode: response.data.ifscCode || "",
                    bankAddress: response.data.bankAddress || "",
                    accountNumber: response.data.accountNumber || "",
                    chequeNumber: response.data.chequeNumber || "",
                    chequeDate: response.data.date || "",
                    amountInWords:
                        amount === ""
                            ? ""
                            : toWords(Number(amount))
                                .replace(/\b\w/g, c => c.toUpperCase()) + " Rupees Only",
                    signature: response.data.signature || ""
                }));

                setDetectionImage(
                    "http://localhost:8000" +
                    response.data.detectionImage
                );

                <img
                    src={detectionImage}
                    alt="Detection"
                    style={{ width: "100%" }}
                />
                alert("OCR Scan Completed");
            }
            else {
                alert(response.data.error);
            }
        }
        catch (error) {
            console.log(error);
            alert("Unable to connect Python API");
        }
    };

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === "amount") {

            value = value.replace(/[^\d.]/g, "");

            setFormData(prev => ({
                ...prev,
                amount: value,
                amountInWords:
                    value === ""
                        ? ""
                        : toWords(Number(value))
                            .replace(/\b\w/g, c => c.toUpperCase()) + " Rupees Only"
            }));

            return;
        }
        if (name === "chequeDate") {
            value = formatDate(value);
        }
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpload = async () => {

        if (!validateForm()) return;

        try {

            const response = await axios.post(
                "http://localhost:3001/api/cheque",
                formData
            );

            console.log(response.data);

            alert("Cheque Saved Successfully");

        } catch (err) {

            console.log(err);

            if (err.response) {
                console.log(err.response.data);
                alert(err.response.data.error || JSON.stringify(err.response.data));
            } else {
                alert(err.message);
            }

        }

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

                        {/* <Grid container spacing={2} mt={2}>

                            <Grid item xs={12} md={6}>

                                <Typography
                                    fontWeight="bold"
                                    mb={1}
                                >
                                    Original Image
                                </Typography>

                                <img
                                    src={preview}
                                    alt="Original"
                                    style={{
                                        width: "100%",
                                        height: 300,
                                        objectFit: "contain",
                                        border: "1px solid #ddd",
                                        borderRadius: 10
                                    }}
                                />

                            </Grid>

                            <Grid item xs={12} md={6}>

                                <Typography
                                    fontWeight="bold"
                                    mb={1}
                                >
                                    YOLO Detection
                                </Typography>

                                {
                                    detectionImage &&
                                    <img
                                        src={detectionImage}
                                        alt="Detection"
                                        style={{
                                            width: "100%",
                                            height: 300,
                                            objectFit: "contain",
                                            border: "1px solid #ddd",
                                            borderRadius: 10
                                        }}
                                    />
                                }

                            </Grid>

                        </Grid> */}

                        <Divider sx={{ my: 4 }} />

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Typography fontWeight="bold">
                                    Cheque Type
                                </Typography>

                                <RadioGroup
                                    row
                                    name="chequeTypeId"
                                    value={formData.chequeTypeId}
                                    onChange={handleChange}
                                >
                                    {
                                        chequeTypes.map(type => (
                                            <FormControlLabel
                                                key={type.id}
                                                value={type.id}
                                                control={<Radio />}
                                                label={type.type_name}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography fontWeight="bold">
                                    Cheque Category
                                </Typography>

                                <RadioGroup
                                    row
                                    name="chequeCategoryId"
                                    value={formData.chequeCategoryId}
                                    onChange={handleChange}
                                >
                                    {
                                        chequeCategories.map(category => (
                                            <FormControlLabel
                                                key={category.id}
                                                value={category.id}
                                                control={<Radio />}
                                                label={category.category_name}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </Grid>
                        </Grid>

                        <Button
                            variant="outlined"
                            size="large"
                            sx={{ mt: 3 }}
                            onClick={handleOCRScan}
                            disabled={
                                !formData.chequeTypeId ||
                                !formData.chequeCategoryId ||
                                !image
                            }
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
                                    error={!!errors.partyName}
                                    helperText={errors.partyName}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Payee Name"
                                    name="payeeName"
                                    value={formData.payeeName}
                                    onChange={handleChange}
                                    error={!!errors.payeeName}
                                    helperText={errors.payeeName}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Bank Name"
                                    name="bankName"
                                    value={formData.bankName}
                                    onChange={handleChange}
                                    error={!!errors.bankName}
                                    helperText={errors.bankName}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="IFSC Code"
                                    name="ifscCode"
                                    value={formData.ifscCode}
                                    onChange={handleChange}
                                    error={!!errors.ifscCode}
                                    helperText={errors.ifscCode}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Cheque Number"
                                    name="chequeNumber"
                                    value={formData.chequeNumber}
                                    onChange={handleChange}
                                    error={!!errors.chequeNumber}
                                    helperText={errors.chequeNumber}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Account Number"
                                    name="accountNumber"
                                    value={formData.accountNumber}
                                    onChange={handleChange}
                                    error={!!errors.accountNumber}
                                    helperText={errors.accountNumber}
                                />
                            </Grid>



                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Amount"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    error={!!errors.amount}
                                    helperText={errors.amount}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Signature"
                                    name="signature"
                                    value={formData.signature}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Cheque Date"
                                    name="chequeDate"
                                    value={formData.chequeDate}
                                    onChange={handleChange}
                                    error={!!errors.chequeDate}
                                    helperText={errors.chequeDate}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Bank Address"
                                    name="bankAddress"
                                    value={formData.bankAddress}
                                    onChange={handleChange}
                                    error={!!errors.bankAddress}
                                    helperText={errors.bankAddress}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Amount in Words"
                                    name="amountInWords"
                                    value={formData.amountInWords}
                                    onChange={handleChange}
                                    error={!!errors.amountInWords}
                                    helperText={errors.amountInWords}
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
                            Save Cheque
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            sx={{ ml: 2 }}
                            onClick={() => {
                                setImage(null);
                                setPreview("");
                                setDetectionImage("");
                            }}
                        >
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
}