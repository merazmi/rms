import { db } from "@/db/drizzle";
import { TenantBody, TenantResponse } from "./tenant.model";
import { tenantTable } from "@/db/schema/tenant";
import { eq } from "drizzle-orm";

export abstract class TenantService {
  static async listTenants(): Promise<TenantResponse[]> {
    const tenants = await db.select().from(tenantTable);

    return tenants.map((tenant) => ({
      id: tenant.id,
      name: tenant.name,
      slug: tenant.slug,
      status: tenant.status,
      type: tenant.type,
      createdBy: tenant.createdBy,
      createdAt: tenant.createdAt.toISOString(),
      onboardedAt: tenant.onboardedAt ? tenant.onboardedAt.toISOString() : null,
      updatedAt: tenant.updatedAt.toISOString(),
    }));
  }

  static async createTenant(body: TenantBody): Promise<TenantResponse> {
    const [newTenant] = await db
      .insert(tenantTable)
      .values({
        name: body.name,
        slug: body.slug,
        type: body.type,
        status: body.status,
        createdBy: body.createdBy,
      })
      .returning();

    return {
      id: newTenant.id,
      name: newTenant.name,
      slug: newTenant.slug,
      status: newTenant.status,
      type: newTenant.type,
      createdBy: newTenant.createdBy,
      createdAt: newTenant.createdAt.toISOString(),
      onboardedAt: newTenant.onboardedAt
        ? newTenant.onboardedAt.toISOString()
        : null,
      updatedAt: newTenant.updatedAt.toISOString(),
    };
  }

  static async getTenantBySlug(slug: string): Promise<TenantResponse> {
    const tenant = await db
      .select()
      .from(tenantTable)
      .where(eq(tenantTable.slug, slug))
      .limit(1)
      .then((res) => res[0]);
    return {
      id: tenant.id,
      name: tenant.name,
      slug: tenant.slug,
      status: tenant.status,
      type: tenant.type,
      createdBy: tenant.createdBy,
      createdAt: tenant.createdAt.toISOString(),
      onboardedAt: tenant.onboardedAt ? tenant.onboardedAt.toISOString() : null,
      updatedAt: tenant.updatedAt.toISOString(),
    };
  }

  static async getTenantById(id: string): Promise<TenantResponse> {
    const tenant = await db
      .select()
      .from(tenantTable)
      .where(eq(tenantTable.id, id))
      .limit(1)
      .then((res) => res[0]);
    return {
      id: tenant.id,
      name: tenant.name,
      slug: tenant.slug,
      status: tenant.status,
      type: tenant.type,
      createdBy: tenant.createdBy,
      createdAt: tenant.createdAt.toISOString(),
      onboardedAt: tenant.onboardedAt ? tenant.onboardedAt.toISOString() : null,
      updatedAt: tenant.updatedAt.toISOString(),
    };
  }
}
