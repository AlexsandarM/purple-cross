import { generatePath, Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import EmployeeForm from "../components/employees/EmployeeForm";
import PageHeader from "../components/common/PageHeader";
import { useEmployees } from "../hooks/useEmployees";
import { APP_PATHS } from "../routes/paths";
import { validateEmployee } from "../utils/employeeValidation";

function EmployeeEditPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { employees, getEmployeeByCode, updateEmployee } = useEmployees();
  const [submitError, setSubmitError] = useState("");
  const employee = code ? getEmployeeByCode(code) : null;

  if (!employee) {
    return (
      <section className="page">
        <PageHeader
          title="Edit Employee"
          subtitle="The employee record you are trying to edit was not found."
        />
        <div className="card" data-testid="edit-employee-not-found">
          Employee not found.
        </div>
        <div className="row-actions">
          <Link
            to={APP_PATHS.employees}
            className="button button-secondary"
            data-testid="edit-employee-not-found-back-button"
          >
            Back to Employees
          </Link>
        </div>
      </section>
    );
  }

  const detailsPath = generatePath(APP_PATHS.employeeDetails, { code: employee.code });

  const handleCancel = () => {
    navigate(detailsPath);
  };

  const handleUpdateEmployee = (formValues) => {
    const { errors, normalized } = validateEmployee(formValues, employees, {
      currentCode: employee.code,
    });

    if (Object.keys(errors).length > 0) {
      setSubmitError("");
      return { errors };
    }

    const updated = updateEmployee(employee.code, normalized);
    if (!updated) {
      setSubmitError("Unable to save changes. Please try again.");
      return {
        errors: { code: "Unable to update employee. Please try again." },
      };
    }

    setSubmitError("");
    navigate(detailsPath);
    return {};
  };

  return (
    <section className="page">
      <PageHeader
        title={`Edit Employee: ${employee.fullName}`}
        subtitle="Update employee profile fields and save your changes."
      />
      <EmployeeForm
        initialValues={employee}
        onSubmit={handleUpdateEmployee}
        onCancel={handleCancel}
        submitLabel="Save Changes"
        submitTestId="edit-employee-save-button"
        disableCodeField
        codeReadOnlyMessage="Code is locked to prevent identity conflicts."
        formError={submitError}
      />
    </section>
  );
}

export default EmployeeEditPage;
