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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Mail, TriangleAlert, CheckCircle2 } from 'lucide-react';

const recoverySchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

type RecoveryFormValues = z.infer<typeof recoverySchema>;

const PasswordRecoveryPage = () => {
  console.log('PasswordRecoveryPage loaded');
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const form = useForm<RecoveryFormValues>({
    resolver: zodResolver(recoverySchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: RecoveryFormValues) => {
    console.log("Password recovery form submitted:", data);
    setFormError(null);
    setFormSuccess(null);
    // Simulate API call for password recovery
    setTimeout(() => {
      // Simulate success
      setFormSuccess(`Password reset instructions sent to ${data.email}. Please check your inbox.`);
      form.reset();
      // In a real app, you might not redirect immediately, or redirect to a confirmation page
    }, 1000);
  };

  return (
    <AuthFormContainer
      title="Forgot Your Password?"
      description="No worries! Enter your email address below and we'll send you a link to reset your password."
      logo={<img src="https://via.placeholder.com/50/3B82F6/FFFFFF?Text=AppLogo" alt="App Logo" className="h-12 w-auto" />}
      footer={
        <p>
          Remember your password?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Back to Login
          </Link>
        </p>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {formError && (
            <Alert variant="destructive">
              <TriangleAlert className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}
          {formSuccess && (
            <Alert variant="default" className="bg-green-100 border-green-300 text-green-700">
               <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle>Instructions Sent!</AlertTitle>
              <AlertDescription>{formSuccess}</AlertDescription>
            </Alert>
          )}
          {!formSuccess && ( // Hide form after success message
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
          )}
          {!formSuccess && (
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
          )}
        </form>
      </Form>
    </AuthFormContainer>
  );
};

export default PasswordRecoveryPage;