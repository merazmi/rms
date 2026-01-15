"use client";

import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { ArrowLeftIcon, CheckIcon, PlusIcon, XIcon } from "lucide-react";
import { ONBOARDING_STEP_IDS } from "@/lib/constants/onboardingSteps";
import { useStepper, StepperActions } from "../ui/stepper";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "../ui/field";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

// --- Zod schema for single input ---
const inviteInputSchema = z
  .object({
    method: z.enum(["email", "phone"]),
    value: z.string().min(1).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.value) return;
    if (data.method === "email" && !/^\S+@\S+\.\S+$/.test(data.value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["value"],
        message: "Please enter a valid email address",
      });
    }
    if (data.method === "phone" && !/^[0-9]{7,15}$/.test(data.value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["value"],
        message: "Phone must be 7-15 digits",
      });
    }
  });

type InviteInputForm = z.infer<typeof inviteInputSchema>;

export const OnboardingInviteStaffForm = () => {
  const { previousStep, currentStep, steps, isLastStep, completeStep } =
    useStepper();
  const router = useRouter();

  const form = useForm<InviteInputForm>({
    resolver: zodResolver(inviteInputSchema),
    defaultValues: { method: "email", value: "" },
  });

  const { method } = useWatch({ control: form.control });

  const [invites, setInvites] = useState<InviteInputForm[]>([]);

  const addInvite = async (data: InviteInputForm) => {
    inviteInputSchema.parse(data);
    const duplicate = invites.some(
      (i) => i.value === data.value && i.method === data.method
    );
    if (duplicate) {
      form.setError("value", {
        type: "manual",
        message: "Please enter a unique invite",
      });
      return;
    }

    // Add to list and reset input
    setInvites((prev) => [...prev, data]);
    form.reset({ method: data.method, value: "" });
  };

  const removeInvite = (index: number) => {
    setInvites((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitStep = () => {
    // TODO: send `invites` array to backend
    console.log("Submitting invites:", invites);
    if (isLastStep) {
      completeStep();
      router.push("/app/onboarding/completed");
    }
  };

  const step =
    steps[currentStep].id === ONBOARDING_STEP_IDS.INVITE_TEAM_MEMBERS &&
    steps[currentStep];
  if (!step) return null;

  return (
    <div>
      <div className="flex gap-3 items-center mb-6">
        <div className="bg-primary/10 p-2 text-primary rounded-lg">
          <div className="w-5 h-5">{step.icon}</div>
        </div>
        <div>
          <h2 className="text-lg font-medium">{step.label}</h2>
          {step.description && (
            <p className="text-sm text-muted-foreground">{step.description}</p>
          )}
        </div>
      </div>

      <FieldGroup className="gap-5">
        <FieldSet className="flex flex-col gap-2">
          <FieldLabel>
            <FieldTitle>Invite Team Members</FieldTitle>
          </FieldLabel>
          <div className="flex gap-2">
            <Controller
              control={form.control}
              name="method"
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-row gap-2"
                >
                  <FieldLabel>
                    <Field orientation="horizontal">
                      <FieldTitle>Email</FieldTitle>
                      <RadioGroupItem value="email" />
                    </Field>
                  </FieldLabel>
                  <FieldLabel>
                    <Field orientation="horizontal">
                      <FieldTitle>Phone</FieldTitle>
                      <RadioGroupItem value="phone" />
                    </Field>
                  </FieldLabel>
                </RadioGroup>
              )}
            />
          </div>
        </FieldSet>
        <Controller
          control={form.control}
          name="value"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="onboarding-invite-staff-form-value">
                {method === "email" ? "Email Address" : "Phone Number"}
              </FieldLabel>
              <div className="flex gap-2">
                <Input
                  {...field}
                  id="onboarding-invite-staff-form-value"
                  aria-invalid={fieldState.invalid}
                  placeholder={
                    method === "email" ? "abc@example.com" : "0123456789"
                  }
                  autoComplete="off"
                />
                <Button
                  variant="secondary"
                  type="button"
                  className="leading-0"
                  onClick={form.handleSubmit(addInvite)}
                >
                  <PlusIcon className="mb-0.5" />
                  <span>Add</span>
                </Button>
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Pills */}
      <div className="flex flex-wrap gap-2 mt-3">
        {invites.map((invite, idx) => (
          <div
            key={idx}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center gap-1"
          >
            <span>{invite.value}</span>
            <XIcon
              className="w-3 h-3 cursor-pointer"
              onClick={() => removeInvite(idx)}
            />
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        You can skip this step and invite team members later from your
        dashboard.
      </p>

      {/* Stepper actions */}
      <StepperActions className="flex justify-between w-full mt-4">
        <Button
          onClick={previousStep}
          variant="outline"
          className="flex-1 flex items-center"
        >
          <ArrowLeftIcon className="mb-0.5" />
          <span>Back</span>
        </Button>
        <div className="flex-1 flex gap-2">
          <Button
            type="button"
            className="flex-1 flex items-center"
            onClick={handleSubmitStep}
          >
            <CheckIcon />
            <span>Complete Setup</span>
          </Button>
        </div>
      </StepperActions>
    </div>
  );
};
