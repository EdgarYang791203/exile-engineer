<template>
  <div class="h-full w-full">
    <h1 class="h-auto w-full py-4 text-center text-2xl text-yellow-300">
      卡葛爾拓荒者 3.25
    </h1>
    <!-- TODO: 章節選擇 -->
    <div class="flex flex-wrap justify-center py-5">
      <span
        v-for="chapter in chapters"
        :key="chapter"
        :class="`cursor-pointer px-5 md:text-2xl ${
          chapterActive === chapter ? 'text-yellow-500' : 'text-white'
        }`"
        @click="selectAct(chapter)"
      >
        {{ chapter }}
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
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.youtube.com/watch?v=Ftd9axQuL5wo"
            >
              資料來源 Yotuber 賴阿奇
            </a>
          </p>
          <p>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.youtube.com/watch?v=gNscxrTy1sM"
            >
              資料來源 Yotuber DS 低欸死
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://pobb.in/FDoOQy-vbM8I"
              class="text-blue-500"
            >
              POB
            </a>
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

const chapters = Array.from({ length: 8 }, (_, i) => `Act ${i + 1}`);

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
