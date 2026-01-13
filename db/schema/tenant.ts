import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const tenantStatus = ["active", "suspended", "archived"] as const;
export const tenantStatusEnum = pgEnum("tenant_status", tenantStatus);

export const tenantType = ["customer", "demo", "internal"] as const;
export const tenantTypeEnum = pgEnum("tenant_type", tenantType);

export const tenantTable = pgTable("tenant", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  status: tenantStatusEnum("status").notNull().default("active"),
  type: tenantTypeEnum("type").notNull().default("customer"),
  onboardedAt: timestamp("onboarded_at"),
  createdBy: text("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  archivedAt: timestamp("archived_at"),
});
