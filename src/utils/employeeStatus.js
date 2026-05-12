import { startOfDay, toDateOrNull } from "./dateUtils";

export function getEmploymentStatus(dateOfEmployment) {
  const employmentDate = toDateOrNull(dateOfEmployment);
  if (!employmentDate) {
    return "Unknown";
  }

  const today = startOfDay(new Date());
  if (employmentDate > today) {
    return "Employed soon";
  }

  return "Currently employed";
}

export function getTerminationStatus(terminationDate) {
  const parsedTerminationDate = toDateOrNull(terminationDate);
  if (!parsedTerminationDate) {
    return "Active";
  }

  const today = startOfDay(new Date());
  if (parsedTerminationDate > today) {
    return "To be terminated";
  }

  return "Terminated";
}

export function getStatusVariant(status) {
  switch (status) {
    case "Currently employed":
    case "Active":
      return "positive";
    case "Employed soon":
    case "To be terminated":
      return "warning";
    case "Terminated":
      return "negative";
    default:
      return "neutral";
  }
}
