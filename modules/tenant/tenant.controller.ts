import { Elysia } from "elysia";
import { TenantService } from "./tenant.service";
import { TenantDto } from "./tenant.model";

export const tenantController = new Elysia({ prefix: "/tenants" })
  .get("/", async () => await TenantService.listTenants())
  .post("/", async ({ body }) => await TenantService.createTenant(body), {
    body: TenantDto.body,
    auth: true,
  })
  .get(
    "/:slug",
    async ({ params }) => await TenantService.getTenantBySlug(params.slug)
  )
  .put("/:slug", async ({ params, body }) => {
    return { id: params.slug, body };
  });
