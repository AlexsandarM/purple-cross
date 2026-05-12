import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/common/ConfirmDialog";
import ToastMessage from "../components/common/ToastMessage";
import EmployeeFilters from "../components/employees/EmployeeFilters";
import EmployeeTable from "../components/employees/EmployeeTable";
import PageHeader from "../components/common/PageHeader";
import { useEmployees } from "../hooks/useEmployees";
import { APP_PATHS } from "../routes/paths";

function EmployeesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { employees, deleteEmployee, resetEmployees } = useEmployees();
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [occupationFilter, setOccupationFilter] = useState("");
  const [employeePendingDeleteCode, setEmployeePendingDeleteCode] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const locationToast = location.state?.toast;
    if (!locationToast?.message) {
      return;
    }

    setToast(locationToast);
    navigate(location.pathname, { replace: true, state: {} });
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setToast(null);
    }, 3500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [toast]);

  const handleDeleteEmployee = (code) => {
    setEmployeePendingDeleteCode(code);
  };

  const handleCancelDelete = () => {
    setEmployeePendingDeleteCode("");
  };

  const handleConfirmDelete = () => {
    if (!employeePendingDeleteCode) {
      return;
    }

    const deleted = deleteEmployee(employeePendingDeleteCode);
    if (deleted) {
      setToast({ message: "Employee deleted successfully.", variant: "success" });
    } else {
      setToast({
        message: "Unable to delete employee. Please try again.",
        variant: "error",
      });
    }
    setEmployeePendingDeleteCode("");
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setDepartmentFilter("");
    setOccupationFilter("");
  };

  const departmentOptions = useMemo(
    () =>
      [...new Set(employees.map((employee) => employee.department))]
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b)),
    [employees]
  );

  const occupationOptions = useMemo(
    () =>
      [...new Set(employees.map((employee) => employee.occupation))]
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b)),
    [employees]
  );

  const filteredEmployees = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    return employees.filter((employee) => {
      const matchesDepartment = !departmentFilter || employee.department === departmentFilter;
      const matchesOccupation = !occupationFilter || employee.occupation === occupationFilter;

      if (!matchesDepartment || !matchesOccupation) {
        return false;
      }

      if (!normalizedSearchTerm) {
        return true;
      }

      const searchable = [
        employee.code,
        employee.fullName,
        employee.department,
        employee.occupation,
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(normalizedSearchTerm);
    });
  }, [departmentFilter, employees, occupationFilter, searchTerm]);

  const pendingDeleteEmployee = useMemo(
    () =>
      employees.find((employee) => employee.code === employeePendingDeleteCode) ?? null,
    [employees, employeePendingDeleteCode]
  );

  return (
    <section className="page">
      <PageHeader
        title="Employee Management"
        subtitle="Centralized employee directory and actions."
        actions={
          <div className="page-actions">
            <button
              type="button"
              className="button button-secondary"
              onClick={() => {
                resetEmployees();
                handleClearFilters();
                setToast({
                  message: "Employee data reset to initial dataset.",
                  variant: "info",
                });
              }}
              data-testid="employees-reset-button"
            >
              Reset Data
            </button>
            <Link className="button button-primary" to={APP_PATHS.createEmployee} data-testid="employees-create-button">
              Create Employee
            </Link>
          </div>
        }
      />
      <EmployeeFilters
        searchTerm={searchTerm}
        departmentFilter={departmentFilter}
        occupationFilter={occupationFilter}
        departmentOptions={departmentOptions}
        occupationOptions={occupationOptions}
        onSearchTermChange={setSearchTerm}
        onDepartmentFilterChange={setDepartmentFilter}
        onOccupationFilterChange={setOccupationFilter}
        onClearFilters={handleClearFilters}
      />
      <EmployeeTable
        employees={filteredEmployees}
        onDelete={handleDeleteEmployee}
        emptyStateMessage="No employees match the selected filters."
      />
      <ConfirmDialog
        open={Boolean(employeePendingDeleteCode)}
        title="Delete employee?"
        message={
          pendingDeleteEmployee
            ? `Are you sure you want to delete ${pendingDeleteEmployee.fullName}?`
            : "Are you sure you want to delete this employee?"
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <ToastMessage toast={toast} onClose={() => setToast(null)} />
    </section>
  );
}

export default EmployeesPage;
