import { Card, CardContent, Typography } from "@mui/material";

export default function StatCard({
  title,
  value,
  growth
}) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 2
      }}
    >
      <CardContent>
        <Typography color="text.secondary">
          {title}
        </Typography>

        <Typography
          variant="h4"
          fontWeight="bold"
          mt={1}
        >
          {value}
        </Typography>

        <Typography
          color="success.main"
          mt={1}
        >
          {growth}
        </Typography>
      </CardContent>
    </Card>
  );
}