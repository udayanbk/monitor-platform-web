import { Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { getPolicyStatistics } from "../../../../services/nivaran.service";
import ActivityCard from "../../components/ActivityCard";
import SummarySection from "../../components/SummarySection ";
import { PolicySummary, TicketActivity } from "../../../common/Interfaces";

const PolicyDashboard = () => {
  const [summary, setSummary] = useState<PolicySummary | null>(null);
  const [activity, setActivity] = useState<TicketActivity | null>(null);

  const getPaymentsData = async () => {
    const resp = await getPolicyStatistics();
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
            equalHeight={true}
            columns={4}
            summaryCards={[
              {
                title: "Total Searched",
                value: summary?.totalSearched ?? "--",
              },
              {
                title: "Total Downloads",
                value: summary?.totalDownloads ?? "--",
              },
            ]}
            splitCards={[
              {
                title: "Success Data",
                data: summary?.successPolicy,
              },
              {
                title: "Failure Data",
                data: summary?.failPolicy,
              },
            ]}
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

export default PolicyDashboard;
