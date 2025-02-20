<template>
  <!-- class="w-full min-h-screen relative" -->
  <div w="full" min-h="screen" position="relative">
    <div
      position="fixed top-0 left-0 z-[-2]"
      w="full"
      h="full"
      class="bg-main bg-cover brightness-[0.3]"
      style="background-position-y: 64px"
    ></div>
    <Header :isScreenSM="isScreenSM" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { Chapter } from "~/types";

const initialStore = useInitailStore();
const { setBranchData } = initialStore;

const screen = ref<{ width: number }>({ width: 0 });

const getWidth = () => {
  screen.value.width =
    window.innerWidth || document.documentElement.clientWidth;
};

const isScreenSM = computed(() => {
  if (screen.value && screen.value.width) return screen.value.width <= 1024;
  return false;
});

const config = useRuntimeConfig();

const { jsonStorageUrl } = config.public;

type Copyright = {
  title: string;
  link: string;
  textClass: string;
};

interface DataResponse {
  builds: any;
  jobs: any[];
  tasks: Chapter[];
  copyright: Copyright[];
}

if (!import.meta.env.SSR) {
  const { data: branch, error } = await useLazyAsyncData("webInitial", () =>
    $fetch(jsonStorageUrl)
  );

  watchEffect(() => {
    if (branch.value) {
      setBranchData(branch.value as DataResponse);
    }
  });
}

onMounted(() => {
  getWidth();
  window.addEventListener("resize", getWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", getWidth);
});
</script>

<style scoped>
@import "@unocss/reset/normalize.css";
</style>
