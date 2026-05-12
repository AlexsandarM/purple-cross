import { Link, NavLink } from "react-router-dom";
import { APP_PATHS } from "../../routes/paths";

function Navbar() {
  return (
    <header className="navbar" data-testid="app-navbar">
      <div className="navbar-inner">
        <Link to={APP_PATHS.employees} className="brand" data-testid="navbar-brand-link">
          Purple Cross
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <NavLink
            to={APP_PATHS.employees}
            end
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            data-testid="navbar-employees-link"
          >
            Employees
          </NavLink>
          <NavLink
            to={APP_PATHS.createEmployee}
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            data-testid="navbar-create-employee-link"
          >
            Create Employee
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
