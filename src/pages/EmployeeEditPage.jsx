import { Link, useParams } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import { APP_PATHS } from "../routes/paths";

function EmployeeEditPage() {
  const { code } = useParams();

  return (
    <section className="page">
      <PageHeader title={`Edit Employee ${code ?? ""}`} subtitle="Edit flow will be completed in a dedicated feature branch." />
      <div className="card" data-testid="edit-employee-form-placeholder">
        Edit form placeholder.
      </div>
      <Link to={APP_PATHS.employees} className="button button-secondary" data-testid="edit-employee-back-button">
        Back to Employees
      </Link>
    </section>
  );
}

export default EmployeeEditPage;
