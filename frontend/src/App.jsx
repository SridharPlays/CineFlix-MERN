import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// Importing Authentication Files
import SignUpPage from "./pages/Authentication/SignUpPage";
import LoginPage from "./pages/Authentication/LoginPage";
import DashboardPage from "./pages/Authentication/DashboardPage";
import ForgotPasswordPage from "./pages/Authentication/ForgotPasswordPage";
import EmailVerification from "./pages/Authentication/EmailVerificationPage";
import ResetPasswordPage from "./pages/Authentication/ResetPasswordPage";
import EditProfilePage from "./pages/Authentication/EditProfilePage";
import DeleteAccountPage from "./pages/Authentication/DeleteAccountPage";
import LoadingSpinner from "./components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

// Importing the Main UI
import Navbar from "./components/Navbar";
import IndexPage from "./pages/Movies/IndexPage";
import MovieLibrary from "./pages/Movies/MovieLibrary";
import MovieInfo from "./pages/Movies/MovieInfo";
import ContactPage from "./pages/Movies/ContactPage";

//protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

// Redirect Authenticated user to homepage
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  // Apply different classes or styles based on routes
  const location = useLocation();
  const isAuthRoute = ["/login", "/signup", "/forgot-password", "/reset-password/:token", "/edit-profile","/verify-email"]
    .some(path => location.pathname.startsWith(path)); 

  return (
    <>
      <Navbar />
      {/* Conditional Styling for Routes */}
      <div
        className={`min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-800 to-gray-900 ${
          isAuthRoute
            ? "flex items-center justify-center" // Auth Routes
            : ""
        }`}
      >
        <Routes>
          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <EditProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/delete-account"
            element={
              <ProtectedRoute>
                <DeleteAccountPage />
              </ProtectedRoute>
            }
          />

          {/* Main UI Routes */}
          <Route path="/" element={<IndexPage />} />
          <Route path="/movie-library" element={<MovieLibrary />} />
          <Route path="/movie-info/:id" element={<MovieInfo />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Authentication Routes */}
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUpPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <LoginPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <ResetPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
