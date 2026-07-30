import { Box, Typography } from "@mui/material";

interface ComingSoonProps {
  title: string;
}

export default function ComingSoon({ title }: ComingSoonProps) {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" fontWeight={600}>
        {title}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        This module is under development.
      </Typography>
    </Box>
  );
}
