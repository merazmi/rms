import { db } from "@/db/drizzle";
import { tenantStaffTable } from "@/db/schema/tenant-staff";
import { TenantStaffBody, TenantStaffResponse } from "./tenant-staff.model";

export abstract class TenantStaffService {
  static async createTenantStaff(
    body: TenantStaffBody
  ): Promise<TenantStaffResponse> {
    // Implementation for creating tenant staff goes here
    const [tenantStaff] = await db
      .insert(tenantStaffTable)
      .values(body)
      .returning();

    return {
      id: tenantStaff.id,
      tenantId: tenantStaff.tenantId,
      userId: tenantStaff.userId,
      role: tenantStaff.role,
      createdAt: tenantStaff.createdAt,
      updatedAt: tenantStaff.updatedAt,
    };
  }
}
