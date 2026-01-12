import { t } from "elysia";

export const TenantDto = {
  full: t.Object({
    id: t.String(),
    slug: t.String(),
    name: t.String(),
    status: t.String(),
    type: t.String(),
    createdBy: t.String(),
    createdAt: t.String({ format: "date-time" }),
    onboardedAt: t.Nullable(t.String({ format: "date-time" })),
    updatedAt: t.String({ format: "date-time" }),
  }),
  body: t.Object({
    slug: t.String(),
    name: t.String(),
    type: t.Optional(t.String()),
    status: t.Optional(t.String()),
    createdBy: t.String(),
  }),
};

export type Tenant = typeof TenantDto.full.static;
export type TenantBody = typeof TenantDto.body.static;
