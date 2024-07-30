import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import Dashboard from "./pages/dashboard";
import AuthValidation from "./authValidation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />

        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/dashboard"
          element={
            <AuthValidation>
              <Dashboard />
            </AuthValidation>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
