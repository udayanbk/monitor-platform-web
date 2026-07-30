import { Grid, Paper } from "@mui/material";

import ActivityDonut from "../../../charts/ActivityDonut";

// interface Props {
//   title: any;
// }

const ActivitySection = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={{ p: 2 }}>
          <ActivityDonut title="Last Hour" />
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={{ p: 2 }}>
          <ActivityDonut title="Last 24 Hours" />
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={{ p: 2 }}>
          <ActivityDonut title="Last 30 Days" />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ActivitySection;
