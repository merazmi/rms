import { relations } from "drizzle-orm";
import {
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { tenantTable } from "./tenant";

export const tenantStaffRole = ["owner", "staff"] as const;

export const tenantStaffRoleEnum = pgEnum("tenant_staff_role", tenantStaffRole);

export const tenantStaffTable = pgTable(
  "tenant_staff",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenantTable.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .unique()
      .references(() => user.id, { onDelete: "cascade" }),
    role: tenantStaffRoleEnum("role").notNull().default("staff"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("tenant_staff_tenantId_idx").on(table.tenantId)]
);

export const tenantStaffRelations = relations(tenantStaffTable, ({ one }) => ({
  user: one(user, {
    fields: [tenantStaffTable.userId],
    references: [user.id],
  }),
  tenant: one(tenantTable, {
    fields: [tenantStaffTable.tenantId],
    references: [tenantTable.id],
  }),
}));
