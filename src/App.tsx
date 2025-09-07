import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useAppDispatch, useAppSelector } from "./store/store";
import CustomerRoutes from "./routes/CustomerRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EmailVerification from "./components/auth/EmailVerifications";
import EmailVerificationSent from "./pages/EmailVerificationSent";
import ProtectedRoute from "./components/auth/ProtectedRoutes";
import { validateToken } from "./store/slices/authSlice";
import { useEffect } from "react";

const queryClient = new QueryClient();

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, validateTokenLoading } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Only validate if we have a token AND we're not already authenticated
    // This prevents unnecessary API calls on every reload
    if (token && !isAuthenticated) {
      dispatch(validateToken());
    }
  }, [dispatch, isAuthenticated]);

  // Show loading spinner during validation
  if (validateTokenLoading) {
    return <div>Loading...</div>; // Or your loading component
  }
  return (
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/verify-email" element={<EmailVerification />} />
              <Route
                path="/email-verification-sent"
                element={<EmailVerificationSent />}
              />

              {/* Admin Routes */}
              <Route element={<ProtectedRoute requiredRole="admin" />}>
                <Route path="/admin/*" element={<AdminRoutes />} />
              </Route>

              {/* Customer Routes - should be last to act as fallback */}
              <Route path="/*" element={<CustomerRoutes />} />
            </Routes>
          </Router>
          <Toaster
            position="top-right"
            expand={false}
            richColors
            closeButton
            duration={4000}
          />
        </QueryClientProvider>
  );
}

export default App;
