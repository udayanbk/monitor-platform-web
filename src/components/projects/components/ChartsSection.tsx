import { Grid, Paper } from "@mui/material";
import TicketOverviewDonut from "../../charts/TicketOverviewDonut";
import TicketStatusBarChart from "../../charts/TicketStatusBarChart";

const ChartsSection = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, lg: 8 }}>
        <Paper sx={{ p: 2, height: 420 }}>
          <TicketStatusBarChart data={{}} />
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, lg: 4 }}>
        <Paper sx={{ p: 2, height: 420 }}>
          <TicketOverviewDonut />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ChartsSection;
