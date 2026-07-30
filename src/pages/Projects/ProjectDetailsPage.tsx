import { useParams } from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";

import NivaranDashboard from "../../components/projects/NivaranDashboard";
import RenewalDashboard from "../../components/projects/RenewalDashboard";

const ProjectDetailsPage = () => {
  const { projectId } = useParams();

  const renderProject = () => {
    switch (projectId) {
      case "nivaran":
        return <NivaranDashboard />;
      case "renewal":
        return <RenewalDashboard />;

      default:
        return <h2>Project not found</h2>;
    }
  };

  return (
    <AppLayout>
      <div style={{ padding: "0px 20px 0px 20px" }}>{renderProject()}</div>
    </AppLayout>
  );
};

export default ProjectDetailsPage;
