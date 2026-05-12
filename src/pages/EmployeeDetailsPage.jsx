import { generatePath, Link, useParams } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import { APP_PATHS } from "../routes/paths";

function EmployeeDetailsPage() {
  const { code } = useParams();
  const editPath = code ? generatePath(APP_PATHS.editEmployee, { code }) : APP_PATHS.employees;

  return (
    <section className="page">
      <PageHeader title={`Employee Details: ${code ?? ""}`} subtitle="Detailed employee profile card will be implemented in a dedicated feature branch." />
      <div className="card" data-testid="employee-details-card-placeholder">
        Employee details placeholder.
      </div>
      <div className="row-actions">
        <Link to={APP_PATHS.employees} className="button button-secondary" data-testid="employee-details-back-button">
          Back
        </Link>
        <Link to={editPath} className="button button-primary" data-testid="employee-details-edit-button">
          Edit
        </Link>
      </div>
    </section>
  );
}

export default EmployeeDetailsPage;
