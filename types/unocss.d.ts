import "@unocss/nuxt";

declare module "@nuxt/schema" {
  interface NuxtConfig {
    unocss?: {
      nuxtLayers?: boolean;
      presets?: any[];
      shortcuts?: Record<string, string>;
      rules?: [string, string][];
      theme?: Record<string, any>;
      transformers?: any[];
    };
  }
}
