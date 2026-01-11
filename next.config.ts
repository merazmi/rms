import type { NextConfig } from "next";

const rootDomain = process.env.DOMAIN_HOST || "localhost";

const nextConfig: NextConfig = {
  typedRoutes: true,
  rewrites: async () => ({
    beforeFiles: [
      {
        source: "/:path((?!_next|_static|_vercel|_.well-known|.*\\.\\w+$).*)*",
        has: [
          {
            type: "host",
            value: `(?<tenantSlug>.*).${rootDomain}`,
          },
        ],
        destination: "/:tenantSlug/:path*",
      },
      {
        source: "/:path((?!_next|_static|_vercel|_.well-known|.*\\.\\w+$).*)*",
        has: [
          {
            type: "host",
            value: `${rootDomain}`,
          },
        ],
        destination: "/platform/:path*",
      },
    ],
  }),
};

export default nextConfig;
