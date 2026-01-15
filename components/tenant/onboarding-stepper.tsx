"use client";

import {
  Stepper,
  StepperActions,
  StepperContent,
  useStepper,
} from "../ui/stepper";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export const TenantOnboardingStepper = () => {
  const {
    steps,
    currentStep,
    goToStep,
    nextStep,
    previousStep,
    canGoBack,
    canGoNext,
    completeStep,
  } = useStepper();

  if (!steps || steps.length === 0) return null;
  if (!steps[currentStep]) return null;

  // Example: Call completeStep() when form is valid or task is done
  const handleComplete = () => {
    // Add your validation logic here
    completeStep(); // Mark current step as completed
  };

  return (
    <div className="max-w-xl w-full mt-4">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={goToStep}
        clickable={true}
      />
      <StepperContent>
        <Card className="border">
          <CardContent className="pt-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {steps[currentStep].label}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {steps[currentStep].description}
              </p>
              {/* Your form or content here */}
              <Button
                onClick={handleComplete}
                variant="secondary"
                className="mt-4"
              >
                Mark as Complete
              </Button>
            </div>
          </CardContent>
        </Card>
      </StepperContent>
      <StepperActions>
        <Button onClick={previousStep} disabled={!canGoBack} variant="outline">
          Back
        </Button>
        <Button onClick={nextStep} disabled={!canGoNext}>
          Next
        </Button>
      </StepperActions>
    </div>
  );
};
