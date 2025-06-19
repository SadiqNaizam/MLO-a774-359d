import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck, TriangleAlert } from 'lucide-react';

const otpSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be 6 digits." }),
});

type OTPFormValues = z.infer<typeof otpSchema>;

const TwoFactorAuthPage = () => {
  console.log('TwoFactorAuthPage loaded');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data: OTPFormValues) => {
    console.log("2FA form submitted:", data);
    // Simulate API call for 2FA verification
    if (data.otp === "123456") { // Example valid OTP
      setErrorMessage(null);
      console.log("2FA successful, redirecting to dashboard");
      navigate('/dashboard');
    } else {
      setErrorMessage("Invalid OTP code. Please try again.");
      form.resetField("otp");
    }
  };

  return (
    <AuthFormContainer
      title="Two-Factor Authentication"
      description="Enter the 6-digit code from your authenticator app."
      logo={<ShieldCheck className="h-12 w-12 text-indigo-600" />}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {errorMessage && (
            <Alert variant="destructive">
              <TriangleAlert className="h-4 w-4" />
              <AlertTitle>Verification Failed</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Verify Code
          </Button>
        </form>
      </Form>
    </AuthFormContainer>
  );
};

export default TwoFactorAuthPage;