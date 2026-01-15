"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import * as React from "react";

export interface Step {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface StepperContextValue {
  steps: Step[];
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  canGoBack: boolean;
  canGoNext: boolean;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  setSteps: (steps: Step[]) => void;
  resetStepper: () => void;
  completeStep: (stepIndex?: number) => void;
  isStepCompleted: (stepIndex: number) => boolean;
  completedSteps: Set<number>;
}

const StepperContext = React.createContext<StepperContextValue | null>(null);

export function useStepper() {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within a StepperProvider");
  }
  return context;
}

interface StepperProviderProps {
  children: React.ReactNode;
  initialSteps?: Step[];
  initialStep?: number;
  onStepChange?: (step: number) => void;
  requireStepCompletion?: boolean;
}

export function StepperProvider({
  children,
  initialSteps = [],
  initialStep = 0,
  onStepChange,
  requireStepCompletion = true,
}: StepperProviderProps) {
  const [steps, setSteps] = React.useState<Step[]>(initialSteps);
  const [currentStep, setCurrentStep] = React.useState(initialStep);
  const [completedSteps, setCompletedSteps] = React.useState<Set<number>>(
    new Set()
  );

  const totalSteps = steps.length;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const canGoBack = currentStep > 0;
  const isCurrentStepCompleted = completedSteps.has(currentStep);
  const canGoNext =
    currentStep < totalSteps - 1 &&
    (!requireStepCompletion || isCurrentStepCompleted);

  const nextStep = React.useCallback(() => {
    if (canGoNext) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      onStepChange?.(newStep);
    }
  }, [canGoNext, currentStep, onStepChange]);

  const previousStep = React.useCallback(() => {
    if (canGoBack) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      onStepChange?.(newStep);
    }
  }, [canGoBack, currentStep, onStepChange]);

  const goToStep = React.useCallback(
    (step: number) => {
      if (step >= 0 && step < totalSteps) {
        setCurrentStep(step);
        onStepChange?.(step);
      }
    },
    [totalSteps, onStepChange]
  );

  const resetStepper = React.useCallback(() => {
    setCurrentStep(initialStep);
    setCompletedSteps(new Set());
    onStepChange?.(initialStep);
  }, [initialStep, onStepChange]);

  const completeStep = React.useCallback(
    (stepIndex?: number) => {
      const indexToComplete = stepIndex ?? currentStep;
      setCompletedSteps((prev) => new Set(prev).add(indexToComplete));
    },
    [currentStep]
  );

  const isStepCompleted = React.useCallback(
    (stepIndex: number) => completedSteps.has(stepIndex),
    [completedSteps]
  );

  const value = React.useMemo(
    () => ({
      steps,
      currentStep,
      totalSteps,
      isFirstStep,
      isLastStep,
      canGoBack,
      canGoNext,
      nextStep,
      previousStep,
      goToStep,
      setSteps,
      resetStepper,
      completeStep,
      isStepCompleted,
      completedSteps,
    }),
    [
      steps,
      currentStep,
      totalSteps,
      isFirstStep,
      isLastStep,
      canGoBack,
      canGoNext,
      nextStep,
      previousStep,
      goToStep,
      resetStepper,
      completeStep,
      isStepCompleted,
      completedSteps,
    ]
  );

  return (
    <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
  );
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
  orientation?: "horizontal" | "vertical";
  clickable?: boolean;
}

export function Stepper({
  steps,
  currentStep,
  onStepClick,
  className,
  orientation = "horizontal",
  clickable = false,
}: StepperProps) {
  const handleStepClick = (index: number) => {
    if (clickable && onStepClick && index <= currentStep) {
      onStepClick(index);
    }
  };

  if (orientation === "vertical") {
    return (
      <div className={cn("space-y-4", className)}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = clickable && index <= currentStep;

          return (
            <div key={step.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleStepClick(index)}
                  disabled={!isClickable}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                    isCompleted &&
                      "border-primary bg-primary text-primary-foreground",
                    isCurrent && "border-primary bg-background text-primary",
                    !isCompleted &&
                      !isCurrent &&
                      "border-muted bg-background text-muted-foreground",
                    isClickable && "cursor-pointer hover:border-primary",
                    !isClickable && "cursor-not-allowed"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-full w-0.5 flex-1 my-2",
                      index < currentStep ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
              <div className="flex-1 pb-8">
                <button
                  onClick={() => handleStepClick(index)}
                  disabled={!isClickable}
                  className={cn(
                    "text-left",
                    isClickable && "cursor-pointer",
                    !isClickable && "cursor-default"
                  )}
                >
                  <div
                    className={cn(
                      "text-sm font-medium",
                      isCurrent && "text-foreground",
                      isCompleted && "text-foreground",
                      !isCurrent && !isCompleted && "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </div>
                  {step.description && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {step.description}
                    </div>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = clickable && index <= currentStep;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => handleStepClick(index)}
                  disabled={!isClickable}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                    isCompleted &&
                      "border-primary bg-primary text-primary-foreground",
                    isCurrent && "border-primary bg-background text-primary",
                    !isCompleted &&
                      !isCurrent &&
                      "border-muted bg-background text-muted-foreground",
                    isClickable && "cursor-pointer hover:border-primary",
                    !isClickable && "cursor-not-allowed"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </button>
                <div className="text-center">
                  <div
                    className={cn(
                      "text-sm font-medium",
                      isCurrent && "text-foreground",
                      isCompleted && "text-foreground",
                      !isCurrent && !isCompleted && "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 mx-2",
                    index < currentStep ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

interface StepperContentProps {
  children: React.ReactNode;
  className?: string;
}

export function StepperContent({ children, className }: StepperContentProps) {
  return <div className={cn("mt-8", className)}>{children}</div>;
}

interface StepperActionsProps {
  children: React.ReactNode;
  className?: string;
}

export function StepperActions({ children, className }: StepperActionsProps) {
  return (
    <div className={cn("flex gap-2 justify-end mt-6", className)}>
      {children}
    </div>
  );
}
