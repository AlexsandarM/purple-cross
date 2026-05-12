import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../components/employees/EmployeeForm";
import PageHeader from "../components/common/PageHeader";
import { useEmployees } from "../hooks/useEmployees";
import { APP_PATHS } from "../routes/paths";
import { validateEmployee } from "../utils/employeeValidation";

function EmployeeCreatePage() {
  const navigate = useNavigate();
  const { employees, createEmployee } = useEmployees();
  const [submitError, setSubmitError] = useState("");

  const handleCancel = () => {
    navigate(APP_PATHS.employees);
  };

  const handleCreateEmployee = (formValues) => {
    const { errors, normalized } = validateEmployee(formValues, employees);
    if (Object.keys(errors).length > 0) {
      return { errors };
    }

    const created = createEmployee(normalized);
    if (!created) {
      setSubmitError("Employee code already exists.");
      return { errors: { code: "Code must be unique." } };
    }

    setSubmitError("");
    navigate(APP_PATHS.employees, {
      state: {
        toast: {
          message: `${normalized.fullName} was created successfully.`,
          variant: "success",
        },
      },
    });
    return {};
  };

  return (
    <section className="page">
      <PageHeader
        title="Create Employee"
        subtitle="Add a new employee profile to the directory."
      />
      <EmployeeForm
        onSubmit={handleCreateEmployee}
        onCancel={handleCancel}
        submitLabel="Save Employee"
        submitTestId="create-employee-save-button"
        formError={submitError}
      />
    </section>
  );
}

export default EmployeeCreatePage;
