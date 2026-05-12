import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar" data-testid="app-navbar">
      <div className="navbar-inner">
        <Link to="/employees" className="brand" data-testid="navbar-brand-link">
          Purple Cross
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <NavLink
            to="/employees"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            data-testid="navbar-employees-link"
          >
            Employees
          </NavLink>
          <NavLink
            to="/employees/new"
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
