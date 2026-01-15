import { ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { StepperActions, useStepper } from "../ui/stepper";
import { z } from "zod";
import { ONBOARDING_STEP_IDS } from "@/lib/constants/onboardingSteps";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { useEffect } from "react";

const currentYear = new Date().getFullYear();

const formSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters"),
  ssmNumber: z
    .string()
    .regex(/^[0-9]{12}$/, "SSM number must be exactly 12 digits")
    .refine((val) => {
      const year = parseInt(val.slice(0, 4), 10);
      return year >= 1900 && year <= currentYear + 1;
    }, `Invalid registration year (first 4 digits)`)
    .refine((val) => {
      const entityCode = parseInt(val.slice(4, 6), 10);
      return entityCode >= 1 && entityCode <= 99;
    }, `Invalid entity type code (digits 5-6)`),
});

export const OnboardingBusinessDetailForm = () => {
  const { nextStep, currentStep, steps, completeStep } = useStepper();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      ssmNumber: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // TODO: Integrate with backend API
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", data);
    nextStep();
  };

  useEffect(() => {
    if (form.formState.isValid) completeStep();
  }, [form.formState.isValid, completeStep]);

  const step =
    steps[currentStep].id === ONBOARDING_STEP_IDS.BUSINESS_DETAILS &&
    steps[currentStep];
  if (!step) return null;

  return (
    <form
      id="onboarding-business-details-form"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
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
        <Controller
          name="businessName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="onboarding-business-details-form-businessName">
                Business Name
              </FieldLabel>
              <Input
                {...field}
                id="onboarding-business-details-form-businessName"
                aria-invalid={fieldState.invalid}
                placeholder="Acme Repairs Sdn Bhd"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="ssmNumber"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="onboarding-business-details-form-ssmNumber">
                SSM Number
              </FieldLabel>
              <Input
                {...field}
                id="onboarding-business-details-form-ssmNumber"
                aria-invalid={fieldState.invalid}
                placeholder="2023010123456"
                autoComplete="off"
              />
              <FieldDescription className="text-xs">
                Your SSM registration number (Suruhanjaya Syarikat Malaysia)
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <StepperActions className="flex justify-between w-full">
        <Button
          type="submit"
          disabled={!form.formState.isValid}
          className="flex-1 flex items-center"
        >
          <span>Continue</span>
          <ArrowRightIcon className="mb-0.5" />
        </Button>
      </StepperActions>
    </form>
  );
};
