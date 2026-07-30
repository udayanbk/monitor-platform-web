import { Card, CardContent, Divider, Grid, Stack, Typography } from "@mui/material";

interface ActivityCardProps {
  title: string;
  data: {
    successful: Record<string, number>;
    failed: Record<string, number>;
  };
  variant?: "stacked" | "split";
}

const ActivityCard = ({ title, data, variant = "stacked" }: ActivityCardProps) => {
  const renderSection = (title: string, values: Record<string, number>) => (
    <>
      <Typography variant="body2" fontWeight={600} gutterBottom>
        {title}
      </Typography>

      {Object.entries(values).map(([key, value]) => (
        <Stack key={key} direction="row" justifyContent="space-between">
          <Typography variant="body2">{key}</Typography>

          <Typography variant="body2" fontWeight={500}>
            {value}
          </Typography>
        </Stack>
      ))}
    </>
  );

  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight={700}>
          {title}
        </Typography>

        <Divider sx={{ my: 1 }} />

        {variant === "stacked" ? (
          <Stack spacing={2}>
            <div>{renderSection("Successful", data.successful)}</div>

            <Divider />

            <div>{renderSection("Failed", data.failed)}</div>
          </Stack>
        ) : (
          <Grid container>
            <Grid
              size={6}
              sx={{
                pr: 1.5,
                borderRight: 1,
                borderColor: "divider",
              }}
            >
              {renderSection("Successful", data.successful)}
            </Grid>

            <Grid
              size={6}
              sx={{
                pl: 1.5,
              }}
            >
              {renderSection("Failed", data.failed)}
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
