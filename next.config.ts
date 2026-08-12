import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withSentryConfig(nextConfig, {
  silent: true,
  // No Sentry auth token is configured, so skip source map upload entirely
  // rather than fail/warn on every build.
  sourcemaps: { disable: true },
});
