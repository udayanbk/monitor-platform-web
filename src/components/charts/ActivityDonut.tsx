import { Typography } from "@mui/material";

interface Props {
  title: string;
}

const ActivityDonut = ({ title }: Props) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      <div
        style={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Donut Chart
      </div>
    </div>
  );
};

export default ActivityDonut;
