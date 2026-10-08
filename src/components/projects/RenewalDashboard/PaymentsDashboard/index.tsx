import { Box, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
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
import {
  getPaymentStatus,
  getYesterdayPaymentStatus,
  repushRenewalFailedPayments,
} from "../../../../services/renewalServices";
import { Summary } from "../../../common/Interfaces";
import BButton from "../../../common/BButton";
import SummarySection from "../../components/SummarySection ";
import ActivityCard from "../../components/ActivityCard";
import InvestigationSection from "./InvestigationSection";

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

  const [loading, setLoading] = useState(true);
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
    try {
      const resp = await getPaymentStatus();

      if (resp?.success === true) {
        setSummary(resp?.data?.summary);
        setActivity(resp?.data?.activity);
      }
    } catch (error) {
      console.error("Failed to fetch payment status:", error);
    }
  };

  const getYesterdayPaymentsData = async () => {
    try {
      const resp = await getYesterdayPaymentStatus();

      if (resp?.success === true) {
        setYesterdayActivity(resp?.data);
      }
    } catch (error) {
      console.error("Failed to fetch yesterday payment status:", error);
    }
  };

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      await Promise.all([getPaymentsData(), getYesterdayPaymentsData()]);
    } finally {
      setLoading(false);
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
    loadDashboardData();
  }, []);

  const refreshCall = () => {
    loadDashboardData();
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <SummarySection
            loading={loading}
            summaryCards={[
              {
                title: "Total Search",
                value: summary?.totalSearch ?? "--",
              },
              {
                title: "Total no of Payments",
                value: summary?.totalPayments ?? "--",
                subtitle: "Today",
              },
            ]}
            splitCards={[
              {
                title: "Success Today",
                data: summary?.successful,
              },
              {
                title: "Failed Today",
                data: summary?.failed,
              },
            ]}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 1,
              ml: "25%",
            }}
          >
            <BButton
              buttonName="Refresh"
              functionCall={refreshCall}
              fullWidth={false}
              color="red"
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
            <Box sx={{ width: "50%" }}>
              <ActivityCard
                loading={loading}
                title="Last 24 Hours"
                variant="split"
                sections={[
                  {
                    title: "Success",
                    values: activity?.last24Hours?.successful ?? {},
                  },
                  {
                    title: "Fail",
                    values: activity?.last24Hours?.failed ?? {},
                  },
                ]}
              />
            </Box>

            <Box sx={{ width: "50%" }}>
              <ActivityCard
                loading={loading}
                title={`Yesterday - ${yesterdayActivity?.paymentDate ?? ""}`}
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
            </Box>
          </Stack>
        </Grid>
      </Grid>

      <InvestigationSection />

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
    </>
  );
};

export default PaymentsDashboard;
