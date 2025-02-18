<template>
  <div>
    <component
      :is="chapter.titleTag"
      :id="`Act-${chapter.chapterId}`"
      :class="[chapter.titleClass]"
    >
      {{ chapter.title }}
    </component>
    <div v-if="chapter.checkList && chapter.checkList.length">
      <div
        v-for="(checkItem, index) in chapter.checkList"
        :data-active="'active_' + checkItem.id"
        flex="~ items-center"
        class="select-text mb-2"
        :key="checkItem.id"
      >
        <span w="8 lg:12" text="right white xs lg:xl">
          {{ index ? `${chapter.chapterId}-${index}` : "---" }}
        </span>
        <input
          mx="2"
          type="checkbox"
          :name="checkItem.name"
          :id="checkItem.id.toString()"
          class="hidden"
          @change="
            index === 0
              ? emit('checkAll', checkItem.id)
              : emit('handleCheck', checkItem.name)
          "
          :checked="isChecked(checkItem.name)"
        />
        <label
          class="w-[18px] h-[18px] border-yellow-500 border-1 rounded-[3px] ml-2 mr-4 inline-block check relative cursor-pointer"
          :class="{
            'bg-transparent border-none checked': isChecked(checkItem.name),
          }"
          :for="checkItem.id.toString()"
        ></label>
        <component
          :is="checkItem.textTag"
          class="select-text text-sm lg:text-xl flex-1 lg:flex-none lg:px-[5px] lg:py-0 pr-[5px] md:pr-0 rounded-[4px] hover:bg-transparent md:hover:bg-gray-800"
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
