import {
  createElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import initialEmployees from "../data/employees.json";
import {
  clearEmployeesStorage,
  readEmployeesFromStorage,
  writeEmployeesToStorage,
} from "../utils/employeeStorage";

function cloneEmployees(employees) {
  return employees.map((employee) => ({ ...employee }));
}

function getInitialEmployees() {
  const storedEmployees = readEmployeesFromStorage();
  if (storedEmployees) {
    return storedEmployees;
  }

  return cloneEmployees(initialEmployees);
}

function useEmployeesState() {
  const [employees, setEmployees] = useState(getInitialEmployees);

  useEffect(() => {
    writeEmployeesToStorage(employees);
  }, [employees]);

  const getEmployeeByCode = useCallback(
    (code) => employees.find((employee) => employee.code === code) ?? null,
    [employees]
  );

  const createEmployee = useCallback((newEmployee) => {
    let created = false;
    setEmployees((currentEmployees) => {
      const alreadyExists = currentEmployees.some(
        (employee) => employee.code === newEmployee.code
      );

      if (alreadyExists) {
        return currentEmployees;
      }

      created = true;
      return [newEmployee, ...currentEmployees];
    });

    return created;
  }, []);

  const updateEmployee = useCallback((code, updatedEmployee) => {
    let updated = false;
    setEmployees((currentEmployees) =>
      currentEmployees.map((employee) => {
        if (employee.code !== code) {
          return employee;
        }

        updated = true;
        return { ...employee, ...updatedEmployee };
      })
    );

    return updated;
  }, []);

  const deleteEmployee = useCallback((code) => {
    let deleted = false;
    setEmployees((currentEmployees) => {
      const nextEmployees = currentEmployees.filter((employee) => {
        const shouldDelete = employee.code === code;
        if (shouldDelete) {
          deleted = true;
        }

        return !shouldDelete;
      });

      return nextEmployees;
    });

    return deleted;
  }, []);

  const resetEmployees = useCallback(() => {
    clearEmployeesStorage();
    setEmployees(cloneEmployees(initialEmployees));
  }, []);

  return useMemo(
    () => ({
      employees,
      getEmployeeByCode,
      createEmployee,
      updateEmployee,
      deleteEmployee,
      resetEmployees,
    }),
    [
      employees,
      getEmployeeByCode,
      createEmployee,
      updateEmployee,
      deleteEmployee,
      resetEmployees,
    ]
  );
}

const EmployeesContext = createContext(null);

export function EmployeesProvider({ children }) {
  const value = useEmployeesState();
  return createElement(EmployeesContext.Provider, { value }, children);
}

export function useEmployees() {
  const context = useContext(EmployeesContext);
  if (!context) {
    throw new Error("useEmployees must be used within an EmployeesProvider.");
  }

  return context;
}
