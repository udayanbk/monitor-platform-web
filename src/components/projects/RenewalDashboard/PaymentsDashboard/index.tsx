import { Grid, Stack } from "@mui/material";

import InvestigationSection from "./InvestigationSection";
import { useEffect, useState } from "react";
import { getPaymentStatus } from "../../../../services/renewalServices";
import { getYesterdayPaymentStatus } from "../../../../services/renewalServices";
import { repushRenewalFailedPayments } from "../../../../services/renewalServices";
import { Summary } from "../../../common/Interfaces";
import SummarySection from "../../components/SummarySection ";
import ActivityCard from "../../components/ActivityCard";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useSnackbar } from "../../../../context/SnackbarContext";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ChannelStats extends Record<string, number> {
  BANCS: number;
  EBAO: number;
}

interface Activity {
  lastHour: {
    successful: ChannelStats;
    failed: ChannelStats;
  };
  last24Hours: {
    successful: ChannelStats;
    failed: ChannelStats;
  };
  last30Days: {
    successful: ChannelStats;
    failed: ChannelStats;
  };
}

interface YesterdayActivity {
  paymentDate: string;
  totalCounts: number;
  successful: ChannelStats;
  failed: ChannelStats;
}

const PaymentsDashboard = () => {
  const { showSnackbar } = useSnackbar();
  const [repushLoading, setRepushLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [activity, setActivity] = useState<Activity | null>(null);
  const [yesterdayActivity, setYesterdayActivity] = useState<YesterdayActivity | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getPaymentsData = async () => {
    const resp = await getPaymentStatus();
    console.log("resp-ren--", resp);
    if (resp?.success === true) {
      setSummary(resp?.data?.summary);
      setActivity(resp?.data?.activity);
    }
  };

  const getYesterdayPaymentsData = async () => {
    const resp = await getYesterdayPaymentStatus();
    console.log("resp-ren-yesterday-", resp);
    if (resp?.success === true) {
      setYesterdayActivity(resp?.data);
    }
  };

  const handleRePush = async () => {
    try {
      setRepushLoading(true);

      const response = await repushRenewalFailedPayments();

      showSnackbar("success", response?.message ?? "Failed payments repushed successfully.");

      handleClose();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ?? error?.message ?? "Unable to repush failed payments.";

      showSnackbar("error", Array.isArray(message) ? message.join(", ") : message);

      handleClose();
    } finally {
      setRepushLoading(false);
    }
  };

  useEffect(() => {
    getPaymentsData();
    getYesterdayPaymentsData();
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
                title: "Success",
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
          {yesterdayActivity && (
            <ActivityCard
              title={`Yesterday - ${yesterdayActivity?.paymentDate}`}
              variant="split"
              sections={[
                {
                  title: "Success",
                  values: yesterdayActivity?.successful ?? {},
                },
                {
                  title: "Fail",
                  values: yesterdayActivity?.failed ?? {},
                },
              ]}
              button={true}
              buttonName="Re-Push"
              functionCall={handleClickOpen}
            />
          )}
          {activity && (
            <>
              <ActivityCard
                title="Last 1 Hour"
                variant="split"
                sections={[
                  {
                    title: "Success",
                    values: activity.lastHour?.successful ?? {},
                  },
                  {
                    title: "Fail",
                    values: activity.lastHour?.failed ?? {},
                  },
                ]}
              />

              <ActivityCard
                title="Last 24 Hours"
                variant="split"
                sections={[
                  {
                    title: "Success",
                    values: activity.last24Hours?.successful ?? {},
                  },
                  {
                    title: "Fail",
                    values: activity.last24Hours?.failed ?? {},
                  },
                ]}
              />

              <ActivityCard
                title="Last 30 Days"
                variant="split"
                sections={[
                  {
                    title: "Success",
                    values: activity.last30Days?.successful ?? {},
                  },
                  {
                    title: "Fail",
                    values: activity.last30Days?.failed ?? {},
                  },
                ]}
              />
            </>
          )}
        </Stack>
      </Grid>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        role="alertdialog"
      >
        <DialogTitle>{"Repush Failed Payments ??"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to process failed payments??
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={repushLoading}>
            Disagree
          </Button>

          <Button onClick={handleRePush} disabled={repushLoading} autoFocus>
            {repushLoading ? (
              <>
                <CircularProgress size={18} sx={{ mr: 1 }} />
                Processing...
              </>
            ) : (
              "Agree"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default PaymentsDashboard;
