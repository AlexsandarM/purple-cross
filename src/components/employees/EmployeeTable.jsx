import { useMemo, useState } from "react";
import StatusBadge from "../common/StatusBadge";
import EmployeeTableActions from "./EmployeeTableActions";
import { formatDate, compareDateValues } from "../../utils/dateUtils";
import {
  getEmploymentStatus,
  getTerminationStatus,
} from "../../utils/employeeStatus";

const PAGE_SIZE = 10;

const DEFAULT_SORT = {
  column: "fullName",
  direction: "asc",
};

function compareByColumn(a, b, column) {
  if (column === "dateOfEmployment" || column === "terminationDate") {
    return compareDateValues(a[column], b[column]);
  }

  const left = (a[column] ?? "").toString().toLowerCase();
  const right = (b[column] ?? "").toString().toLowerCase();

  if (left < right) {
    return -1;
  }

  if (left > right) {
    return 1;
  }

  return 0;
}

function getNextSortState(current, column) {
  if (current.column !== column) {
    return { column, direction: "asc" };
  }

  return {
    column,
    direction: current.direction === "asc" ? "desc" : "asc",
  };
}

function EmployeeTable({ employees, onDelete, emptyStateMessage = "No employees available." }) {
  const [sortState, setSortState] = useState(DEFAULT_SORT);
  const [currentPage, setCurrentPage] = useState(1);

  const sortedEmployees = useMemo(() => {
    const sorted = [...employees];
    sorted.sort((a, b) => compareByColumn(a, b, sortState.column));

    if (sortState.direction === "desc") {
      sorted.reverse();
    }

    return sorted;
  }, [employees, sortState]);

  const totalPages = Math.max(1, Math.ceil(sortedEmployees.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pagedEmployees = sortedEmployees.slice(pageStart, pageStart + PAGE_SIZE);

  const handleSort = (column) => {
    setSortState((current) => getNextSortState(current, column));
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(1, page - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  };

  if (!employees.length) {
    return (
      <div className="card" data-testid="employees-empty-state">
        {emptyStateMessage}
      </div>
    );
  }

  return (
    <div className="card" data-testid="employees-table-card">
      <div className="table-scroll">
        <table className="employee-table" data-testid="employee-table">
          <thead>
            <tr>
              <th>
                <button
                  type="button"
                  className="sort-button"
                  onClick={() => handleSort("fullName")}
                  data-testid="employee-sort-full-name"
                >
                  Full Name
                </button>
              </th>
              <th>
                <button
                  type="button"
                  className="sort-button"
                  onClick={() => handleSort("occupation")}
                  data-testid="employee-sort-occupation"
                >
                  Occupation
                </button>
              </th>
              <th>
                <button
                  type="button"
                  className="sort-button"
                  onClick={() => handleSort("department")}
                  data-testid="employee-sort-department"
                >
                  Department
                </button>
              </th>
              <th>
                <button
                  type="button"
                  className="sort-button"
                  onClick={() => handleSort("dateOfEmployment")}
                  data-testid="employee-sort-date-of-employment"
                >
                  Date of Employment
                </button>
              </th>
              <th>Employment Status</th>
              <th>
                <button
                  type="button"
                  className="sort-button"
                  onClick={() => handleSort("terminationDate")}
                  data-testid="employee-sort-termination-date"
                >
                  Termination Date
                </button>
              </th>
              <th>Termination Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pagedEmployees.map((employee) => {
              const employmentStatus = getEmploymentStatus(employee.dateOfEmployment);
              const terminationStatus = getTerminationStatus(employee.terminationDate);

              return (
                <tr key={employee.code} data-testid={`employee-table-row-${employee.code}`}>
                  <td data-testid={`employee-row-full-name-${employee.code}`}>
                    {employee.fullName}
                  </td>
                  <td data-testid={`employee-row-occupation-${employee.code}`}>
                    {employee.occupation}
                  </td>
                  <td data-testid={`employee-row-department-${employee.code}`}>
                    {employee.department}
                  </td>
                  <td data-testid={`employee-row-date-of-employment-${employee.code}`}>
                    {formatDate(employee.dateOfEmployment)}
                  </td>
                  <td>
                    <StatusBadge
                      status={employmentStatus}
                      testId={`employee-row-employment-status-${employee.code}`}
                    />
                  </td>
                  <td data-testid={`employee-row-termination-date-${employee.code}`}>
                    {formatDate(employee.terminationDate)}
                  </td>
                  <td>
                    <StatusBadge
                      status={terminationStatus}
                      testId={`employee-row-termination-status-${employee.code}`}
                    />
                  </td>
                  <td>
                    <EmployeeTableActions
                      employeeCode={employee.code}
                      onDelete={onDelete}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="table-footer" data-testid="employee-table-pagination">
        <p>
          Showing {pagedEmployees.length} of {employees.length} employees.
        </p>
        <div className="row-actions">
          <button
            type="button"
            className="button button-secondary button-small"
            onClick={goToPreviousPage}
            disabled={safePage === 1}
            data-testid="employee-pagination-previous"
          >
            Previous
          </button>
          <span data-testid="employee-pagination-page-indicator">
            Page {safePage} of {totalPages}
          </span>
          <button
            type="button"
            className="button button-secondary button-small"
            onClick={goToNextPage}
            disabled={safePage === totalPages}
            data-testid="employee-pagination-next"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeTable;
