import { toDateOrNull } from "./dateUtils";

export function normalizeEmployeeInput(values) {
  return {
    code: values.code.trim(),
    fullName: values.fullName.trim(),
    occupation: values.occupation.trim(),
    department: values.department.trim(),
    dateOfEmployment: values.dateOfEmployment || "",
    terminationDate: values.terminationDate || null,
  };
}

export function validateEmployee(values, existingEmployees) {
  const errors = {};
  const normalized = normalizeEmployeeInput(values);

  if (!normalized.code) {
    errors.code = "Code is required.";
  } else {
    const duplicateCode = existingEmployees.some(
      (employee) => employee.code.toLowerCase() === normalized.code.toLowerCase()
    );

    if (duplicateCode) {
      errors.code = "Code must be unique.";
    }
  }

  if (!normalized.fullName) {
    errors.fullName = "Full name is required.";
  } else if (normalized.fullName.length < 2) {
    errors.fullName = "Full name must be at least 2 characters.";
  }

  if (!normalized.occupation) {
    errors.occupation = "Occupation is required.";
  }

  if (!normalized.department) {
    errors.department = "Department is required.";
  }

  const employmentDate = toDateOrNull(normalized.dateOfEmployment);
  if (normalized.dateOfEmployment && !employmentDate) {
    errors.dateOfEmployment = "Date of employment must be a valid date.";
  }

  const terminationDate = toDateOrNull(normalized.terminationDate);
  if (normalized.terminationDate && !terminationDate) {
    errors.terminationDate = "Termination date must be a valid date.";
  }

  if (employmentDate && terminationDate && terminationDate < employmentDate) {
    errors.terminationDate =
      "Termination date cannot be earlier than date of employment.";
  }

  return { errors, normalized };
}
