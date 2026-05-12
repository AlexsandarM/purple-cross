import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EmployeeFilters from "../components/employees/EmployeeFilters";
import EmployeeTable from "../components/employees/EmployeeTable";
import PageHeader from "../components/common/PageHeader";
import { useEmployees } from "../hooks/useEmployees";
import { APP_PATHS } from "../routes/paths";

function EmployeesPage() {
  const { employees, deleteEmployee, resetEmployees } = useEmployees();
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [occupationFilter, setOccupationFilter] = useState("");

  const handleDeleteEmployee = (code) => {
    deleteEmployee(code);
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
    </section>
  );
}

export default EmployeesPage;
