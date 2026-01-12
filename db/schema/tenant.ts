import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const tenantTable = pgTable("tenant", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  status: text("status").notNull().default("ACTIVE"),
  type: text("type").notNull().default("CUSTOMER"),
  onboardedAt: timestamp("onboarded_at"),
  createdBy: text("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  archivedAt: timestamp("archived_at"),
});
