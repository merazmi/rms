"server-only";

import slugify from "slugify";
import { headers as getHeaders } from "next/headers";
import { db } from "@/db/drizzle";
import { tenantTable } from "@/db/schema/tenant";
import { eq } from "drizzle-orm";

export async function getHeadersAsObject(): Promise<Record<string, string>> {
  return Object.fromEntries(await getHeaders());
}

export async function generateUniqueSlug(name: string): Promise<string> {
  // Step 1: create a base slug
  const baseSlug = slugify(name, { lower: true, strict: true });

  let slug = baseSlug;
  let counter = 1;

  // Step 2: loop until unique slug found
  while (true) {
    const existing = await db
      .select()
      .from(tenantTable)
      .where(eq(tenantTable.slug, slug))
      .limit(1);

    if (!existing) {
      // slug is unique
      return slug;
    }

    // slug exists → append counter
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}
