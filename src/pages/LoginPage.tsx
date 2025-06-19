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
import { Mail, Lock, TriangleAlert } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
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
      email: "user@example.com", // Default for easier testing as per user journey
      password: "password123",    // Default for easier testing
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login form submitted:", data);
    // Simulate API call
    if (data.email === "user@example.com" && data.password === "password123") {
      setErrorMessage(null);
      // Assuming 2FA is enabled for this demo user
      console.log("Login successful, redirecting to 2FA or Dashboard");
      // For demo purposes, let's say this user has 2FA
      // In a real app, check user profile for 2FA status
      const userHas2FAEnabled = true; 
      if (userHas2FAEnabled) {
        navigate('/two-factor-auth');
      } else {
        navigate('/dashboard');
      }
    } else {
      setErrorMessage("Invalid email or password. Please try again.");
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                   <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input type="password" placeholder="********" {...field} className="pl-10" />
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