import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";

interface Props {
  data: Record<string, number>;
}

const TicketStatusBarChart = ({}: Props) => {
  const data = {
    Open: 454,
    Closed: 37,
    Resolved: 4,
    Assigned: 2,
  };
  const chartData = Object.entries(data).map(([status, total]) => ({
    status,
    total,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart layout="vertical" data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="status" width={180} />
        <Tooltip />
        <Bar dataKey="total" radius={[0, 6, 6, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TicketStatusBarChart;
