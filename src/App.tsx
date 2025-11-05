import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { AppLayout } from "@/components/layout/app-layout";
import { useAuthStore } from "@/store/auth";

import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import Schools from "./pages/Schools";
import SchoolDetail from "./pages/SchoolDetail";
import Students from "./pages/Students";
import Vendors from "./pages/Vendors";
import POSDevices from "./pages/POSDevices";
import Wristbands from "./pages/Wristbands";
import Parents from "./pages/Parents";
import Analytics from "./pages/Analytics";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import Settings from "./pages/Settings";
import TermsConditions from "./pages/TermsConditions";
import AssignStudents from "./pages/AssignStudents";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const { isAuthenticated, firstTimeLogin } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="school-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Protected Routes */}
              <Route path="/" element={
                isAuthenticated ? (
                  firstTimeLogin ? (
                    <Navigate to="/change-password" replace />
                  ) : (
                    <Navigate to="/dashboard" replace />
                  )
                ) : (
                  <Navigate to="/login" replace />
                )
              } />
              
              <Route path="/*" element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="schools" element={<Schools />} />
                <Route path="schools/:id" element={<SchoolDetail />} />
                <Route path="students/*" element={<Students />} />
                <Route path="vendors" element={<Vendors />} />
                <Route path="pos-devices/*" element={<POSDevices />} />
                <Route path="wristbands/*" element={<Wristbands />} />
                <Route path="parents" element={<Parents />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="users" element={<Users />} />
                <Route path="roles" element={<Roles />} />
                <Route path="settings" element={<Settings />} />
                <Route path="terms" element={<TermsConditions />} />
                <Route path="assign-students" element={<AssignStudents />} />
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
