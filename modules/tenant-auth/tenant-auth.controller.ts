import { Elysia } from "elysia";
import { TenantAuthDto } from "./tenant-auth.model";
import { TenantAuthService } from "./tenant-auth.service";

export const tenantAuthController = new Elysia({ prefix: "/tenant-auth" }).post(
  "/",
  async ({ body }) => await TenantAuthService.tenantSignUp(body),
  { body: TenantAuthDto.tenantSignUpBody }
);
