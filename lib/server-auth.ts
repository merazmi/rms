import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Get the current session from Better Auth
 * Returns null if no session exists
 */
export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}

/**
 * Require authentication for a page
 * Redirects to login if no session exists
 */
export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}

/**
 * Require email verification
 * Redirects to verify email page if email is not verified
 */
export async function requireVerifiedEmail() {
  const session = await requireAuth();

  if (!session.user.emailVerified) {
    redirect("/verify-email");
  }

  return session;
}
