import { z } from "zod";
import { StepperActions, useStepper } from "../ui/stepper";
import { ONBOARDING_STEP_IDS } from "@/lib/constants/onboardingSteps";
import { Button } from "../ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";

const formSchema = z.object({
  hqOutletName: z
    .string()
    .min(2, "HQ Outlet name must be at least 2 characters"),
  hqOutletAddressLine1: z
    .string()
    .min(5, "Address Line 1 must be at least 5 characters"),
  hqOutletAddressLine2: z.string().optional(),
  hqOutletCity: z.string().min(2, "City must be at least 2 characters"),
  hqOutletPostcode: z
    .string()
    .min(3, "Postal Code must be at least 3 characters"),
  hqOutletState: z.string().min(2, "State must be at least 2 characters"),
  hqOutletPhoneNumber: z
    .string()
    .regex(/^[0-9]{7,15}$/, "Phone number must be between 7 to 15 digits"),
});

export const OnboardingHQOutletForm = () => {
  const { nextStep, currentStep, steps, completeStep, previousStep } =
    useStepper();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hqOutletName: "ABC Gadgets HQ",
      hqOutletAddressLine1: "123 Main Street",
      hqOutletAddressLine2: "Suite 456",
      hqOutletCity: "Kuala Lumpur",
      hqOutletPostcode: "50000",
      hqOutletState: "Wilayah Persekutuan",
      hqOutletPhoneNumber: "0123456789",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (form.formState.isValid) completeStep();
  }, [form.formState.isValid, completeStep]);

  // TODO: Integrate with backend API
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", data);
    nextStep();
  };

  const step =
    steps[currentStep].id === ONBOARDING_STEP_IDS.HQ_OUTLET_DETAILS &&
    steps[currentStep];
  if (!step) return null;

  return (
    <form
      id="onboarding-hq-outlet-form"
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
          control={form.control}
          name="hqOutletName"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="onboarding-hq-outlet-form-hqOutletName">
                Branch Name
              </FieldLabel>
              <Input
                {...field}
                id="onboarding-hq-outlet-form-hqOutletName"
                aria-invalid={fieldState.invalid}
                placeholder="ABC Gadgets HQ"
                autoComplete="off"
              />
              <FieldDescription className="text-xs">
                Used to identify your main branch in the system. This name can
                be changed later.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="hqOutletAddressLine1"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="onboarding-hq-outlet-form-hqOutletAddressLine1">
                Address Line 1
              </FieldLabel>
              <Input
                {...field}
                id="onboarding-hq-outlet-form-hqOutletAddressLine1"
                aria-invalid={fieldState.invalid}
                placeholder="123 Main Street"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="hqOutletAddressLine2"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="onboarding-hq-outlet-form-hqOutletAddressLine2">
                Address Line 2 (Optional)
              </FieldLabel>
              <Input
                {...field}
                id="onboarding-hq-outlet-form-hqOutletAddressLine2"
                aria-invalid={fieldState.invalid}
                placeholder="456 Secondary Street"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field className="grid grid-cols-2">
          <Controller
            control={form.control}
            name="hqOutletPostcode"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="col-span-1">
                <FieldLabel htmlFor="onboarding-hq-outlet-form-hqOutletPostcode">
                  Postcode
                </FieldLabel>
                <Input
                  {...field}
                  id="onboarding-hq-outlet-form-hqOutletPostcode"
                  aria-invalid={fieldState.invalid}
                  placeholder="50000"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="hqOutletCity"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="col-span-1">
                <FieldLabel htmlFor="onboarding-hq-outlet-form-hqOutletCity">
                  City
                </FieldLabel>
                <Input
                  {...field}
                  id="onboarding-hq-outlet-form-hqOutletCity"
                  aria-invalid={fieldState.invalid}
                  placeholder="Kuala Lumpur"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </Field>
        <Controller
          control={form.control}
          name="hqOutletState"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="onboarding-hq-outlet-form-hqOutletState">
                State
              </FieldLabel>
              <Input
                {...field}
                id="onboarding-hq-outlet-form-hqOutletState"
                aria-invalid={fieldState.invalid}
                placeholder="Wilayah Persekutuan"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="hqOutletPhoneNumber"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="onboarding-hq-outlet-form-hqOutletPhoneNumber">
                Phone Number
              </FieldLabel>
              <Input
                {...field}
                id="onboarding-hq-outlet-form-hqOutletPhoneNumber"
                aria-invalid={fieldState.invalid}
                placeholder="0123456789"
                autoComplete="off"
              />
              <FieldDescription className="text-xs">
                Digits only. Include area code, no spaces or symbols. (e.g.
                0123456789)
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <StepperActions className="flex justify-between w-full">
        <Button
          onClick={previousStep}
          variant="outline"
          className="flex-1 flex items-center"
        >
          <ArrowLeftIcon className="mb-0.5" />
          <span>Back</span>
        </Button>
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
