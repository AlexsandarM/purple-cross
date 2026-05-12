import { generatePath, Link, useParams } from "react-router-dom";
import EmployeeDetailsCard from "../components/employees/EmployeeDetailsCard";
import PageHeader from "../components/common/PageHeader";
import { useEmployees } from "../hooks/useEmployees";
import { APP_PATHS } from "../routes/paths";

function EmployeeDetailsPage() {
  const { code } = useParams();
  const { getEmployeeByCode } = useEmployees();
  const employee = code ? getEmployeeByCode(code) : null;
  const editPath = employee
    ? generatePath(APP_PATHS.editEmployee, { code: employee.code })
    : APP_PATHS.employees;

  if (!employee) {
    return (
      <section className="page">
        <PageHeader
          title="Employee Details"
          subtitle="The requested employee profile could not be found."
        />
        <div className="card" data-testid="employee-details-not-found">
          Employee not found.
        </div>
        <div className="row-actions">
          <Link
            to={APP_PATHS.employees}
            className="button button-secondary"
            data-testid="employee-details-not-found-back-button"
          >
            Back to Employees
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <PageHeader
        title={`Employee Details: ${employee.fullName}`}
        subtitle="Profile details and current status overview."
      />
      <EmployeeDetailsCard employee={employee} />
      <div className="row-actions">
        <Link
          to={APP_PATHS.employees}
          className="button button-secondary"
          data-testid="employee-details-back-button"
        >
          Back
        </Link>
        <Link
          to={editPath}
          className="button button-primary"
          data-testid="employee-details-edit-button"
        >
          Edit
        </Link>
      </div>
    </section>
  );
}

export default EmployeeDetailsPage;
