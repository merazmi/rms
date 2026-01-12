import { auth } from "@/lib/auth";
import { authController } from "@/modules/auth/auth.controller";
import { tenantAuthController } from "@/modules/tenant-auth/tenant-auth.controller";
import { tenantController } from "@/modules/tenant/tenant.controller";
import { Elysia } from "elysia";

export const app = new Elysia({ prefix: "/api" })
  .mount("/", auth.handler)
  .get("/health", () => "OK")
  .use(authController)
  .use(tenantController)
  .use(tenantAuthController);

export const GET = app.fetch;
export const POST = app.fetch;
export const PUT = app.fetch;
export const DELETE = app.fetch;
