import { generateUniqueSlug } from "@/lib/server-utils";
import { NotFoundError } from "elysia";
import { AuthService } from "../auth/auth.service";
import { TenantStaffService } from "../tenant-staff/tenant-staff.service";
import { TenantService } from "../tenant/tenant.service";
import { TenantSignUpBody, TenantSignUpResponse } from "./tenant-auth.model";

export abstract class TenantAuthService {
  static async tenantSignUp(
    body: TenantSignUpBody
  ): Promise<TenantSignUpResponse> {
    const { businessName, email, username, password } = body;

    const data = await AuthService.signUp({
      email,
      password,
      name: username,
      asResponse: false,
    });

    if (!data.user || !data.user.id) {
      throw new NotFoundError("User sign-up failed");
    }

    const slug = await generateUniqueSlug(businessName);

    const tenant = await TenantService.createTenant({
      name: businessName,
      slug,
      createdBy: data.user.id,
    });

    if (!tenant.id) {
      throw new NotFoundError("Tenant creation failed");
    }

    const tenantStaff = await TenantStaffService.createTenantStaff({
      userId: data.user.id,
      tenantId: tenant.id,
      role: "owner",
    });

    if (!tenantStaff.id) {
      throw new NotFoundError("Tenant staff creation failed");
    }

    return {
      user: {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: tenantStaff.role,
      },
      tenant: {
        id: tenant.id,
        name: tenant.name,
        slug: tenant.slug,
      },
    };
  }
}
