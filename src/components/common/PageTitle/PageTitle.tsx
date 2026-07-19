import { Box, Typography } from "@mui/material";

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

const PageTitle = ({ title, subtitle }: PageTitleProps) => {
  return (
    <Box mb={4}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 0.5,
        }}
      >
        {title}
      </Typography>

      {subtitle && (
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default PageTitle;