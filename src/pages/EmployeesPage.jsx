import { Link } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import { useEmployees } from "../hooks/useEmployees";
import { APP_PATHS } from "../routes/paths";

function EmployeesPage() {
  const { employees, resetEmployees } = useEmployees();

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
      <div className="card" data-testid="employees-table-placeholder">
        Employee grid will be implemented in `feature/employee-table`.
        <p>
          Initial dataset loaded: <strong>{employees.length}</strong> employees.
        </p>
      </div>
    </section>
  );
}

export default EmployeesPage;
