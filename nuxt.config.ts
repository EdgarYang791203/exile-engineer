// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
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
		'pages:extend'(_Pages) {
			_Pages.push({
				name: '首頁',
				path: '/',
				file: '~/pages/Home.vue',
			});
		},
	},
  // modules: {
  //   '@pinia/nuxt',
  // },
  components: {
		dirs: [
			{
				path: '~/components/global/',
				global: true,
			},
		],
	},
})
