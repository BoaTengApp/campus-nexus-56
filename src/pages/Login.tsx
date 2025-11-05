import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuthStore } from "@/store/auth";

const Login = () => {
  const { isAuthenticated, firstTimeLogin } = useAuthStore();

  // Redirect if already authenticated
  if (isAuthenticated) {
    if (firstTimeLogin) {
      return <Navigate to="/change-password" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)]" />
      </div>
      
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Branding Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center lg:text-left space-y-8"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
                    <GraduationCap className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    EduManage
                  </h1>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                    Modern School
                    <span className="bg-gradient-primary bg-clip-text text-transparent">
                      {" "}Management
                    </span>
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-lg">
                    Streamline your educational institution with our comprehensive 
                    management platform. From student enrollment to financial tracking, 
                    we've got you covered.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 max-w-md">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">Schools</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">50k+</div>
                    <div className="text-sm text-muted-foreground">Students</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Login Form */}
            <div className="flex justify-center lg:justify-end">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-20 right-20 h-32 w-32 rounded-full bg-gradient-primary opacity-10 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute bottom-20 left-20 h-24 w-24 rounded-full bg-accent opacity-10 blur-2xl"
      />
    </div>
  );
};

export default Login;