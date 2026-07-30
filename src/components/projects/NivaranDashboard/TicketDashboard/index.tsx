import { Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { getTicketStatistics } from "../../../../services/nivaran.service";
import ActivityCard from "../../components/ActivityCard";
import SummarySection from "../../components/SummarySection ";
import { TicketActivity, TicketSummary } from "../../../common/Interfaces";

const PaymentsDashboard = () => {
  const [summary, setSummary] = useState<TicketSummary | null>(null);
  const [activity, setActivity] = useState<TicketActivity | null>(null);

  const getPaymentsData = async () => {
    const resp = await getTicketStatistics();
    if (resp?.success === true) {
      console.log("resp-ticket--", resp);
      setSummary(resp?.data?.summary);
      setActivity(resp?.data?.activity);
    }
  };

  useEffect(() => {
    getPaymentsData();
  }, []);

  return (
    <Grid container spacing={3}>
      {/* Left column */}
      <Grid size={{ xs: 12, lg: 10 }}>
        <Stack spacing={3}>
          <SummarySection
            summaryCards={[
              {
                title: "Total Tickets",
                value: summary?.TotalTickets ?? "--",
              },
              {
                title: "Closed",
                value: summary?.Closed ?? "--",
              },
              {
                title: "Initiated",
                value: summary?.initiated ?? "--",
              },
              {
                title: "Discrepancy",
                value: summary?.discrepancy ?? "--",
              },
              {
                title: "Resolved",
                value: summary?.Resolved ?? "--",
              },
            ]}
            columns={"grow"}
          />

          {/* <InvestigationSection /> */}
        </Stack>
      </Grid>

      {/* Right column */}
      <Grid size={{ xs: 12, lg: 2 }}>
        <Stack spacing={2}>
          {activity && (
            <>
              <ActivityCard
                title="Last 1 Hour"
                variant="stacked"
                sections={[
                  {
                    title: "",
                    values: activity.lastHour ?? {},
                  },
                ]}
              />

              <ActivityCard
                title="Last 24 Hours"
                variant="split"
                sections={[
                  {
                    title: "",
                    values: activity.last24Hours ?? {},
                  },
                ]}
              />

              <ActivityCard
                title="Last 30 Days"
                variant="split"
                sections={[
                  {
                    title: "",
                    values: activity.last30Days ?? {},
                  },
                ]}
              />
            </>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default PaymentsDashboard;
