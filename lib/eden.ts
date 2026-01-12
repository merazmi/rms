import { treaty } from "@elysiajs/eden";
import { app } from "../app/platform/api/[[...slugs]]/route";

// .api to enter /api prefix
export const api =
  typeof process !== "undefined" && typeof window === "undefined"
    ? treaty(app)
    : treaty<typeof app>(process.env.DOMAIN_HOST_WITH_PORT || "", {
        fetch: { credentials: "include" },
      });
