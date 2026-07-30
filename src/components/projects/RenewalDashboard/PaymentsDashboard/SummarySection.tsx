import { Grid } from "@mui/material";

import SummaryCard from "../../../cards/SummaryCard";
import SplitSummaryCard from "../../../cards/SplitSummaryCard";
import { Summary } from "../../../common/Interfaces";

// interface summaryType {
//   totalSearch: any,
//   successful: any,
//   failed: any
// }

interface SummarySectionProps {
  data: Summary;
}

const SummarySection = ({ data }: SummarySectionProps) => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 3 }}>
        <SummaryCard title="Total Search" value={data?.totalSearch || 0} />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <SummaryCard title="Total Payments" value={data?.totalPayments} />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <SplitSummaryCard title="Successful" data={data?.successful} />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <SplitSummaryCard title="Failed" data={data?.failed} />
      </Grid>
    </Grid>
  );
};

export default SummarySection;
