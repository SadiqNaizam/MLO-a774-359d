import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import newly created pages
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage";
import TwoFactorAuthPage from "./pages/TwoFactorAuthPage";
import DashboardPage from "./pages/DashboardPage";

import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

// A simple mock auth check. In a real app, this would involve context or a store.
// For this example, we'll assume not authenticated by default to show login page.
const isAuthenticated = () => {
  // Replace with actual auth check logic (e.g., check for a token in localStorage)
  // For now, let's assume the user is not authenticated initially to land on login.
  // If you want to test dashboard directly, set this to true.
  // To simulate post-login, this state would change.
  return localStorage.getItem("isSimulatedAuth") === "true"; 
};

// ProtectedRoute component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    // User not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }
  return children;
};


// Simulate login by setting a flag (call this from LoginPage on successful login)
// export const simulateLogin = () => localStorage.setItem("isSimulatedAuth", "true");
// Simulate logout (call this from DashboardPage logout button)
// export const simulateLogout = () => localStorage.removeItem("isSimulatedAuth");
// For the purpose of this generator, these functions would typically live elsewhere.
// I'll keep the LoginPage logic to navigate to Dashboard, but won't implement full auth state management here.

const App = () => {
  console.log('App loaded. Current auth status (simulated):', isAuthenticated());
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
            <Route path="/two-factor-auth" element={<TwoFactorAuthPage />} />

            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
             {/* More protected routes can be added here like /dashboard/analytics etc. */}
            <Route 
              path="/dashboard/analytics" 
              element={
                <ProtectedRoute>
                  {/* Placeholder for Analytics page content, or redirect to DashboardPage if not distinct */}
                  <DashboardPage /> 
                </ProtectedRoute>
              } 
            />
             <Route 
              path="/dashboard/users" 
              element={
                <ProtectedRoute>
                   {/* Placeholder for Users page content */}
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
             <Route 
              path="/dashboard/settings" 
              element={
                <ProtectedRoute>
                   {/* Placeholder for Settings page content */}
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />


            {/* Index route: Redirect to dashboard if authenticated, else to login */}
            <Route 
              path="/" 
              element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
            />
            
            {/* Catch-all Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;