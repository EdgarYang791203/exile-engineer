<template>
  <header
    class="sticky top-0 z-10 rounded-b-lg overflow-hidden"
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
      <CanvasBg />
    </ClientOnly>
    <div
      class="w-full items-center py-2 lg:py-[3px]"
      flex="~ items-center justify-between lg:justify-center"
    >
      <div class="flex items-center lg:block">
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="i-prime-align-left text-white text-2xl mr-3 lg:hidden"
        ></button>
        <img
          src="~/assets/images/logo.webp"
          alt="logo"
          class="w-[48px] h-[48px]"
        />
      </div>
      <Navbar :onRoutes="onRoutes" v-if="!isScreenSM" />
      <PositionSelect v-if="onRoutes === '/'" />
    </div>
    <Navbar
      :onRoutes="onRoutes"
      :mobileMenuOpen="mobileMenuOpen"
      v-if="isScreenSM"
    />
  </header>
</template>

<script lang="ts" setup>
import CanvasBg from "../CanvasBg.vue";
import Navbar from "../Navbar.vue";
import PositionSelect from "../PositionSelect.vue";

defineProps<{ isScreenSM: boolean }>();

const mobileMenuOpen = ref(false);

const routes = useRoute();

const onRoutes = computed(() => {
  return routes.path;
});
</script>

<style lang="scss" scoped></style>
