import { Grid } from "@mui/material";

import RecentLogsPanel from "./RecentLogsPanel";
import SearchPanel from "./SearchPanel";

const InvestigationSection = () => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 7 }}>
        <RecentLogsPanel />
      </Grid>

      <Grid size={{ xs: 12, lg: 5 }}>
        <SearchPanel />
      </Grid>
    </Grid>
  );
};

export default InvestigationSection;
