import { defineStore } from "pinia";
import type { Chapter } from "~/types";

type Copyright = {
  title: string;
  link: string;
  textClass: string;
};

type Ascendancy = {
  title: string;
  id: string;
  img: string;
};

type Job = {
  title: string;
  code: string;
  ascendancy: Ascendancy[];
};

type Build = {
  [key: string]: {
    chapter: string;
    content: { title: string; tagClasses: string }[];
    memo?: string[];
    images?: any[];
  }[];
};

type Branch = {
  builds: Build | [];
  jobs: Job[] | [];
  tasks: Chapter[] | [];
  copyright: Copyright[] | [];
};

export const useInitailStore = defineStore("initial", () => {
  const branchData = ref<Branch>({
    builds: [],
    jobs: [],
    tasks: [],
    copyright: [],
  });

  const builds = computed(() => branchData.value.builds);

  const jobs = computed(() => branchData.value.jobs);

  const copyright = computed(() => {
    if (branchData.value.copyright) {
      return branchData.value.copyright;
    }
    return [];
  });

  const setBranchData = (data: Branch) => {
    branchData.value = data;
  };

  const tasks = computed(() => {
    if (branchData.value.tasks) {
      return fotmatTasks(branchData.value.tasks);
    }
    return [];
  });

  return {
    branchData,
    tasks,
    builds,
    jobs,
    copyright,
    setBranchData,
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
