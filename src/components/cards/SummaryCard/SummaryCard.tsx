import { Card, CardContent, Typography, Box } from "@mui/material";

import { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  height?: number;
  icon?: ReactNode;
  fullHeight?: boolean;
  action?: React.ReactNode;
}

const SummaryCard = ({
  title,
  value,
  subtitle,
  icon,
  height,
  fullHeight = false,
  action,
}: SummaryCardProps) => {
  return (
    <Card
      elevation={3}
      sx={{
        height: fullHeight ? "100%" : height ? `${height}%` : "100%",
        flex: fullHeight ? 1 : undefined,
        borderRadius: 3,
        border: 2,
        borderColor: "primary.main",
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>

          {icon}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Typography variant="h4" fontWeight={600}>
            {value}
          </Typography>

          {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
        </Box>

        {subtitle && (
          <Typography variant="body2" color="text.secondary" mt={1}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
