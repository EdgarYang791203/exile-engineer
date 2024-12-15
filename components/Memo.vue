<template>
  <component :is="memoItem.memoTag" :class="memoItem.memoClass">
    <span :class="memoItem.hashtagClass">{{ memoItem.hashtag }}</span>
    <component :is="memoItem.textTag" :class="memoItem.textClass">{{
      memoItem.text
    }}</component>
    <NuxtImg
      v-if="memoItem.img"
      max-w="50%"
      block
      mx="auto"
      :src="memoItem.img"
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
</script>

<style scoped></style>
