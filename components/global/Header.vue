<template>
  <header
    class="sticky top-0 z-10 flex h-16 w-full items-center"
    :style="{
      backgroundImage: `linear-gradient(
        to top,
        lightgrey 0%,
        lightgrey 1%,
        #e0e0e0 26%,
        #efefef 48%,
        #d9d9d9 75%,
        #bcbcbc 100%
      )`,
    }"
  >
    <ClientOnly>
      <CanvasBg v-if="!isScreenSM" />
    </ClientOnly>
    <img src="~/assets/images/logo.png" alt="logo" class="w-[48px] h-[48px]" />
    <Navbar :onRoutes="onRoutes" />
    <PositionSelect v-if="onRoutes === '/'" />
  </header>
</template>

<script lang="ts" setup>
import CanvasBg from "../CanvasBg.vue";
import Navbar from "../Navbar.vue";
import PositionSelect from "../PositionSelect.vue";

defineProps<{ isScreenSM: boolean }>();

const routes = useRoute();

const onRoutes = computed(() => {
  return routes.path;
});
</script>

<style lang="scss" scoped></style>
