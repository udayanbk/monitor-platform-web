import { useParams } from "react-router-dom";
import PageTitle from "../../components/common/PageTitle";
import AppLayout from "../../components/layout/AppLayout";

const ProjectDetailsPage = () => {
  const { projectId } = useParams();

  return (
    <AppLayout>
      <PageTitle
        title="Projects"
        subtitle="Real-time monitoring of all applications"
      />
      <div style={{ padding: "20px" }}>
        <h2>{projectId}</h2>;
      </div>
    </AppLayout>
  );
};

export default ProjectDetailsPage;
