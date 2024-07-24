<template>
  <div class="h-full w-full">
    <h1 className="h-auto w-full py-4 text-center text-2xl text-yellow-300">
      卡葛爾拓荒者 3.25
    </h1>
    <!-- TODO: 章節選擇 -->
    <div className="flex flex-wrap justify-center py-5">
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
    <div className="container mx-auto flex flex-wrap">
      <div class="flex-1">
        <h2 className="text-center text-xl text-green-400">毒藥(追獵)</h2>
        <h2 className="text-xl text-yellow-500">{{ chapterActive }}</h2>
      </div>
      <div class="flex-1">
        <h2 className="text-center text-xl text-green-400">
          赦免轉鑄影(死靈 or 守護者)
        </h2>
        <h2 className="text-xl text-yellow-500">{{ chapterActive }}</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
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
  if (cookie) chapterActive.value = cookie.value;
});
</script>

<style scoped></style>
