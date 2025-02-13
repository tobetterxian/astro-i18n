// @ts-check
import { defineConfig } from "astro/config";
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  logLevel: 'debug',
  output: 'hybrid',
  build: {
    format: 'directory',
    inlineStylesheets: 'never',
    minify: false
  },
  trailingSlash: 'always',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    },
    functionPerRoute: false,
    isr: {
      enabled: true,
      expiration: 60
    },
    devMode: true,
    debug: true
  }),
  i18n: {
    defaultLocale: "zh",
    locales: ["zh", "en"],
    routing: {
      prefixDefaultLocale: false
    }
  },
});
