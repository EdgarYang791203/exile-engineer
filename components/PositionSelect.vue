<template>
  <div class="pr-3 text-[#222]">
    <label class="text-white" for="chapterSelect">章節定位：</label>
    <select
      name="chapterSelect"
      id="chapterSelect"
      @change="handleSelect($event)"
    >
      <option value="">最頂部</option>
      <option v-for="(chapter, index) in chapters" :value="chapter">
        {{ `章節${index + 1}` }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
const chapters = Array.from({ length: 10 }, (_, i) => `Act-${i + 1}`);

const handleSelect = ($event: any) => {
  const value = $event.target.value;
  scrollLocate(value);
};

const scrollLocate = (location: string) => {
  if (location === "") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const element = document.getElementById(location);
  if (element) {
    const scrollTop = Math.floor(element.offsetTop);
    window.scrollTo({ top: scrollTop - 76, behavior: "smooth" });
  }
};
</script>

<style scoped></style>
