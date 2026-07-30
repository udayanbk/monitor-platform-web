import { Grid } from "@mui/material";
import ActivityCard from "./ActivityCard";

const mockActivity = {
  successful: {
    EBAO: 12,
    BANK: 5,
  },
  failed: {
    EBAO: 2,
    BANK: 1,
  },
};

const ActivitySection = () => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <ActivityCard title="Last 1 Hour" data={mockActivity} />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <ActivityCard title="Last 24 Hours" data={mockActivity} />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <ActivityCard title="Last 30 Days" data={mockActivity} />
      </Grid>
    </Grid>
  );
};

export default ActivitySection;
