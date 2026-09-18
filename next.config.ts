import type { NextConfig } from "next";

const repoName = "euro-trip";
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(isGithubPages
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
      }
    : {}),
  // Preview / proxy opens the app as 127.0.0.1 while Next serves localhost.
  // Without this, Next 16 returns 403 for /_next chunks and the page never hydrates.
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "*.cursor.sh",
    "*.cursorapi.com",
    "*.ngrok-free.app",
    "*.trycloudflare.com",
  ],
};

export default nextConfig;
