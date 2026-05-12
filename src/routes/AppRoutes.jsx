import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import EmployeeCreatePage from "../pages/EmployeeCreatePage";
import EmployeeDetailsPage from "../pages/EmployeeDetailsPage";
import EmployeeEditPage from "../pages/EmployeeEditPage";
import EmployeesPage from "../pages/EmployeesPage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/employees" replace />} />
      <Route element={<AppLayout />}>
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/employees/new" element={<EmployeeCreatePage />} />
        <Route path="/employees/:code" element={<EmployeeDetailsPage />} />
        <Route path="/employees/:code/edit" element={<EmployeeEditPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
