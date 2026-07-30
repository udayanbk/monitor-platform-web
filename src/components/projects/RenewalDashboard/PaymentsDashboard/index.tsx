import { Grid, Stack } from "@mui/material";

// import SummarySection from "./SummarySection";
// import ActivityCard from "./ActivityCard";
import InvestigationSection from "./InvestigationSection";
import { useEffect, useState } from "react";
import { getPaymentStatus } from "../../../../services/renewalServices";
import { Summary } from "../../../common/Interfaces";
import SummarySection from "../../components/SummarySection ";
import ActivityCard from "../../components/ActivityCard";

interface ChannelStats {
  successful: {
    BANCS: number;
    EBAO: number;
  };
  failed: {
    BANCS: number;
    EBAO: number;
  };
}

interface Activity {
  lastHour: ChannelStats;
  last24Hours: ChannelStats;
  last30Days: ChannelStats;
}

const PaymentsDashboard = () => {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [activity, setActivity] = useState<Activity | null>(null);

  const getPaymentsData = async () => {
    const resp = await getPaymentStatus();
    console.log("resp-ren--", resp);
    if (resp?.success === true) {
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
                title: "Total Search",
                value: summary?.totalSearch ?? "--",
              },
              {
                title: "Total Payments",
                value: summary?.totalPayments ?? "--",
              },
            ]}
            splitCards={[
              {
                title: "Successful",
                data: summary?.successful,
              },
              {
                title: "Failed",
                data: summary?.failed,
              },
            ]}
          />
          <InvestigationSection />
        </Stack>
      </Grid>

      {/* Right column */}
      <Grid size={{ xs: 12, lg: 2 }}>
        <Stack spacing={2}>
          {activity && (
            <>
              <ActivityCard
                title="Last 1 Hour"
                variant="split"
                sections={[
                  {
                    title: "Successful",
                    values: activity.lastHour?.successful ?? {},
                  },
                  {
                    title: "Failed",
                    values: activity.lastHour?.failed ?? {},
                  },
                ]}
              />

              <ActivityCard
                title="Last 24 Hours"
                variant="split"
                sections={[
                  {
                    title: "Successful",
                    values: activity.last24Hours?.successful ?? {},
                  },
                  {
                    title: "Failed",
                    values: activity.last24Hours?.failed ?? {},
                  },
                ]}
              />

              <ActivityCard
                title="Last 30 Days"
                variant="split"
                sections={[
                  {
                    title: "Successful",
                    values: activity.last30Days?.successful ?? {},
                  },
                  {
                    title: "Failed",
                    values: activity.last30Days?.failed ?? {},
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
