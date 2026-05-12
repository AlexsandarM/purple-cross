import { Link } from "react-router-dom";
import { APP_PATHS } from "../routes/paths";

function NotFoundPage() {
  return (
    <section className="page" data-testid="not-found-page">
      <h1>Page not found</h1>
      <p>The route you requested does not exist.</p>
      <Link to={APP_PATHS.employees} className="button button-primary" data-testid="not-found-back-to-employees">
        Go to Employees
      </Link>
    </section>
  );
}

export default NotFoundPage;
