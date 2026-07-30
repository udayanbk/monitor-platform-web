import PageTitle from "../../components/common/PageTitle";
import AppLayout from "../../components/layout/AppLayout";

const SettingsPage = () => {
  return (
    <AppLayout>
      <PageTitle title="Settings" subtitle="Real-time monitoring of all applications" />
      <div style={{ padding: "20px" }}></div>
    </AppLayout>
  );
};

export default SettingsPage;
