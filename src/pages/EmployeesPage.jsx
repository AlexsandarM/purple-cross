import { Link } from "react-router-dom";
import EmployeeTable from "../components/employees/EmployeeTable";
import PageHeader from "../components/common/PageHeader";
import { useEmployees } from "../hooks/useEmployees";
import { APP_PATHS } from "../routes/paths";

function EmployeesPage() {
  const { employees, deleteEmployee, resetEmployees } = useEmployees();

  const handleDeleteEmployee = (code) => {
    deleteEmployee(code);
  };

  return (
    <section className="page">
      <PageHeader
        title="Employee Management"
        subtitle="Centralized employee directory and actions."
        actions={
          <div className="page-actions">
            <button
              type="button"
              className="button button-secondary"
              onClick={resetEmployees}
              data-testid="employees-reset-button"
            >
              Reset Data
            </button>
            <Link className="button button-primary" to={APP_PATHS.createEmployee} data-testid="employees-create-button">
              Create Employee
            </Link>
          </div>
        }
      />
      <EmployeeTable employees={employees} onDelete={handleDeleteEmployee} />
    </section>
  );
}

export default EmployeesPage;
