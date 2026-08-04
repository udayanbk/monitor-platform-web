import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Tabs,
  Tab,
  Divider,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  styled,
  tableCellClasses,
  TableCell,
} from "@mui/material";
import { getRenewalFailedLogs, getRenewalSuccessLogs } from "../../../../services/renewalServices";
import { RecentRenewalLog } from "../../../common/Interfaces";

const RecentLogsPanel = () => {
  const [tab, setTab] = useState(0);
  const [logResp, setLogResp] = useState<RecentRenewalLog[]>([]);

  useEffect(() => {
    if (tab === 0) {
      getSuccessLogs();
    } else if (tab == 1) {
      getFailedLogs();
    }
  }, [tab]);

  const getSuccessLogs = async () => {
    const resp = await getRenewalSuccessLogs();
    console.log("success-log--", resp);
    if (resp?.success) {
      setLogResp(resp?.data);
    }
  };

  const getFailedLogs = async () => {
    const resp = await getRenewalFailedLogs();
    console.log("failure-log--", resp);
    if (resp?.success) {
      setLogResp(resp?.data);
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontWeight: 600,
      position: "sticky",
      top: 0,
      zIndex: 2,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      maxWidth: 100,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Card
      sx={{
        height: "calc(100vh - 480px)",
        display: "flex",
        flexDirection: "column",
        border: "none",
        boxShadow: "none",
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          pt: 0,
          px: 2,
          pb: 2,
          "&:last-child": {
            pb: 2,
          },
        }}
      >
        <Tabs value={tab} onChange={(_, value) => setTab(value)}>
          <Tab label="Successful" />
          <Tab label="Failed" />
        </Tabs>

        <Divider sx={{ mb: 2 }} />

        <Box>
          <TableContainer component={Paper} sx={{ overflow: "auto", maxHeight: 360 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" width={180}>
                    Date
                  </StyledTableCell>
                  <StyledTableCell align="center">Policy No</StyledTableCell>
                  <StyledTableCell align="center">Quote No</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center" width={60}>
                    Core
                  </StyledTableCell>
                  <StyledTableCell align="center">Product</StyledTableCell>
                  <StyledTableCell align="center">Amount</StyledTableCell>
                  <StyledTableCell align="center" width={80}>
                    Status
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{}}>
                {logResp && logResp.length > 0 ? (
                  logResp.map((row) => (
                    <StyledTableRow key={row.policy_no as React.Key}>
                      <StyledTableCell align="center">{row?.updated_at}</StyledTableCell>
                      <StyledTableCell align="center">{row?.policy_no}</StyledTableCell>
                      <StyledTableCell align="center">{row.renewal_quote_number}</StyledTableCell>
                      <StyledTableCell align="center">{row.insured_name}</StyledTableCell>
                      <StyledTableCell align="center" width={60}>
                        {row.target_core_system}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.product_code}</StyledTableCell>
                      <StyledTableCell align="center">{row.amount}</StyledTableCell>
                      <StyledTableCell align="center" width={80}>
                        {row.status_message}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No Records Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentLogsPanel;
