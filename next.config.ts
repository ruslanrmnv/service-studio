import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /* Lets src/app/global-not-found.tsx answer addresses that match no route.
       The alternative was moving the root layout out of [lang] so a plain
       not-found.tsx could inherit it — a change to every page on the site in
       order to fix the one page nobody is supposed to reach. This flag is
       scoped to that page and nothing else. */
    globalNotFound: true,
  },
};

export default nextConfig;
