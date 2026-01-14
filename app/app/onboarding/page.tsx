import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TenantOnboardingPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome to Baiki RMS</h1>
        <p className="text-muted-foreground">
          Let&apos;s set up your business so you can start managing repairs
          efficiently.
        </p>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <Card className="border">
            <CardContent>
              Stepper and each step content will be here
            </CardContent>
          </Card>
        </div>
        <div className="col-span-4">
          <p>This is the right side info</p>
        </div>
      </div>
    </div>
  );
}
