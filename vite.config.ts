import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { sentryReactRouter, type SentryReactRouterBuildOptions } from '@sentry/react-router';

const sentryConfig: SentryReactRouterBuildOptions = {
  org: "avstormva",
  project: "travel-agency",
  // An auth token is required for uploading source maps.
  authToken: "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"
  // ...
};

export default defineConfig(config => {
  return {
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), sentryReactRouter(sentryConfig, config)],
    ssr: {
      noExternal: [/@syncfusion/]
    }
  }
});
