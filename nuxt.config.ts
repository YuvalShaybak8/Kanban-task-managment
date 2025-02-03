export default defineNuxtConfig({
  ssr: false,

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
      meta: [
        { name: "title", content: "Kanban Task Management" },
        {
          name: "description",
          content: "A powerful Kanban board for managing tasks and projects",
        },
        { property: "og:type", content: "website" },
        { property: "og:title", content: "Kanban Task Management" },
        {
          property: "og:description",
          content: "A powerful Kanban board for managing tasks and projects",
        },
        { property: "og:image", content: "/assets/og-image.jpg" },
        {
          name: "theme-color",
          content: "hsl(220, 69%, 97%)",
          media: "(prefers-color-scheme: light)",
        },
        {
          name: "theme-color",
          content: "hsl(235, 17%, 15%)",
          media: "(prefers-color-scheme: dark)",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/K_logo.svg",
        },
        {
          rel: "preload",
          as: "font",
          href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700&display=swap",
          type: "font/woff2",
          crossorigin: "anonymous",
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

  routeRules: {
    "/": { prerender: true },
  },

  experimental: {
    componentIslands: true,
  },

  typescript: {
    typeCheck: false,
    strict: false,
  },

  nitro: {
    logLevel: 0,
  },

  vite: {
    logLevel: "error",
    optimizeDeps: {
      exclude: ["#app-manifest"],
    },
  },

  ignore: ["**/.DS_Store", "components/ui/**/*.vue/index"],

  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
});
