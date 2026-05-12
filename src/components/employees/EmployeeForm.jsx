import { useState } from "react";

const EMPTY_VALUES = {
  code: "",
  fullName: "",
  occupation: "",
  department: "",
  dateOfEmployment: "",
  terminationDate: "",
};

function EmployeeForm({
  initialValues = EMPTY_VALUES,
  onSubmit,
  onCancel,
  submitLabel = "Save",
  formError = "",
  submitTestId = "employee-form-submit-button",
}) {
  const [values, setValues] = useState({
    ...EMPTY_VALUES,
    ...initialValues,
    terminationDate: initialValues.terminationDate ?? "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    const nextValue = event.target.value;
    setValues((current) => ({ ...current, [field]: nextValue }));
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const copy = { ...current };
      delete copy[field];
      return copy;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = onSubmit(values);
    if (result?.errors) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
  };

  return (
    <form className="card employee-form" onSubmit={handleSubmit} data-testid="employee-form">
      <div className="employee-form-grid">
        <label className="field" htmlFor="employee-code-input">
          <span>Code *</span>
          <input
            id="employee-code-input"
            className="input"
            type="text"
            value={values.code}
            onChange={handleChange("code")}
            data-testid="employee-code-input"
          />
          {errors.code ? (
            <small className="field-error" data-testid="employee-code-error">
              {errors.code}
            </small>
          ) : null}
        </label>

        <label className="field" htmlFor="employee-full-name-input">
          <span>Full Name *</span>
          <input
            id="employee-full-name-input"
            className="input"
            type="text"
            value={values.fullName}
            onChange={handleChange("fullName")}
            data-testid="employee-full-name-input"
          />
          {errors.fullName ? (
            <small className="field-error" data-testid="employee-full-name-error">
              {errors.fullName}
            </small>
          ) : null}
        </label>

        <label className="field" htmlFor="employee-occupation-input">
          <span>Occupation *</span>
          <input
            id="employee-occupation-input"
            className="input"
            type="text"
            value={values.occupation}
            onChange={handleChange("occupation")}
            data-testid="employee-occupation-input"
          />
          {errors.occupation ? (
            <small className="field-error" data-testid="employee-occupation-error">
              {errors.occupation}
            </small>
          ) : null}
        </label>

        <label className="field" htmlFor="employee-department-input">
          <span>Department *</span>
          <input
            id="employee-department-input"
            className="input"
            type="text"
            value={values.department}
            onChange={handleChange("department")}
            data-testid="employee-department-input"
          />
          {errors.department ? (
            <small className="field-error" data-testid="employee-department-error">
              {errors.department}
            </small>
          ) : null}
        </label>

        <label className="field" htmlFor="employee-employment-date-input">
          <span>Date of Employment</span>
          <input
            id="employee-employment-date-input"
            className="input"
            type="date"
            value={values.dateOfEmployment}
            onChange={handleChange("dateOfEmployment")}
            data-testid="employee-date-of-employment-input"
          />
          {errors.dateOfEmployment ? (
            <small
              className="field-error"
              data-testid="employee-date-of-employment-error"
            >
              {errors.dateOfEmployment}
            </small>
          ) : null}
        </label>

        <label className="field" htmlFor="employee-termination-date-input">
          <span>Termination Date</span>
          <input
            id="employee-termination-date-input"
            className="input"
            type="date"
            value={values.terminationDate}
            onChange={handleChange("terminationDate")}
            data-testid="employee-termination-date-input"
          />
          {errors.terminationDate ? (
            <small className="field-error" data-testid="employee-termination-date-error">
              {errors.terminationDate}
            </small>
          ) : null}
        </label>
      </div>

      {formError ? (
        <p className="form-error-banner" data-testid="employee-form-error-banner">
          {formError}
        </p>
      ) : null}

      <div className="row-actions">
        <button
          type="button"
          className="button button-secondary"
          onClick={onCancel}
          data-testid="employee-form-cancel-button"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="button button-primary"
          data-testid={submitTestId}
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;
