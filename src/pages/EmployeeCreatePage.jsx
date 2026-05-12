import { Link } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import { APP_PATHS } from "../routes/paths";

function EmployeeCreatePage() {
  return (
    <section className="page">
      <PageHeader title="Create Employee" subtitle="Reusable employee form will be added in a dedicated feature branch." />
      <div className="card" data-testid="create-employee-form-placeholder">
        Create form placeholder.
      </div>
      <Link to={APP_PATHS.employees} className="button button-secondary" data-testid="create-employee-back-button">
        Back to Employees
      </Link>
    </section>
  );
}

export default EmployeeCreatePage;
