import { auth } from "@/lib/auth";
import { ApiError } from "@/lib/error/error";
import { authController } from "@/modules/auth/auth.controller";
import { tenantController } from "@/modules/tenant/tenant.controller";
import { Elysia } from "elysia";

export const app = new Elysia({ prefix: "/api" })
  .error({ API_ERROR: ApiError })
  .mount("/", auth.handler)
  .get("/health", () => "OK")
  .use(authController)
  .use(tenantController);

export const GET = app.fetch;
export const POST = app.fetch;
export const PUT = app.fetch;
export const DELETE = app.fetch;
