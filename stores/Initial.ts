import { defineStore } from "pinia";
import { tasks } from "~/assets/tasks.json";

export const useInitailStore = defineStore("initial", () => {
  const chapters = computed(() => tasks);

  return {
    chapters,
  };
});
