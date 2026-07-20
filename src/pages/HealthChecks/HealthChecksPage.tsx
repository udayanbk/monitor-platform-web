import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
// import Typography from "@mui/material/Typography";
import { getProjectStatus } from "../../services/project.service";
import PageTitle from "../../components/common/PageTitle";
import StatusChip from "../../components/common/StatusChip";
import SummaryCard from "../../components/cards/SummaryCard";
import StorageIcon from "@mui/icons-material/Storage";
import SpeedIcon from "@mui/icons-material/Speed";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Grid from "@mui/material/Grid";

export default function HealthChecksPage() {
  const [projects, setProjects] = useState<any[]>([]);

  const loadProjects = async () => {
    const data = await getProjectStatus();

    const projectList = Object.entries(data).map(
      ([projectName, details]: any) => ({
        project: projectName,
        ...details,
      }),
    );

    setProjects(projectList);
  };

  useEffect(() => {
    loadProjects();

    const timer = setInterval(loadProjects, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <AppLayout>
      <PageTitle
        title="Health-Checks"
        subtitle="Real-time monitoring of all applications"
      />
      <div style={{ padding: "20px" }}>
        <h2>Monitor Platform</h2>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <SummaryCard
              title="Projects"
              value={4}
              subtitle="Active monitored projects"
              icon={<StorageIcon color="primary" />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <SummaryCard
              title="Average Response"
              value="18 ms"
              subtitle="Last health check"
              icon={<SpeedIcon color="success" />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <SummaryCard
              title="Failures"
              value={2}
              subtitle="Today's failures"
              icon={<ErrorOutlineIcon color="error" />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <SummaryCard
              title="Health Checks"
              value={125}
              subtitle="Today's checks"
              icon={<FavoriteIcon color="success" />}
            />
          </Grid>
        </Grid>
        <table
          border={1}
          cellPadding={10}
          cellSpacing={0}
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Project</th>
              <th>Status</th>
              <th>Response</th>
              <th>Last Checked</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr key={project.project}>
                <td>{project.project}</td>
                <td>
                  <StatusChip status={project.health.status} />
                </td>
                <td>{project.health.responseTime} ms</td>
                <td>{project.health.lastChecked}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
