<template>
  <div class="pr-3 text-[#222]">
    <label class="text-white" for="chapterSelect">章節定位：</label>
    <select
      name="chapterSelect"
      id="chapterSelect"
      @change="handleSelect($event)"
    >
      <option value="">最頂部</option>
      <option v-for="chapter in showchapters" :value="chapter.value">
        {{ chapter.title }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
const initialStore = useInitailStore();
const { tasks } = storeToRefs(initialStore);

const showchapters = computed(() => {
  if (tasks?.value.length) {
    return tasks.value.map((chapter, index) => ({
      title: chapter.title,
      value: `Act-${index + 1}`,
    }));
  }
  return [];
});

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
