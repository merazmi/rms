import { AppHeader } from "@/components/layouts/tenant-app-layout/app-header";
import { AppSidebar } from "@/components/layouts/tenant-app-layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { StepperProvider } from "@/components/ui/stepper";
import { onboardingSteps } from "@/lib/constants/onboardingSteps";
import { requireAuth } from "@/lib/server-auth";

export default async function TenantAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();
  return (
    <StepperProvider initialSteps={onboardingSteps}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <div className="flex flex-1 flex-col gap-4 p-4 md:p-8 pt-8 max-w-7xl w-full mx-auto">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </StepperProvider>
  );
}
