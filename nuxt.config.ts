// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      viewport: "width=device-width,initial-scale=1.0",
      title: "流亡工程師(Exile engineer) POE 拓荒",
      meta: [
        {
          name: "description",
          content: "拓荒 speedrun Exile engineer",
        },
        {
          property: "og:title",
          content: "流亡工程師(Exile engineer) POE 拓荒",
        },
        { property: "og:url", content: "https://exile-engineer.vercel.app/" },
        {
          property: "og:description",
          content: "拓荒 speedrun Exile engineer",
        },
        {
          name: "google-site-verification",
          content: "9SF0DnY0VkwDUx0m43hTCwoEDRdIhlaDiW8IhREz6xw",
        },
      ],
      link: [
        {
          rel: "canonical",
          href: "https://exile-engineer.vercel.app/",
        },
      ],
      script: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://exile-engineer.vercel.app/",
            name: "POE 拓荒攻略季初更新",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://exile-engineer.vercel.app/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        },
      ],
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
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
  modules: ["@pinia/nuxt", "@nuxt/image", "@unocss/nuxt"],
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
  runtimeConfig: {
    public: {
      jsonStorageUrl: process.env.NUXT_PUBLIC_JSON_URL,
    },
  },
  vite: {
    resolve: {
      alias: {
        "@assets": "~/assets",
      },
    },
    server: {
      watch: {
        usePolling: true, // 在某些 Docker 和文件系統配置中，這可以幫助改善文件變化檢測
      },
      proxy: {
        "/db.json": {
          target: "https://json-storage-110b6.web.app",
          changeOrigin: true,
        },
      },
    },
  },
  css: [
    "~/assets/css/main.css", // 如果你仍有自定義 CSS 文件
    "@unocss/reset/tailwind-compat.css",
  ],
  unocss: {
    nuxtLayers: true,
  },
});
