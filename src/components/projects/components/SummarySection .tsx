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
  columns?: 2 | 3 | "grow";
}

const SummarySection = ({ summaryCards = [], splitCards = [], columns }: SummarySectionProps) => {
  return (
    <Grid container spacing={3}>
      {summaryCards.map((card) => (
        <Grid key={card.title} size={{ xs: 12, md: columns ? columns : 3 }}>
          <SummaryCard title={card.title} value={card.value} />
        </Grid>
      ))}

      {splitCards.map((card) => (
        <Grid key={card.title} size={{ xs: 12, md: 3 }}>
          <SplitSummaryCard title={card.title} data={card.data} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SummarySection;
