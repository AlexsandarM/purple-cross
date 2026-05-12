import StatusBadge from "../common/StatusBadge";
import { formatDate } from "../../utils/dateUtils";
import {
  getEmploymentStatus,
  getTerminationStatus,
} from "../../utils/employeeStatus";

function EmployeeDetailsCard({ employee }) {
  const employmentStatus = getEmploymentStatus(employee.dateOfEmployment);
  const terminationStatus = getTerminationStatus(employee.terminationDate);

  return (
    <article className="card employee-details-card" data-testid="employee-details-card">
      <div className="employee-details-grid">
        <div className="employee-details-item">
          <p className="employee-details-label">Code</p>
          <p data-testid="employee-details-code">{employee.code}</p>
        </div>
        <div className="employee-details-item">
          <p className="employee-details-label">Full Name</p>
          <p data-testid="employee-details-full-name">{employee.fullName}</p>
        </div>
        <div className="employee-details-item">
          <p className="employee-details-label">Occupation</p>
          <p data-testid="employee-details-occupation">{employee.occupation}</p>
        </div>
        <div className="employee-details-item">
          <p className="employee-details-label">Department</p>
          <p data-testid="employee-details-department">{employee.department}</p>
        </div>
        <div className="employee-details-item">
          <p className="employee-details-label">Date of Employment</p>
          <p data-testid="employee-details-date-of-employment">
            {formatDate(employee.dateOfEmployment)}
          </p>
        </div>
        <div className="employee-details-item">
          <p className="employee-details-label">Employment Status</p>
          <StatusBadge
            status={employmentStatus}
            testId="employee-details-employment-status"
          />
        </div>
        <div className="employee-details-item">
          <p className="employee-details-label">Termination Date</p>
          <p data-testid="employee-details-termination-date">
            {formatDate(employee.terminationDate)}
          </p>
        </div>
        <div className="employee-details-item">
          <p className="employee-details-label">Termination Status</p>
          <StatusBadge
            status={terminationStatus}
            testId="employee-details-termination-status"
          />
        </div>
      </div>
    </article>
  );
}

export default EmployeeDetailsCard;
