import { EmployeesProvider } from "./hooks/useEmployees";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <EmployeesProvider>
      <AppRoutes />
    </EmployeesProvider>
  );
}

export default App;
