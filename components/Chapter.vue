<template>
  <div>
    <h2 :class="chapter.titleClass" :id="`Act-${chapter.chapterId}`">
      {{ chapter.title }}
    </h2>
    <div v-if="chapter.checkList && chapter.checkList.length">
      <div
        v-for="(checkItem, index) in chapter.checkList"
        :data-active="'active_' + checkItem.id"
        flex="~ items-center"
        :key="checkItem.id"
      >
        <span w="12" text="right white">
          {{ index ? `${chapter.chapterId}-${index}` : "---" }}
        </span>
        <input
          mx="2"
          type="checkbox"
          :name="checkItem.name"
          :id="checkItem.id.toString()"
          @change="
            index === 0
              ? emit('checkAll', checkItem.id)
              : emit('handleCheck', checkItem.name)
          "
          :checked="isChecked(checkItem.name)"
        />
        <label
          text="left xl"
          class="cursor-pointer"
          :class="[
            index ? 'text-green-500' : 'text-yellow-500',
            { 'line-through-opacity': isChecked(checkItem.name) },
          ]"
          :for="checkItem.id.toString()"
        >
          {{ checkItem.text }}
        </label>
      </div>
    </div>
    <div pt="3" v-if="chapter.memo && chapter.memo.length">
      <p
        v-for="(tip, index) in chapter.memo"
        :key="`${tip.hashtag}-${index}`"
        text="center"
      >
        <span :class="tip.hashtagClass">{{ tip.hashtag }}</span>
        <span>{{ tip.text }}</span>
        <NuxtImg
          v-if="tip.img"
          max-w="50%"
          block
          mx="auto"
          :src="tip.img"
          alt="tip"
          loading="lazy"
        />
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Chapter } from "~/types";

const props = defineProps<{
  chapter: Chapter;
  doneList: string[];
}>();

const emit = defineEmits(["checkAll", "handleCheck"]);

const isChecked = (name: string) => {
  return props.doneList.includes(name);
};
</script>

<style scoped></style>
