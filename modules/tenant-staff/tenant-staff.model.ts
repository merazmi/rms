import { z } from "zod";
import { tenantStaffRole } from "@/db/schema/tenant-staff";

export const TenantStaffDto = {
  tenantStaffBody: z.object({
    tenantId: z.uuid(),
    userId: z.string(),
    role: z.enum(tenantStaffRole),
  }),
  tenantStaffResponse: z.object({
    id: z.uuid(),
    tenantId: z.uuid(),
    userId: z.string(),
    role: z.enum(tenantStaffRole),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
};

export type TenantStaffBody = z.infer<typeof TenantStaffDto.tenantStaffBody>;
export type TenantStaffResponse = z.infer<
  typeof TenantStaffDto.tenantStaffResponse
>;
