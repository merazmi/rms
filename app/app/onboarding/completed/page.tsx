import Link from "next/link";

export default function OnboardingCompletedPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="text-3xl font-bold mb-4">Onboarding Completed!</h1>
      <p className="text-lg text-center">
        Congratulations! You have successfully completed the onboarding process.
      </p>
      <Link href="/app/dashboard">Go to Dashboard</Link>
    </div>
  );
}
