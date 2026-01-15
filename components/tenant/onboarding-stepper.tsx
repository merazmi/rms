"use client";

import { ONBOARDING_STEP_IDS } from "@/lib/constants/onboardingSteps";
import { OnboardingBusinessDetailForm } from "@/components/forms/onboarding-business-detail-form";
import { OnboardingHQOutletForm } from "@/components/forms/onboarding-hq-outlet-form";
import { Card, CardContent } from "@/components/ui/card";
import { Stepper, StepperContent, useStepper } from "../ui/stepper";

const RenderStepContent = ({
  stepId,
}: {
  stepId: (typeof ONBOARDING_STEP_IDS)[keyof typeof ONBOARDING_STEP_IDS];
}) => {
  switch (stepId) {
    case ONBOARDING_STEP_IDS.BUSINESS_DETAILS:
      return <OnboardingBusinessDetailForm />;
    case ONBOARDING_STEP_IDS.HQ_OUTLET_DETAILS:
      return <OnboardingHQOutletForm />;
    case ONBOARDING_STEP_IDS.INVITE_TEAM_MEMBERS:
      return <div>Step 3 Content</div>;
    default:
      return <div>Unknown Step</div>;
  }
};

export const TenantOnboardingStepper = () => {
  const { steps, currentStep, goToStep } = useStepper();

  if (!steps || steps.length === 0) return null;
  if (!steps[currentStep]) return null;

  const stepId = steps[currentStep]
    .id as (typeof ONBOARDING_STEP_IDS)[keyof typeof ONBOARDING_STEP_IDS];

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
          <CardContent>
            <RenderStepContent stepId={stepId} />
          </CardContent>
        </Card>
      </StepperContent>
    </div>
  );
};
