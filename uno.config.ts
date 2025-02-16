import {
  defineConfig,
  presetWind,
  presetAttributify,
  presetIcons,
  presetTypography,
  // presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import colors from "tailwindcss/colors";

export default defineConfig({
  shortcuts: {
    // 自定義快捷方式（如需要）
    arrow: "border-0 absolute top-[50%] w-[48px] h-[48px] z-10 bg-transparent",
    "custom-container": "w-full max-w-[1024px] mx-auto",
  },
  rules: [
    [
      "line-through-opacity",
      { "text-decoration-line": "line-through", opacity: "0.2" },
    ],
  ],
  theme: {
    extend: {
      fontFamily: {
        pop: ["pop", "sans-serif"],
      },
      breakpoints: {
        sm: "768px",
        md: "1024px",
        lg: "1200px",
        xl: "1920px",
      },
    },
    colors: {
      red: colors.red,
    },
  },
  presets: [
    // presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      collections: {
        prime: () =>
          import("@iconify-json/prime/icons.json").then((i) => i.default),
      },
    }),
    presetTypography(),
    presetWind(),
  ],
  preflights: [
    {
      getCSS: () => ``,
    },
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
