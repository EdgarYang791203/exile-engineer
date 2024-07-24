<template>
  <ul className="flex-1 flex w-9/12 items-center justify-center">
    <li v-for="page in menu" :key="page.name">
      <NuxtLink
        :to="page.href"
        class="link block p-3 text-2xl font-bold text-[#222] md:text-white hover:text-[tomato]"
        :class="{
          'router-link-active': page.href === onRoutes,
          disabled: !page.enable,
        }"
      >
        <span class="font-pop">{{ page.name }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
const route = useRoute();
const onRoutes = computed(() => {
  return route.path;
});

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
    href: "/",
    name: "輿圖轉型",
    enable: true,
  },
  {
    href: "/",
    name: "輿圖天賦",
    enable: true,
  },
  {
    href: "/",
    name: "寶石",
    enable: false,
  },
  {
    href: "/",
    name: "任務",
    enable: false,
  },
  {
    href: "/",
    name: "詞綴 ",
    enable: false,
  },
  {
    href: "/",
    name: "地圖 ",
    enable: false,
  },
  {
    href: "/",
    name: "工具 ",
    enable: true,
  },
]);
</script>

<style scoped></style>
