import { generatePath, Link } from "react-router-dom";
import { APP_PATHS } from "../../routes/paths";

function EmployeeTableActions({ employeeCode, onDelete }) {
  const detailsPath = generatePath(APP_PATHS.employeeDetails, { code: employeeCode });
  const editPath = generatePath(APP_PATHS.editEmployee, { code: employeeCode });

  return (
    <div className="table-actions" data-testid={`employee-row-actions-${employeeCode}`}>
      <Link
        to={detailsPath}
        className="button button-secondary button-small"
        data-testid={`employee-row-view-${employeeCode}`}
      >
        View
      </Link>
      <Link
        to={editPath}
        className="button button-secondary button-small"
        data-testid={`employee-row-edit-${employeeCode}`}
      >
        Edit
      </Link>
      <button
        type="button"
        className="button button-danger button-small"
        onClick={() => onDelete(employeeCode)}
        data-testid={`employee-row-delete-${employeeCode}`}
      >
        Delete
      </button>
    </div>
  );
}

export default EmployeeTableActions;
