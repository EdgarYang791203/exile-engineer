<template>
  <div class="w-full min-h-screen relative">
    <div
      class="fixed left-0 top-0 w-full h-full z-[-2] bg-main bg-cover brightness-[0.3]"
      style="background-position-y: 64px"
    ></div>
    <Header :isScreenSM="isScreenSM" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed } from "vue";

let screen: { width: number } = reactive({ width: 0 });

const getWidth = () => {
  screen.width = window.innerWidth || document.documentElement.clientWidth;
};

const isScreenSM = computed(() => {
  if (screen && screen.width) return screen.width <= 768;
  return false;
});

onMounted(() => {
  window.addEventListener("resize", getWidth);
});
</script>

<style scoped></style>
