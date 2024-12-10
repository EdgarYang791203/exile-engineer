<template>
  <div class="h-full w-full">
    <h1 class="h-auto w-full py-4 text-center text-2xl text-yellow-300">
      卡葛爾拓荒者 3.25
    </h1>
    <!-- TODO: 章節選擇 -->
    <div class="flex flex-wrap justify-center py-5">
      <span
        v-for="chapter in showchapters"
        :key="chapter.value"
        :class="`cursor-pointer px-5 md:text-2xl ${
          chapterActive === chapter.value ? 'text-yellow-500' : 'text-white'
        }`"
        @click="selectAct(chapter.value)"
      >
        {{ chapter.title }}
      </span>
    </div>
    <!-- TODO: 章節拓荒 -->
    <div class="container mx-auto flex flex-wrap">
      <div class="flex-1 p-2">
        <h2 class="text-center text-xl text-green-400">毒藥(追獵)</h2>
        <h2 class="text-xl text-yellow-500">{{ chapterActive }}</h2>
        <ArticleComponent :build="deadEye" :chapter="chapterActive" />
        <div class="py-4 text-center text-xl text-yellow-500">
          <p>
            <NuxtLink
              to="https://www.youtube.com/watch?v=Ftd9axQuL5wo"
              target="_blank"
              external
            >
              資料來源 Yotuber 賴阿奇
            </NuxtLink>
          </p>
          <p>
            <NuxtLink
              to="https://www.youtube.com/watch?v=gNscxrTy1sM"
              target="_blank"
              external
            >
              資料來源 Yotuber DS 低欸死
            </NuxtLink>
            <NuxtLink
              to="https://pobb.in/FDoOQy-vbM8I"
              target="_blank"
              class="text-green-500"
              external
            >
              POB
            </NuxtLink>
            <NuxtLink
              to="https://www.pathofexile.com/passive-skill-tree/AAAABgIDdjQ_fXVbr6A4UPph6419elPjvj9sf5YPq_cTn237CdN-YqyXBpgjbIzo1oAiJIt7Yfkz_5NQACaVo4r33fUYwuxLyfGK35j_-Ona_roZipaz5ljN6t742-c6s02SDlzuDn-A0W9RR0kPVsl6f896I_bPCsHVx53DOsSiSVIBJCvnRXzGAgahFfAwfLvjF5q0xUV-h3axEQvir-uvvLCSEjBsCJsmJ53_EPba5-pzDgZwk5ldTipbYeITUI_xZKaNvxa_DY0Y7xbCHF-THwS1wO-SgAW1N0xOn0cGGo-klYm3_QFR2WJapHhKffzFAAxyHqA4sQVQ-iYb477e8v_4-wiWs-6p0W-6GgEkhcIL4ozxJ50IlhbC9bEEtS6iwO8="
              target="_blank"
              class="text-blue-500"
              external
            >
              天賦
            </NuxtLink>
          </p>
        </div>
      </div>
      <div class="flex-1 p-2">
        <h2 class="text-center text-xl text-green-400">
          赦免轉鑄影(死靈 or 守護者)
        </h2>
        <h2 class="text-xl text-yellow-500">{{ chapterActive }}</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import deadEye from "~/assets/deadEye";
import { useCookie } from "#imports";

const cookie = useCookie("chapters");

const initialStore = useInitailStore();
const { tasks } = storeToRefs(initialStore);

const showchapters = computed(() => {
  if (tasks?.value.length) {
    return tasks.value.slice(0, 8).map((chapter, index) => ({
      title: chapter.title,
      value: `Act ${index + 1}`,
    }));
  }
  return [];
});

const chapterActive = ref(`Act 1`);

const selectAct = (activeAct: string) => {
  if (activeAct) {
    chapterActive.value = activeAct;
    cookie.value = activeAct;
  }
};

onMounted(() => {
  if (cookie && cookie.value && cookie.value !== "")
    chapterActive.value = cookie.value;
});
</script>

<style scoped></style>
