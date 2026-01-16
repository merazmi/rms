import { requireAuth } from "@/lib/server-auth";

export default async function DashboardPage() {
  const session = await requireAuth();

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg text-center">
        Welcome back, {session.user.name || session.user.email}!
      </p>
      <p className="text-sm text-muted-foreground mt-2">
        User ID: {session.user.id}
      </p>
    </div>
  );
}
