<template>
  <component :is="memoItem.memoTag" :class="memoItem.memoClass">
    <span :class="memoItem.hashtagClass">{{ memoItem.hashtag }}</span>
    <component :is="memoItem.textTag" :class="memoItem.textClass">{{
      memoItem.text
    }}</component>
    <NuxtImg
      max-w="50%"
      block
      mx="auto"
      :src="showImage"
      alt="tip"
      loading="lazy"
    />
  </component>
</template>

<script lang="ts" setup>
import type { MemoItem } from "~/types/index";

const props = defineProps<{
  memoItem: MemoItem;
}>();

const { serverImages } = useFirebaseImages();

const showImage = computed(() => {
  if (props.memoItem.img && serverImages.value) {
    const urlArray = serverImages.value[props.memoItem.img];
    if (urlArray) return urlArray[0];
  }
  return "/images/map-placeholder.webp";
});
</script>

<style scoped></style>
