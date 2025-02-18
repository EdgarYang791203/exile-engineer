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
          @click="handleMobileMenu"
          class="i-prime-align-left text-white text-2xl mx-3 lg:hidden"
        ></button>
        <img
          src="~/assets/images/logo.webp"
          alt="logo"
          class="w-[48px] h-[48px]"
        />
      </div>
      <Navbar
        :onRoutes="onRoutes"
        :mobileMenuOpen="true"
        v-if="!isScreenSM && initialized"
      />
      <PositionSelect v-if="onRoutes === '/'" />
    </div>
    <Navbar
      :onRoutes="onRoutes"
      :mobileMenuOpen="mobileMenuOpen"
      @handleMobileMenu="handleMobileMenu"
      v-if="isScreenSM"
    />
  </header>
</template>

<script lang="ts" setup>
import CanvasBg from "../CanvasBg.vue";
import Navbar from "../Navbar.vue";
import PositionSelect from "../PositionSelect.vue";

defineProps<{ isScreenSM: boolean }>();

const initialized = ref(false);

const mobileMenuOpen = ref(false);

const handleMobileMenu = () => {
  if (mobileMenuOpen.value) {
    mobileMenuOpen.value = false;
  } else {
    mobileMenuOpen.value = true;
  }
};

const routes = useRoute();

const onRoutes = computed(() => {
  return routes.path;
});

onMounted(() => {
  initialized.value = true;
});
</script>

<style lang="scss" scoped></style>
