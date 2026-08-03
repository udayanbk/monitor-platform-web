import {
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const SearchPanel = () => {
  const [searchKey, setSearchKey] = useState<string>("");
  const handleChange = (event: SelectChangeEvent) => {
    setSearchKey(event.target.value);
  };

  return (
    <Card
      sx={{
        height: "calc(100vh - 360px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
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
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <TextField id="standard-basic" label="Value" variant="standard" sx={{ flex: 1 }} />
        </Box>
        <Box
          sx={{
            mt: 3,
            flex: 1,
            overflow: "auto",
          }}
        >
          Searched Logs
        </Box>
      </CardContent>
    </Card>
  );
};

export default SearchPanel;
