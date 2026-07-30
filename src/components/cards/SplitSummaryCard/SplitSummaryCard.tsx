import { Card, CardContent, Typography, Stack, Divider } from "@mui/material";

interface SplitSummaryCardProps {
  title: string;
  data?: Record<string, number>;
}

const SplitSummaryCard = ({ title, data }: SplitSummaryCardProps) => {
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          {title}
        </Typography>

        <Divider sx={{ mb: 2 }} />

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
