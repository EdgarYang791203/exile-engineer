<template>
  <div class="w-full min-h-screen relative">
    <div
      class="fixed left-0 top-0 w-full h-full z-[-2] bg-main bg-cover bg-center brightness-[0.3]"
    ></div>
    <Header :isScreenSM="isScreenSM" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

let screen = reactive({});

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
