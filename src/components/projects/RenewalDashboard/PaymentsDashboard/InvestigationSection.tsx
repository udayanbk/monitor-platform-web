import { Box, Card, CardContent, Divider, Tab, Tabs } from "@mui/material";

import RecentLogsPanel from "./RecentLogsPanel";
import SearchPanel from "./SearchPanel";
import { useState } from "react";

const InvestigationSection = () => {
  const [tab, setTab] = useState(0);

  return (
    <Card
      sx={{
        minHeight: "calc(100vh - 360px)",
        display: "flex",
        flexDirection: "column",
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
          <Tab label="Recent Logs" />
          <Tab label="Search" />
        </Tabs>

        <Divider sx={{ mb: 2 }} />

        <Box>
          {tab === 0 && <RecentLogsPanel />}

          {tab === 1 && <SearchPanel />}
        </Box>
      </CardContent>
    </Card>
  );
};

export default InvestigationSection;
