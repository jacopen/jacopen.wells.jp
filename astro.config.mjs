import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { CUSTOM_DOMAIN, BASE_PATH } from "./src/server-constants";
import FeaturedImageDownloader from "./src/integrations/featured-image-downloader";
import PublicNotionCopier from "./src/integrations/public-notion-copier";
import partytown from "@astrojs/partytown";

const getSite = function () {
  if (!process.env.VERCEL_URL) {
    return new URL(BASE_PATH, "http://localhost:3000").toString();
  }

  if (CUSTOM_DOMAIN) {
    return new URL(BASE_PATH, `https://${CUSTOM_DOMAIN}`).toString();
  }

  return new URL(
    BASE_PATH,
    `https://${new URL(process.env.VERCEL_URL).host
      .split(".")
      .slice(1)
      .join(".")}`
  ).toString();
};

export default defineConfig({
  site: getSite(),
  base: BASE_PATH,
  integrations: [
    FeaturedImageDownloader(),
    PublicNotionCopier(),
    tailwind(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  //integrations: [FeaturedImageDownloader(), PublicNotionCopier(), tailwind()],
});
