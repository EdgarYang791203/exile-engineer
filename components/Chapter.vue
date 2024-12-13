<template>
  <div>
    <component
      :is="chapter.titleTag"
      :class="chapter.titleClass"
      :id="`Act-${chapter.chapterId}`"
    >
      {{ chapter.title }}
    </component>
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
        <component
          :is="checkItem.textTag"
          :class="[
            checkItem.textClass,
            index ? 'text-green-500' : 'text-yellow-500',
            { 'line-through-opacity': isChecked(checkItem.name) },
          ]"
          :for="checkItem.id.toString()"
        >
          {{ checkItem.text }}
        </component>
      </div>
    </div>
    <div pt="3" v-if="chapter.memo && chapter.memo.length">
      <Memo
        v-for="(memoItem, index) in chapter.memo"
        :key="`tip${chapter.chapterId}-${index}`"
        :memoItem="memoItem"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Chapter } from "~/types";
import Memo from "~/components/Memo.vue";

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
