// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      viewport: "width=device-width,initial-scale=1.0",
      title: "POE 拓荒攻略季初更新",
      meta: [
        {
          name: "description",
          content:
            "Exile engineer is a POE game walkthrough website(一個自用的 POE 攻略站)",
        },
        { property: "og:title", content: "POE 拓荒攻略季初更新" },
        { property: "og:url", content: "https://exile-engineer.vercel.app/" },
        {
          property: "og:description",
          content:
            "Exile engineer is a POE game walkthrough website(一個自用的 POE 攻略站)",
        },
      ],
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  //TS支援
  typescript: {
    strict: false,
    typeCheck: true,
  },
  //鉤子
  hooks: {
    //改路由
    "pages:extend"(_Pages) {
      _Pages.push({
        name: "首頁",
        path: "/",
        file: "~/pages/Home.vue",
      });
    },
  },
  modules: ["@pinia/nuxt", "@nuxt/image"],
  imports: {
    dirs: ["stores"],
  },
  components: {
    dirs: [
      {
        path: "~/components/global/",
        global: true,
      },
    ],
  },
  vite: {
    resolve: {
      alias: {
        "@assets": "~/assets",
      },
    },
  },
});
