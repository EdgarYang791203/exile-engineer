<template>
  <article class="text-xl text-white">
    <p
      class="p-2"
      v-for="(sentence, index) in chapterContent"
      :key="`${chapter}-${index}`"
    >
      <span
        v-for="(text, textIndex) in sentence.textArray"
        :class="sentence.classArray[textIndex]"
      >
        {{ text }}
      </span>
    </p>
    <div class="mt-2" v-if="chapterMemo && chapterMemo.length">
      <p v-for="(memo, index) in chapterMemo" :key="`${chapter}-${index}`">
        {{ memo }}
      </p>
    </div>
  </article>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{ build: any[]; chapter: string }>(), {
  chapter: "",
});

const chapterContent = computed(() => {
  if (props.build && props.build.length && props.chapter) {
    const target = props.build.find((item) => item.chapter === props.chapter);
    if (target)
      return target.content.map((item) => {
        return {
          ...item,
          textArray: item.text.split(" | "),
          classArray: item.tagClasses.split(" | "),
        };
      });
  }
  return [];
});

const chapterMemo = computed(() => {
  if (props.build && props.build.length && props.chapter) {
    const target = props.build.find((item) => item.chapter === props.chapter);
    if (target) return target.memo;
  }
  return [];
});
</script>

<style scoped></style>
