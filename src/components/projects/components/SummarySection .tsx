import { Grid } from "@mui/material";
import SummaryCard from "../../cards/SummaryCard";
import SplitSummaryCard from "../../cards/SplitSummaryCard";

// import SummaryCard from "../../../cards/SummaryCard";
// import SplitSummaryCard from "../../../cards/SplitSummaryCard";

interface SummaryCardItem {
  title: string;
  value: number | string;
}

interface SplitSummaryCardItem {
  title: string;
  data?: Record<string, number>;
}

interface SummarySectionProps {
  summaryCards?: SummaryCardItem[];
  splitCards?: SplitSummaryCardItem[];
  columns?: number;
  equalHeight?: boolean;
}

const SummarySection = ({
  summaryCards = [],
  splitCards = [],
  columns,
  equalHeight = false,
}: SummarySectionProps) => {
  const mdSize = columns ? Math.floor(12 / columns) : 3;
  return (
    <Grid container spacing={3}>
      {summaryCards.map((card) => (
        <Grid
          key={card.title}
          size={{ xs: 12, md: mdSize }}
          sx={equalHeight ? { display: "flex" } : undefined}
        >
          <SummaryCard title={card.title} value={card.value} fullHeight={equalHeight} />
        </Grid>
      ))}

      {splitCards.map((card) => (
        <Grid
          key={card.title}
          size={{ xs: 12, md: mdSize }}
          sx={equalHeight ? { display: "flex" } : undefined}
        >
          <SplitSummaryCard title={card.title} data={card.data} fullHeight={equalHeight} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SummarySection;
