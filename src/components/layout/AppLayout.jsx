import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AppLayout() {
  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link" data-testid="skip-to-content-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="app-content" tabIndex="-1">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
