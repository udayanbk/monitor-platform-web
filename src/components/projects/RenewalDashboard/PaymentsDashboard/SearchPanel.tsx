import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import PolicyIcon from "@mui/icons-material/Policy";
import React, { useState } from "react";
import { searchRenewalLogs } from "../../../../services/renewalServices";
import { SearchRenewalLog } from "../../../common/Interfaces";

const SearchPanel = () => {
  const [searchKey, setSearchKey] = useState<string>("");
  const [searchVal, setSearchVal] = useState<string>("");
  const [searchedData, setSearchedData] = useState<SearchRenewalLog>();
  const [expandedRow, setExpandedRow] = useState<string | number | null>(null);
  const handleChange = (event: SelectChangeEvent) => {
    console.log("event.target.value", event.target.value);
    setSearchKey(event.target.value);
  };

  const searchLog = async () => {
    const payload = {
      searchKey,
      searchVal,
    };
    const resp = await searchRenewalLogs(payload);
    if (resp?.success) {
      console.log("search response", resp?.data);
      setSearchedData(resp?.data);
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontWeight: 600,
      height: 40,
      paddingTop: 6,
      paddingBottom: 6,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      maxWidth: 100,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      height: 40,
      paddingTop: 6,
      paddingBottom: 6,
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
        // height: "calc(100vh - 480px)",
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
        <Box display="flex" alignItems="self-start" gap={2}>
          <Avatar
            sx={{
              width: 50,
              height: 50,
              bgcolor: "primary.main",
            }}
          >
            <PolicyIcon sx={{ fontSize: 38 }} />
          </Avatar>
          <FormControl variant="standard" sx={{ maxWidth: "35%", mt: 0, flex: 1 }}>
            <InputLabel id="demo-simple-select-standard-label">Key</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={searchKey}
              onChange={handleChange}
            >
              <MenuItem value={"policy"}>Policy Number</MenuItem>
              <MenuItem value={"quote"}>Quote Number</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="standard-basic"
            label="Value"
            variant="standard"
            sx={{ flex: 1, maxWidth: "35%" }}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <Button
            variant="outlined"
            onClick={searchLog}
            sx={{ width: "20%", mt: 2, height: 35, border: "2px solid", fontWeight: "bold" }}
          >
            Search
          </Button>
        </Box>
        <Box
          sx={{
            mt: 3,
            flex: 1,
            overflow: "auto",
          }}
        >
          {!searchedData ? (
            <Typography>Searched Data will be shown here...</Typography>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow sx={{ maxHeight: 20 }}>
                      <StyledTableCell align="center" width={180}>
                        Date
                      </StyledTableCell>
                      <StyledTableCell align="center" width={180}>
                        Quote No
                      </StyledTableCell>
                      <StyledTableCell align="center" width={180}>
                        Policy No
                      </StyledTableCell>
                      <StyledTableCell align="center" width={120}>
                        Payment Done
                      </StyledTableCell>
                      <StyledTableCell align="center" width={120}>
                        Amount
                      </StyledTableCell>
                      <StyledTableCell align="center" width={240}>
                        Status
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow key={searchedData?.logs?.policy_no as React.Key}>
                      <StyledTableCell align="center">
                        {searchedData?.logs?.updated_at}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {searchedData?.logs?.renewal_quote_number}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {searchedData?.logs?.policy_no}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {searchedData?.logs?.payment_flag === 1 ? "Yes" : "No"}
                      </StyledTableCell>
                      <StyledTableCell align="center">{searchedData?.logs?.amount}</StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          whiteSpace: "normal !important",
                          overflow: "visible !important",
                          textOverflow: "clip !important",
                          wordBreak: "break-word",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {searchedData?.logs?.billdesk_recon_msg}
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">Renewal ID</StyledTableCell>
                      <StyledTableCell align="center">Name</StyledTableCell>
                      <StyledTableCell align="center">CON</StyledTableCell>
                      <StyledTableCell align="center">Policy Type</StyledTableCell>
                      <StyledTableCell align="center">Product Code</StyledTableCell>
                      <StyledTableCell align="center">Core</StyledTableCell>
                      <StyledTableCell align="center">Notice Status</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow key={searchedData?.logs?.policy_no as React.Key}>
                      <StyledTableCell align="center">
                        {searchedData?.logs?.renewals_id}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {searchedData?.logs?.insured_name}
                      </StyledTableCell>
                      <StyledTableCell align="center">{searchedData?.logs?.con}</StyledTableCell>
                      <StyledTableCell align="center">
                        {searchedData?.logs?.policy_type}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {searchedData?.logs?.product_code}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {searchedData?.logs?.target_core_system}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          whiteSpace: "normal !important",
                          overflow: "visible !important",
                          textOverflow: "clip !important",
                          wordBreak: "break-word",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {searchedData?.logs?.renewal_notice_status}
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="h6" padding={1}>
                Service Logs
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow sx={{ maxHeight: 20 }}>
                      <StyledTableCell align="center" width={"15%"}>
                        Time Stamp
                      </StyledTableCell>
                      <StyledTableCell align="center" width={"30%"}>
                        Request
                      </StyledTableCell>
                      <StyledTableCell align="center" width={"55%"}>
                        Response
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchedData?.serviceLog?.map((row) => {
                      const rowKey = row?.counter;
                      const isExpanded = expandedRow === rowKey;

                      return (
                        <React.Fragment key={rowKey}>
                          {/* Normal compact row */}
                          <StyledTableRow
                            hover
                            onClick={() => setExpandedRow(isExpanded ? null : rowKey)}
                            sx={{ cursor: "pointer" }}
                          >
                            <StyledTableCell align="center">
                              {row?.response_timestamp}
                            </StyledTableCell>

                            <StyledTableCell align="center">
                              {isExpanded ? "▲" : "▼"}
                            </StyledTableCell>

                            <StyledTableCell align="center">Click to view logs</StyledTableCell>
                          </StyledTableRow>

                          {/* Expanded row */}
                          {isExpanded && (
                            <StyledTableRow>
                              <StyledTableCell colSpan={3} sx={{ padding: 0, borderBottom: 0 }}>
                                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                                  <Box sx={{ p: 2 }}>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        gap: 2,
                                        alignItems: "flex-start",
                                      }}
                                    >
                                      {/* Request */}
                                      <Box sx={{ flex: 1 }}>
                                        <Typography fontWeight={700} mb={1}>
                                          Request
                                        </Typography>

                                        <Box
                                          component="pre"
                                          sx={{
                                            margin: 0,
                                            padding: 2,
                                            backgroundColor: "#f5f5f5",
                                            borderRadius: 1,
                                            overflow: "auto",
                                            maxHeight: 400,
                                            fontSize: "12px",
                                            textAlign: "left",
                                          }}
                                        >
                                          {JSON.stringify(row?.request_json, null, 2)}
                                        </Box>
                                      </Box>

                                      {/* Response */}
                                      <Box sx={{ flex: 1 }}>
                                        <Typography fontWeight={700} mb={1}>
                                          Response
                                        </Typography>

                                        <Box
                                          component="pre"
                                          sx={{
                                            margin: 0,
                                            padding: 2,
                                            backgroundColor: "#f5f5f5",
                                            borderRadius: 1,
                                            overflow: "auto",
                                            maxHeight: 400,
                                            fontSize: "12px",
                                            textAlign: "left",
                                          }}
                                        >
                                          {JSON.stringify(row?.response_json, null, 2)}
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Box>
                                </Collapse>
                              </StyledTableCell>
                            </StyledTableRow>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SearchPanel;
