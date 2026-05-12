import { Link } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import employees from "../data/employees.json";

function EmployeesPage() {
  return (
    <section className="page">
      <PageHeader
        title="Employee Management"
        subtitle="Centralized employee directory and actions."
        actions={
          <Link className="button button-primary" to="/employees/new" data-testid="employees-create-button">
            Create Employee
          </Link>
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
