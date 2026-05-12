import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import EmployeeCreatePage from "../pages/EmployeeCreatePage";
import EmployeeDetailsPage from "../pages/EmployeeDetailsPage";
import EmployeeEditPage from "../pages/EmployeeEditPage";
import EmployeesPage from "../pages/EmployeesPage";
import NotFoundPage from "../pages/NotFoundPage";
import { APP_PATHS } from "./paths";

function AppRoutes() {
  return (
    <Routes>
      <Route path={APP_PATHS.home} element={<Navigate to={APP_PATHS.employees} replace />} />
      <Route element={<AppLayout />}>
        <Route path={APP_PATHS.employees} element={<EmployeesPage />} />
        <Route path={APP_PATHS.createEmployee} element={<EmployeeCreatePage />} />
        <Route path={APP_PATHS.employeeDetails} element={<EmployeeDetailsPage />} />
        <Route path={APP_PATHS.editEmployee} element={<EmployeeEditPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
