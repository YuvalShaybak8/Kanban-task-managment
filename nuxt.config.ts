export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/color-mode",
  ],

  shadcn: {
    prefix: "Ui",
    componentDir: "./components/ui",
  },

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.scss",
  },

  alias: {
    "#app-manifest": "~/.nuxt/app.manifest.mjs",
  },

  app: {
    head: {
      title: "Kanban Task Management",
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/K_logo.svg",
        },
      ],
    },
  },

  colorMode: {
    classPrefix: "",
    classSuffix: "",
  },

  imports: {
    dirs: ["composables/**"],
  },

  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
});
