// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://jacopen.wells.jp",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    icon(),
    sanity({
      projectId: "wza0icfm",
      dataset: "production",
      useCdn: true,
    }),
  ],
});
