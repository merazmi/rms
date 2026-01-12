import { z } from "zod";
import { tenantStatus, tenantType } from "@/db/schema/tenant";

export const TenantDto = {
  tenantBody: z.object({
    slug: z.string(),
    name: z.string(),
    type: z.enum(tenantType).optional(),
    status: z.enum(tenantStatus).optional(),
    createdBy: z.string(),
  }),
  tenantResponse: z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    status: z.string(),
    type: z.string(),
    createdBy: z.string(),
    createdAt: z.string(),
    onboardedAt: z.string().nullable(),
    updatedAt: z.string(),
  }),
};

export type TenantBody = z.infer<typeof TenantDto.tenantBody>;
export type TenantResponse = z.infer<typeof TenantDto.tenantResponse>;
