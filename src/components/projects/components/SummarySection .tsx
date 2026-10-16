import { Grid, Skeleton } from "@mui/material";
import SummaryCard from "../../cards/SummaryCard";
import SplitSummaryCard from "../../cards/SplitSummaryCard";
import { ReactNode } from "react";

interface SummaryCardItem {
  title: string;
  subtitle?: string;
  value: number | string;
  action?: ReactNode;
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
  loading?: boolean;
}

const SummarySection = ({
  summaryCards = [],
  splitCards = [],
  columns,
  equalHeight = false,
  loading = false,
}: SummarySectionProps) => {
  const mdSize = columns ? Math.floor(12 / columns) : 3;

  if (loading) {
    return (
      <Grid container spacing={3}>
        {summaryCards.map((card) => (
          <Grid
            key={card.title}
            size={{ xs: 12, md: mdSize }}
            sx={equalHeight ? { display: "flex" } : undefined}
          >
            <Skeleton variant="rounded" width="100%" height={130} animation="wave" />
          </Grid>
        ))}

        {splitCards.map((card) => (
          <Grid
            key={card.title}
            size={{ xs: 12, md: mdSize }}
            sx={equalHeight ? { display: "flex" } : undefined}
          >
            <Skeleton variant="rounded" width="100%" height={130} animation="wave" />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      {summaryCards.map((card) => (
        <Grid
          key={card.title}
          size={{ xs: 12, md: mdSize }}
          sx={equalHeight ? { display: "flex" } : undefined}
        >
          <SummaryCard
            title={card.title}
            value={card.value}
            fullHeight={equalHeight}
            subtitle={card.subtitle}
            action={card.action}
          />
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
