import { Grid } from "@mui/material";

import SummaryCard from "../../../cards/SummaryCard";

// interface Props {
//   data: any;
// }

const SummarySection = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <SummaryCard title="Total Tickets" value={496} />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <SummaryCard title="Open" value={454} />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <SummaryCard title="Closed" value={37} />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <SummaryCard title="Resolved" value={4} />
      </Grid>
    </Grid>
  );
};

export default SummarySection;
