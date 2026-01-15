"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signInEmailAction } from "@/modules/auth/auth.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { SocialLoginForm } from "./social-login-form";

const formSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const LoginForm = () => {
  const [error, setError] = useState<string>("");

  const searchParams = useSearchParams();
  const isVerified = searchParams.get("verified") === "true";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    reValidateMode: "onChange",
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setError("");
    const result = await signInEmailAction(data);

    if (result.success) {
      form.reset();
      redirect("/app");
    } else {
      setError(result.error.message || "An unexpected error occurred.");
    }
  };

  return (
    <form
      id="signin-form"
      className="p-6 md:p-8"
      onSubmit={form.handleSubmit(handleSubmit)}
      onFocus={() => setError("")}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Welcome back to Baiki RMS</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Log in to access your outlets, repair tickets, and daily operations.
        </p>
      </div>

      {isVerified && (
        <Alert variant="success" className="mt-4">
          <CheckCircle2Icon />
          <AlertTitle>Your email has been verified successfully.</AlertTitle>
          <AlertDescription>
            You can now log in now. Welcome aboard!
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircleIcon />
          <AlertTitle>Failed to login.</AlertTitle>
          <AlertDescription>
            <ul className="list-inside list-disc text-sm">
              <li>{error}</li>
            </ul>
          </AlertDescription>
        </Alert>
      )}
      <FieldGroup className="mt-4 gap-5">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="signup-form-email">Email</FieldLabel>
              <Input
                {...field}
                id="signup-form-email"
                type="email"
                placeholder="you@yourbusiness.com"
                aria-invalid={fieldState.invalid}
              />
              <FieldDescription className="text-xs">
                Use the email you registered your business with.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="signup-form-password">Password</FieldLabel>
              <Input
                {...field}
                id="signup-form-password"
                type="password"
                placeholder="Enter your password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button size="lg" type="submit">
            Log in to Dashboard
          </Button>
        </Field>
        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card mt-0.5">
          Or continue with
        </FieldSeparator>
        <SocialLoginForm />
        <FieldDescription className="text-center">
          New to Baiki? <Link href="/signup">Create an account</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
};
