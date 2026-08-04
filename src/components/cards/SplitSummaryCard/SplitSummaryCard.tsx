import { Card, CardContent, Typography, Stack, Divider } from "@mui/material";

interface SplitSummaryCardProps {
  title: string;
  data?: Record<string, number>;
  fullHeight: boolean;
}

const SplitSummaryCard = ({ title, data, fullHeight = false }: SplitSummaryCardProps) => {
  return (
    <Card
      elevation={3}
      sx={{
        width: fullHeight ? "100%" : "auto",
        height: fullHeight ? "100%" : "auto",
        flex: fullHeight ? 1 : undefined,
        borderRadius: 3,
        border: 2,
        borderColor: "primary.main",
      }}
    >
      <CardContent>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          {title}
        </Typography>

        <Divider sx={{ mb: 2, borderColor: "primary.main" }} />

        <Stack spacing={1}>
          {Object.entries(data ?? {}).map(([key, value]) => (
            <Stack key={key} direction="row" justifyContent="space-between">
              <Typography variant="body2">{key}</Typography>

              <Typography fontWeight={600}>{value}</Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SplitSummaryCard;
