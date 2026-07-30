import { useState } from "react";

import { Card, CardContent, Tabs, Tab, Typography, Divider, Box } from "@mui/material";

const RecentLogsPanel = () => {
  const [tab, setTab] = useState(0);

  return (
    <Card>
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
          {tab === 0 && <>Success Table</>}

          {tab === 1 && <>Failed Table</>}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentLogsPanel;
