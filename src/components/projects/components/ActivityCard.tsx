import { Button, Card, CardContent, Divider, Grid, Stack, Typography } from "@mui/material";
import BButton from "../../common/BButton";

type ActivitySection = {
  title: string;
  values: Record<string, number>;
};

interface ActivityCardProps {
  title: string;
  sections: ActivitySection[];
  variant?: "stacked" | "split";
  button?: boolean;
  buttonName?: string;
  functionCall?: () => void;
}

const ActivityCard = ({
  title,
  sections,
  variant = "stacked",
  button,
  buttonName = "default",
  functionCall,
}: ActivityCardProps) => {
  const renderSection = (section: ActivitySection) => {
    const entries = Object.entries(section.values ?? {});

    return (
      <>
        {section.title && (
          <Typography variant="body2" fontWeight={600} gutterBottom>
            {section.title}
          </Typography>
        )}

        {entries.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No activity
          </Typography>
        ) : (
          entries.map(([key, value]) => (
            <Stack key={key} direction="row" justifyContent="space-between">
              <Typography variant="body2">{key}</Typography>

              <Typography variant="body2" fontWeight={500}>
                {value}
              </Typography>
            </Stack>
          ))
        )}
      </>
    );
  };

  return (
    <Card elevation={3} sx={{ border: 2, borderColor: "warning.main" }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight={700}>
          {title}
        </Typography>
        {button && <BButton buttonName={buttonName} functionCall={functionCall} />}

        <Divider sx={{ my: 1, borderColor: "warning.main" }} />

        {variant === "stacked" ? (
          <Stack divider={<Divider />} spacing={2}>
            {sections.map((section) => (
              <div key={section.title}>{renderSection(section)}</div>
            ))}
          </Stack>
        ) : (
          <Grid container>
            {sections.map((section, index) => (
              <Grid
                key={section.title}
                size={12 / sections.length}
                sx={{
                  px: 1.5,
                  ...(index < sections.length - 1 && {
                    borderRight: 1,
                    borderColor: "warning.main",
                  }),
                }}
              >
                {renderSection(section)}
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
