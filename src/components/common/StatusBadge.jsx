import { getStatusVariant } from "../../utils/employeeStatus";

function StatusBadge({ status, testId }) {
  const variant = getStatusVariant(status);

  return (
    <span className={`status-badge status-${variant}`} data-testid={testId}>
      {status}
    </span>
  );
}

export default StatusBadge;
