<template>
  <article class="text-xl text-white">
    <p
      class="p-2"
      v-for="(sentence, index) in contentFormat"
      :key="`${chapter}-${index}`"
    >
      <span
        v-for="(text, textIndex) in sentence.textArray"
        :key="`text-${textIndex}`"
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
    <div class="text-center" v-if="talentImages && talentImages.length">
      <NuxtImg
        class="block mt-4 w-full max-w-[100%] h-auto"
        v-for="img in talentImages"
        :key="img.src"
        :src="getImgUrl(img.src, '/images/map-placeholder.webp')"
        :style="img.style ? img.style : {}"
        alt="talent"
      />
    </div>
  </article>
</template>

<script lang="ts" setup>
const props = defineProps<{
  currentBuild: any[];
  chapterMemo: any[];
  talentImages: any[];
  chapter: string;
  getImgUrl: (src: string, placeholder?: string) => string;
}>();

const contentFormat = computed(() => {
  if (props.currentBuild && props.currentBuild.length && props.chapter) {
    const target = props.currentBuild.find(
      (item) => item.chapter === props.chapter
    );
    if (target && target.content)
      return target.content.map((item) => ({
        ...item,
        textArray: item.text.split(" | "),
        classArray: item.tagClasses.split(" | "),
      }));
  }
  return [];
});
</script>

<style scoped></style>
