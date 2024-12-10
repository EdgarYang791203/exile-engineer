<template>
  <ul flex="~ 1 items-center justify-center" w="9/12">
    <li v-for="page in menu" :key="page.name">
      <NuxtLink
        :to="page.href"
        class="link block p-3 text-2xl font-bold text-[#222] hover:text-[tomato]"
        :class="[
          `${page.href === onRoutes ? 'md:text-yellow-500' : 'md:text-white'}`,
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
defineProps<{ onRoutes: string }>();

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
  {
    href: "",
    name: "寶石",
    enable: false,
  },
  {
    href: "",
    name: "任務",
    enable: false,
  },
  {
    href: "",
    name: "詞綴 ",
    enable: false,
  },
  {
    href: "",
    name: "地圖 ",
    enable: false,
  },
  {
    href: "/Tools",
    name: "工具 ",
    enable: true,
  },
]);
</script>

<style scoped></style>
