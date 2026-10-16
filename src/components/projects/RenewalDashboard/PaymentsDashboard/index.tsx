import { Box, Grid, IconButton, Stack } from "@mui/material";
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
  // get24HrPaymentStatus,
  getPaymentStatus,
  getYesterdayPaymentStatus,
  repushRenewalFailedPayments,
} from "../../../../services/renewalServices";
import { Summary } from "../../../common/Interfaces";
import BButton from "../../../common/BButton";
import SummarySection from "../../components/SummarySection ";
import ActivityCard from "../../components/ActivityCard";
import InvestigationSection from "./InvestigationSection";
import dayjs, { Dayjs } from "dayjs";
import DateSelector from "../../../common/DateSelector";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

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

// interface Activity {
//   lastHour: {
//     successful: ChannelStats;
//     failed: ChannelStats;
//   };
//   last24Hours: {
//     successful: ChannelStats;
//     failed: ChannelStats;
//   };
//   last30Days: {
//     successful: ChannelStats;
//     failed: ChannelStats;
//   };
// }

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
  // const [activity, setActivity] = useState<Activity | null>(null);
  const [yesterdayActivity, setYesterdayActivity] = useState<YesterdayActivity | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getPaymentsData = async () => {
    try {
      const payload = {
        selectedDate: selectedDate.format("YYYY-MM-DD"),
      };
      const resp = await getPaymentStatus(payload);
      console.log("getPaymentsData--resp--", resp);
      if (resp?.success === true) {
        setSummary(resp?.data?.summary);
        // setActivity(resp?.data?.activity);
      }
    } catch (error) {
      console.error("Failed to fetch payment status:", error);
    }
  };

  // const get24HrPaymentsData = async () => {
  //   try {
  //     const resp = await get24HrPaymentStatus();
  //     console.log("get24HrPaymentsData--resp--", resp);
  //     if (resp?.success === true) {
  //       // setSummary(resp?.data?.summary);
  //       setActivity(resp?.data?.activity);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch payment status:", error);
  //   }
  // };

  const getYesterdayPaymentsData = async () => {
    try {
      const resp = await getYesterdayPaymentStatus();
      console.log("getYesterdayPaymentsData--resp--", resp);
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

      await Promise.all([
        getPaymentsData(),
        // get24HrPaymentsData(),
        getYesterdayPaymentsData(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const selectDayLoadDashboardData = async () => {
    try {
      setLoading(true);
      await getPaymentsData();
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

  useEffect(() => {
    selectDayLoadDashboardData();
  }, [selectedDate]);

  const refreshCall = () => {
    setSelectedDate(dayjs());
  };

  const handleCopyStatistics = async () => {
    const currentTime = new Date().toLocaleTimeString("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const ebaoTotal = (summary?.successful?.EBAO ?? 0) + (summary?.failed?.EBAO ?? 0);
    const bancsTotal = (summary?.successful?.BANCS ?? 0) + (summary?.failed?.BANCS ?? 0);

    const reportText = `${selectedDate.format("DD MMMM YYYY")} | Insta-Renew ${currentTime}

Total Ebao Successful Payments = ${ebaoTotal}
Ebao Total Policy Issued: ${summary?.successful?.EBAO ?? 0}
Ebao Total failed policy: ${summary?.failed?.EBAO ?? 0}

Total Bancs successful payments = ${bancsTotal}
Bancs Total policy Issued: ${summary?.successful?.BANCS ?? 0}
Bancs Total failed policy: ${summary?.failed?.BANCS ?? 0}`;

    try {
      await navigator.clipboard.writeText(reportText);
      console.log("Report copied to clipboard");
    } catch (error) {
      console.error("Failed to copy report:", error);
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <Grid container spacing={2}>
            {/* Select Date */}
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
            </Grid>

            {/* Total Payments */}
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <SummarySection
                columns={1}
                loading={loading}
                summaryCards={[
                  {
                    title: "Total no of Payments",
                    value: summary?.totalPayments ?? "--",
                    subtitle: "Today",
                    action: (
                      <IconButton
                        size="medium"
                        color="primary"
                        aria-label="View payment details"
                        onClick={handleCopyStatistics}
                      >
                        <ContentCopyIcon fontSize="large" />
                      </IconButton>
                    ),
                  },
                ]}
              />
            </Grid>

            {/* Success Today */}
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <SummarySection
                columns={1}
                loading={loading}
                splitCards={[
                  {
                    title: `Success Today ${summary?.totalSuccess ?? 0}`,
                    data: summary?.successful,
                  },
                ]}
              />
            </Grid>

            {/* Failed Today */}
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <SummarySection
                columns={1}
                loading={loading}
                splitCards={[
                  {
                    title: `Failed Today ${summary?.totalFailed ?? 0}`,
                    data: summary?.failed,
                  },
                ]}
              />
            </Grid>
          </Grid>

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
              disabled={loading}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
            {/* <Box sx={{ width: "50%" }}>
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
            </Box> */}

            <Box sx={{ width: "100%" }}>
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

      <InvestigationSection selectedDate={selectedDate.format("YYYY-MM-DD")} />

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
