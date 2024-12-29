import { defineStore } from "pinia";
import type { Chapter } from "~/types";

export const useInitailStore = defineStore("initial", () => {
  const config = useRuntimeConfig();

  const { jsonStorageUrl } = config.public;

  const tasks = ref([]);

  const fetchTasks = async () => {
    const res = await fetch(jsonStorageUrl); //"http://localhost:3001/tasks"
    const data = await res.json();
    if (data.tasks) {
      tasks.value = fotmatTasks(data.tasks);
    }
  };

  return {
    tasks,
    fetchTasks,
  };
});

function fotmatTasks(list: Chapter[]) {
  if (!list || !list.length) return [];
  const result = list.map((item, index) => {
    const { title, titleTag, titleClass, content, memo } = item;
    const chapterId = index + 1;
    const checkList = content.map((task: string, cIndex: number) => ({
      id: 100 * chapterId + cIndex,
      name: `${title}_${cIndex}`,
      text: task,
      textTag: "label",
      textClass: "text-left text-xl cursor-pointer text-green-500",
    }));
    const checkbox = {
      id: chapterId,
      name: `一鍵全選${chapterId}`,
      text: "一鍵全選",
      textTag: "label",
      textClass: "text-left text-xl cursor-pointer text-yellow-500",
    };
    checkList.unshift(checkbox);
    return {
      chapterId,
      title,
      titleTag,
      titleClass,
      checkList,
      memo: memo ? memo : [],
    };
  });
  return result;
}
