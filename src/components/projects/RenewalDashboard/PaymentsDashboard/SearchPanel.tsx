import {
  Box,
  Button,
  Card,
  CardContent,
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
import { useState } from "react";
import { searchRenewalLogs } from "../../../../services/renewalServices";
import { SearchRenewalLog } from "../../../common/Interfaces";

const SearchPanel = () => {
  const [searchKey, setSearchKey] = useState<string>("");
  const [searchVal, setSearchVal] = useState<string>("");
  const [searchedData, setSearchedData] = useState<SearchRenewalLog>();
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
        <Box display="flex" alignItems="self-start" gap={2}>
          <Typography variant="h6" fontWeight={700} sx={{ mt: 2, p: 0 }}>
            Search
          </Typography>
          <FormControl variant="standard" sx={{ minWidth: 120, mt: 0, flex: 1 }}>
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
            sx={{ flex: 1 }}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <Button onClick={searchLog}>Search</Button>
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
                    <TableRow>
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
                    <StyledTableRow key={searchedData?.policy_no as React.Key}>
                      <StyledTableCell align="center">{searchedData?.updated_at}</StyledTableCell>
                      <StyledTableCell align="center">
                        {searchedData?.renewal_quote_number}
                      </StyledTableCell>
                      <StyledTableCell align="center">{searchedData?.policy_no}</StyledTableCell>

                      <StyledTableCell align="center">
                        {searchedData?.payment_flag === 1 ? "Yes" : "No"}
                      </StyledTableCell>
                      <StyledTableCell align="center">{searchedData?.amount}</StyledTableCell>
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
                        {searchedData?.billdesk_recon_msg}
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
                    <StyledTableRow key={searchedData?.policy_no as React.Key}>
                      <StyledTableCell align="center">{searchedData?.renewals_id}</StyledTableCell>
                      <StyledTableCell align="center">{searchedData?.insured_name}</StyledTableCell>
                      <StyledTableCell align="center">{searchedData?.con}</StyledTableCell>
                      <StyledTableCell align="center">{searchedData?.policy_type}</StyledTableCell>
                      <StyledTableCell align="center">{searchedData?.product_code}</StyledTableCell>
                      <StyledTableCell align="center">
                        {searchedData?.target_core_system}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {searchedData?.renewal_notice_status}
                      </StyledTableCell>
                    </StyledTableRow>
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
