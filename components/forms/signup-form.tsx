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
import { signUpEmailAction } from "@/modules/auth/auth.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { SocialLoginForm } from "./social-login-form";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const SignupForm = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    reValidateMode: "onChange",
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setError("");
    setIsLoading(true);
    const result = await signUpEmailAction(data);
    if (result.success) {
      form.reset();
      redirect("/verify-email");
    } else {
      setError("An unknown error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <form
      id="signup-form"
      className="p-6 md:p-8"
      onSubmit={form.handleSubmit(handleSubmit)}
      onFocus={() => setError("")}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          Set up your repair business in minutes
        </h1>
        <p className="text-muted-foreground text-sm text-balance">
          Create your business account and start managing repairs, inventory,
          and technicians in one system.
        </p>
      </div>
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircleIcon />
          <AlertTitle>Failed to sign up.</AlertTitle>
          <AlertDescription>
            <ul className="list-inside list-disc text-sm">
              <li>Please check your information and try again.</li>
              <li>Or, please contact support if the issue persists.</li>
            </ul>
          </AlertDescription>
        </Alert>
      )}
      <FieldGroup className="mt-4 gap-5">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="signup-form-name">Name</FieldLabel>
              <Input
                {...field}
                id="signup-form-name"
                type="text"
                placeholder="John Doe"
                aria-invalid={fieldState.invalid}
                disabled={isLoading}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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
                placeholder="owner@yourbusiness.com"
                aria-invalid={fieldState.invalid}
                disabled={isLoading}
              />
              <FieldDescription className="text-xs">
                This will be your main admin account.
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
                disabled={isLoading}
              />
              <FieldDescription className="text-xs">
                Must be at least 8 characters long.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button size="lg" type="submit" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Get started with Baiki"}
          </Button>
        </Field>
        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card mt-0.5">
          Or continue with
        </FieldSeparator>
        <SocialLoginForm />
        <FieldDescription className="text-center">
          Already have an account? <Link href="/login">Log in</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
};
