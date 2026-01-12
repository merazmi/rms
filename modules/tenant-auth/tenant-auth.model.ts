import { tenantStaffRole } from "@/db/schema/tenant-staff";
import { z } from "zod";

export const TenantAuthDto = {
  tenantSignUpBody: z.object({
    businessName: z.string().min(2),
    username: z.string().min(2),
    email: z.email(),
    password: z.string().min(6),
  }),
  tenantSignUpResponse: z.object({
    user: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      role: z.enum(tenantStaffRole),
    }),
    tenant: z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
    }),
  }),
};

export type TenantSignUpBody = z.infer<typeof TenantAuthDto.tenantSignUpBody>;
export type TenantSignUpResponse = z.infer<
  typeof TenantAuthDto.tenantSignUpResponse
>;
