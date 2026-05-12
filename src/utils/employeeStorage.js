const EMPLOYEE_STORAGE_KEY = "purple-cross:employees";

function isEmployeeCollection(value) {
  return Array.isArray(value);
}

export function readEmployeesFromStorage() {
  try {
    const rawValue = window.localStorage.getItem(EMPLOYEE_STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue);
    if (!isEmployeeCollection(parsed)) {
      return null;
    }

    return parsed;
  } catch (error) {
    console.warn("Unable to read employees from localStorage.", error);
    return null;
  }
}

export function writeEmployeesToStorage(employees) {
  if (!isEmployeeCollection(employees)) {
    return;
  }

  try {
    window.localStorage.setItem(EMPLOYEE_STORAGE_KEY, JSON.stringify(employees));
  } catch (error) {
    console.warn("Unable to persist employees to localStorage.", error);
  }
}

export function clearEmployeesStorage() {
  try {
    window.localStorage.removeItem(EMPLOYEE_STORAGE_KEY);
  } catch (error) {
    console.warn("Unable to clear employees from localStorage.", error);
  }
}
