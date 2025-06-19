import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import AuthFormContainer from '@/components/auth/AuthFormContainer';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Mail, Lock, TriangleAlert } from 'lucide-react'; // Lock might be used by other forms, keep import for now.

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  captcha: z.string().min(6, { message: "Captcha must be 6 characters." }), // Changed from password to captcha
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  console.log('LoginPage loaded');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "user@example.com", 
      captcha: "", // Changed from password, default captcha is empty
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login form submitted:", data);
    // Simulate API call
    // Update mock check for captcha
    if (data.email === "user@example.com" && data.captcha === "ABCXYZ") { 
      setErrorMessage(null);
      console.log("Login successful (captcha valid), redirecting to 2FA or Dashboard");
      const userHas2FAEnabled = true; 
      if (userHas2FAEnabled) {
        navigate('/two-factor-auth');
      } else {
        navigate('/dashboard');
      }
    } else {
      setErrorMessage("Invalid email or captcha. Please try again."); // Updated error message
    }
  };

  return (
    <AuthFormContainer
      title="Sign In"
      description="Welcome back! Please enter your details."
      logo={<img src="https://via.placeholder.com/50/3B82F6/FFFFFF?Text=AppLogo" alt="App Logo" className="h-12 w-auto" />}
      footer={
        <>
          <p className="mt-2">
            <Link to="/password-recovery" className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </Link>
          </p>
          <p className="mt-2">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign Up
            </Link>
          </p>
        </>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {errorMessage && (
            <Alert variant="destructive">
              <TriangleAlert className="h-4 w-4" />
              <AlertTitle>Login Failed</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input placeholder="you@example.com" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="captcha" // Changed from password to captcha
            render={({ field }) => (
              <FormItem>
                <FormLabel>Captcha</FormLabel> {/* Changed label */}
                <FormControl>
                   <div className="relative">
                    {/* Lock icon removed for captcha; adjust padding if needed or add captcha-specific icon */}
                    <Input type="text" placeholder="Enter captcha code" {...field} className="px-3 py-2" /> {/* Changed type and placeholder, adjusted padding */}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Remember me</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </AuthFormContainer>
  );
};

export default LoginPage;