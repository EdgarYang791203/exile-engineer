import { defineStore } from "pinia";
// import { tasks } from "~/assets/tasks.json";

export const useInitailStore = defineStore("initial", () => {
  const tasks = ref([]);

  const fetchTasks = async () => {
    const res = await fetch(
      "https://my-json-server.typicode.com/EdgarYang791203/exile-engineer/tasks"
    );
    tasks.value = await res.json();
  };

  return {
    tasks,
    fetchTasks,
  };
});
