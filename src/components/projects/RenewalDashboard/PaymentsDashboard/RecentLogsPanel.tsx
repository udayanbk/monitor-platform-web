import { useState } from "react";

import { Card, CardContent, Tabs, Tab, Typography, Divider, Box } from "@mui/material";

const RecentLogsPanel = () => {
  const [tab, setTab] = useState(0);

  return (
    <Card
      sx={{
        minHeight: "calc(100vh - 360px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Recent Logs
        </Typography>

        <Tabs value={tab} onChange={(_, value) => setTab(value)}>
          <Tab label="Successful" />
          <Tab label="Failed" />
        </Tabs>

        <Divider sx={{ mb: 2 }} />

        <Box>
          {tab === 0 && <>Success Data</>}

          {tab === 1 && <>Failed Data</>}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentLogsPanel;
