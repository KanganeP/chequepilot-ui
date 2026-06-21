import {
  Box,
  Typography
} from "@mui/material";

export default function Header() {
  return (
    <Box mb={3}>
      <Typography
        variant="h4"
        fontWeight="bold"
      >
        Dashboard
      </Typography>

      <Typography color="text.secondary">
        Welcome Back
      </Typography>
    </Box>
  );
}