import { TenantOnboardingStepper } from "@/components/tenant/onboarding-stepper";
// import { requireAuth } from "@/lib/server-auth";

export default async function TenantOnboardingPage() {
  // const session = await requireAuth();

  return (
    <div className="flex items-center flex-col justify-center">
      <div className="mb-4 flex flex-col items-center text-center space-y-2">
        <h1 className="text-2xl font-bold">
          Welcome to Baiki RMS! Let&apos;s get your business set up
        </h1>
        <p className="text-muted-foreground">
          Let&apos;s set up your business so you can start managing repairs
          efficiently.
        </p>
      </div>
      <TenantOnboardingStepper />
    </div>
  );
}
