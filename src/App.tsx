import "./App.css";
import AppRouter from "./route/AppRoutes";
import { AuthProvider } from "./context/auth/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </>
  );
}

export default App;
