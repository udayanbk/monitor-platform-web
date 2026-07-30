import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import PaymentsDashboard from "./PaymentsDashboard";

const RenewalDashboardTabs = () => {
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
          <Tab label="Payments" />
        </Tabs>
      </Box>

      {value === 0 && <PaymentsDashboard />}
    </>
  );
};

export default RenewalDashboardTabs;
