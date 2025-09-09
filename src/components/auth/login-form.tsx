import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn, Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/auth";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { setUser, setTokens, setFirstTimeLogin } = useAuthStore();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      // Mock login for demo - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful response
      const mockResponse = {
        accessToken: {
          token: "mock-jwt-token",
          tokenType: "Bearer",
          createdDate: new Date().toISOString(),
          expiresOn: new Date(Date.now() + 3600000).toISOString(),
        },
        refreshToken: "mock-refresh-token",
        firstTimeLogin: false,
        user: {
          id: 1,
          email: data.email,
          phone: "233000000000",
          firstName: "John",
          lastName: "Doe",
          userType: "SUPER_ADMIN" as const,
          loginEnabled: true,
          schoolId: null,
          schoolName: null,
          roles: ["SUPER_ADMIN"],
          permissions: [
            "SCHOOL_DELETE", "STUDENT_UPDATE", "STUDENT_PARENT_REASSIGN", "STUDENT_VIEW_ALL",
            "USER_VIEW", "WRISTBAND_VIEW", "STUDENT_VIEW_WALLET_BALANCE", "SCHOOL_UPDATE",
            "WRISTBANDS_VIEW", "STUDENT_BULK_CREATE", "USER_CREATE", "STUDENT_VIEW",
            "PROFILE_VIEW", "SCHOOLS_VIEW", "POS_REASSIGN", "WRISTBAND_MANAGE",
            "STUDENT_VIEW_WALLET", "STUDENT_VIEW_BY_SCHOOL", "USERS_VIEW", "WALLET_MANAGE",
            "POS_CREATE", "STUDENT_DELETE", "WRISTBAND_ASSIGN", "VENDOR_MANAGE",
            "STUDENT_VIEW_BY_PARENT", "POS_UPDATE", "USER_DELETE", "USER_UPDATE",
            "POS_DELETE", "SCHOOL_VIEW", "SCHOOL_MANAGE", "WRISTBAND_DELETE",
            "PERMISSION_MANAGE", "STUDENT_UPDATE_STATUS", "POS_MANAGE", "SCHOOL_CREATE",
            "STUDENT_CREATE", "ROLE_MANAGE", "PARENT_MANAGE", "STUDENT_BULK_DELETE",
            "USER_INVITE", "WRISTBAND_CREATE", "POS_VIEWS", "STUDENT_MANAGE", "POS_VIEW"
          ] as any,
        },
      };

      // Set auth data
      setUser(mockResponse.user);
      setTokens(mockResponse.accessToken.token, mockResponse.refreshToken);
      setFirstTimeLogin(mockResponse.firstTimeLogin);

      toast({
        title: "Login successful",
        description: "Welcome back to School Management System",
      });

      // Redirect will be handled by the route protection
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="bg-gradient-card shadow-strong border-border/50">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
            <LogIn className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in to your School Management account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Enter your email"
                          className="pl-10 transition-smooth"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 transition-smooth"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 p-0 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:shadow-glow transition-smooth"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                  />
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};