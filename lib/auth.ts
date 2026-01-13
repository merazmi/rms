import { db } from "@/db/drizzle";
import * as schema from "@/db/schema/auth";
import { EmailVerificationEmail } from "@/emails/email-verification";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "./resend";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      account: schema.account,
      session: schema.session,
      verification: schema.verification,
    },
  }),
  emailAndPassword: { enabled: true, requireEmailVerification: true },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    sendVerificationEmail: async ({ token, url, user }) => {
      const verificationUrl = new URL(url);

      verificationUrl.searchParams.set(
        "callbackURL",
        process.env.EMAIL_VERIFICATION_CALLBACK_URL ||
          "http://localhost:3000/login?verified=true"
      );

      void sendEmail({
        emailTo: user.email,
        subject: "Verify your email address",
        content: EmailVerificationEmail({
          token,
          url: verificationUrl.toString(),
          user,
        }),
      });
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: process.env.COOKIE_DOMAIN || ".localhost:3000",
    },
  },
  trustedOrigins: ["http://localhost:3000", "http://baiki.test"],
  plugins: [nextCookies()],
});
