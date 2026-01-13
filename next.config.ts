import type { NextConfig } from "next";

// const rootDomain = process.env.DOMAIN_HOST || "localhost";

const nextConfig: NextConfig = {
  typedRoutes: true,
  output: "standalone",
};

export default nextConfig;
