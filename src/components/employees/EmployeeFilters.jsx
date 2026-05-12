function EmployeeFilters({
  searchTerm,
  departmentFilter,
  occupationFilter,
  departmentOptions,
  occupationOptions,
  onSearchTermChange,
  onDepartmentFilterChange,
  onOccupationFilterChange,
  onClearFilters,
}) {
  return (
    <div className="card" data-testid="employee-filters-card">
      <div className="employee-filters-grid">
        <label className="field" htmlFor="employee-search-input">
          <span>Search</span>
          <input
            id="employee-search-input"
            className="input"
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchTermChange(event.target.value)}
            placeholder="Search by name, code, department, occupation"
            data-testid="employee-search-input"
          />
        </label>

        <label className="field" htmlFor="employee-department-filter">
          <span>Department</span>
          <select
            id="employee-department-filter"
            className="input"
            value={departmentFilter}
            onChange={(event) => onDepartmentFilterChange(event.target.value)}
            data-testid="employee-department-filter"
          >
            <option value="">All departments</option>
            {departmentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="field" htmlFor="employee-occupation-filter">
          <span>Occupation</span>
          <select
            id="employee-occupation-filter"
            className="input"
            value={occupationFilter}
            onChange={(event) => onOccupationFilterChange(event.target.value)}
            data-testid="employee-occupation-filter"
          >
            <option value="">All occupations</option>
            {occupationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="employee-filters-footer">
        <button
          type="button"
          className="button button-secondary button-small"
          onClick={onClearFilters}
          data-testid="employee-clear-filters-button"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default EmployeeFilters;
