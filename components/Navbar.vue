<template>
  <ul
    flex="1 items-center justify-center col lg:row"
    w="full lg:9/12"
    class="overflow-hidden transition-all duration-300 ease-in-out flex"
    :class="{
      'h-0 opacity-0 hidden lg:opacity-100 lg:h-auto lg:flex': !mobileMenuOpen,
      'h-[300px] lg:h-auto opacity-100': mobileMenuOpen,
    }"
  >
    <li v-for="page in menu" :key="page.name">
      <NuxtLink
        :to="page.href"
        class="link block p-3 text-2xl font-bold hover:text-[tomato]"
        :class="[
          `${page.href === onRoutes ? 'text-yellow-500' : 'text-white'}`,
          {
            disabled: !page.enable,
          },
        ]"
      >
        <span class="font-pop">{{ page.name }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
defineProps<{ onRoutes: string; mobileMenuOpen?: boolean }>();

const menu = ref([
  {
    href: "/",
    name: "首頁",
    enable: true,
  },
  {
    href: "/Build",
    name: "拓荒流派",
    enable: true,
  },
  {
    href: "",
    name: "流派轉型",
    enable: false,
  },
  {
    href: "/AtlasPassive",
    name: "輿圖天賦",
    enable: true,
  },
  // {
  //   href: "",
  //   name: "寶石",
  //   enable: false,
  // },
  // {
  //   href: "",
  //   name: "任務",
  //   enable: false,
  // },
  // {
  //   href: "",
  //   name: "詞綴 ",
  //   enable: false,
  // },
  // {
  //   href: "",
  //   name: "地圖 ",
  //   enable: false,
  // },
  {
    href: "/Tools",
    name: "工具 ",
    enable: true,
  },
]);
</script>

<style scoped></style>
