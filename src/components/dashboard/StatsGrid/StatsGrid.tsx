import { Grid } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const StatsGrid = ({ children }: Props) => {
  return (
    <Grid container spacing={3}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={6}
              lg={3}
            >
              {child}
            </Grid>
          ))
        : (
          <Grid item xs={12}>
            {children}
          </Grid>
        )}
    </Grid>
  );
};

export default StatsGrid;