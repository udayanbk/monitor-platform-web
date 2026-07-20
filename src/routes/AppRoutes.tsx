import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";

import ProtectedRoute from "../auth/ProtectedRoute";
import PublicRoute from "../auth/PublicRoute";
import HealthChecksPage from "../pages/HealthChecks/HealthChecksPage";
import EventsPage from "../pages/Events/EventsPage";
import AlertsPage from "../pages/Alerts/AlertsPage";
import ReportsPage from "../pages/Reports/ReportsPage";
import SettingsPage from "../pages/Settings/SettingsPage";
import ProjectDetailsPage from "../pages/Projects/ProjectDetailsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HealthChecksPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/events" element={<EventsPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/alerts" element={<AlertsPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/reports" element={<ReportsPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
      </Route>

    </Routes>
  );
};

export default AppRoutes;