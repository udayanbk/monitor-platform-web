import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

import TicketDashboard from "./TicketDashboard";
import PolicyDashboard from "./PolicyDashboard";
import BancaDashboard from "./BancaDashboard";
import MilestoneDashboard from "./MilestoneDashboard";

const DashboardTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTab-root": {
              fontWeight: 700,
            },
          }}
        >
          <Tab label="Tickets" />
          <Tab label="Policy Analytics" />
          <Tab label="Banca" />
          <Tab label="Milestones" />
        </Tabs>
      </Box>

      {value === 0 && <TicketDashboard />}
      {value === 1 && <PolicyDashboard />}
      {value === 2 && <BancaDashboard />}
      {value === 3 && <MilestoneDashboard />}
    </>
  );
};

export default DashboardTabs;
