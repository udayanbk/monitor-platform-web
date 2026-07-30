import { Card, CardContent, Typography, Box } from "@mui/material";

import { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  height?: number;
  icon?: ReactNode;
}

const SummaryCard = ({ title, value, subtitle, icon, height }: SummaryCardProps) => {
  return (
    <Card
      elevation={2}
      sx={{
        height: height ? `${height}%` : "100%",
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>

          {icon}
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          {value}
        </Typography>

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
