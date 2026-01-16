import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useStepper } from "@/components/ui/stepper";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

export function NavOnboardingStepper() {
  const { steps, currentStep, goToStep, isStepCompleted } = useStepper();

  const allStepsCompleted = steps.every((_, index) => isStepCompleted(index));

  if (allStepsCompleted) return null;

  return (
    <SidebarGroup className="border-b">
      <SidebarGroupLabel>Onboarding</SidebarGroupLabel>
      <SidebarMenu>
        {steps.map((step, index) => {
          const isCompleted = isStepCompleted(index);
          const isCurrent = index === currentStep;
          const isAccessible = index <= currentStep || isCompleted;
          const canNavigate =
            isAccessible && (index < currentStep || isCompleted);

          return (
            <SidebarMenuItem key={step.id}>
              <SidebarMenuButton
                onClick={() => {
                  if (canNavigate) goToStep(index);
                  redirect("/app/onboarding");
                }}
                isActive={isCurrent}
                disabled={!isAccessible}
                className={cn(
                  !isAccessible && "opacity-50 cursor-not-allowed",
                  canNavigate && "cursor-pointer",
                  "relative"
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    {step.icon ? (
                      step.icon
                    ) : (
                      <div
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full border-2 text-xs font-semibold",
                          isCurrent
                            ? "border-primary text-primary"
                            : "border-muted-foreground text-muted-foreground"
                        )}
                      >
                        {index + 1}
                      </div>
                    )}
                    <span>{step.label}</span>
                  </div>
                </div>
              </SidebarMenuButton>
              {isCompleted && (
                <div className="absolute top-1 left-4 bg-green-500 rounded-full text-white p-0.5">
                  <Check className="h-2 w-2" />
                </div>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
