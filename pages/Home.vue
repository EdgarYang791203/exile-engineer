<template>
  <div w="full">
    <div py="4" flex="~ col justify-center" class="custom-container">
      <Chapter
        v-for="chapter in chapterList"
        :key="chapter.chapterId"
        :chapter="chapter"
        :doneList="doneList"
        @checkAll="checkAll"
        @handleCheck="handleCheck"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Chapter from "@/components/Chapter.vue";

const initialStore = useInitailStore();
const { fetchTasks } = initialStore;
const { tasks } = storeToRefs(initialStore);

useSeoMeta({
  title: "流亡工程師(Exile engineer) POE 拓荒",
  ogTitle: "流亡工程師(Exile engineer) POE 拓荒",
  description: "拓荒 speedrun Exile engineer",
  ogDescription: "拓荒 speedrun Exile engineer",
  googleSiteVerification: "9SF0DnY0VkwDUx0m43hTCwoEDRdIhlaDiW8IhREz6xw",
});

const cookie = useCookie("doneList");

let doneList = ref([]);

const saveDoneList = () => {
  cookie.value = doneList.value.join(",");
};

const chapterList = ref([]);

watchEffect(() => {
  if (tasks.value.length) {
    chapterList.value = tasks.value;
  }
});

const handleCheck = (taskName: string) => {
  if (doneList.value.includes(taskName)) {
    doneList.value = doneList.value.filter((item) => item !== taskName);
  } else {
    doneList.value.push(taskName);
  }
  saveDoneList();
};

const checkAll = (chapterId: number) => {
  if (!chapterList.value.length) return;
  const chapterRef = chapterList.value.find((ch) => ch.chapterId === chapterId);
  if (chapterRef && chapterRef.checkList) {
    const selectName = `一鍵全選${chapterId}`;

    const haveDone = doneList.value.includes(selectName);

    const names = chapterRef.checkList.map((task) => task.name);

    if (haveDone) {
      doneList.value = doneList.value.filter((item) => !names.includes(item));
    } else {
      doneList.value = doneList.value.concat(names);
    }

    saveDoneList();
  }
};

onMounted(async () => {
  await fetchTasks();
  if (cookie?.value) {
    const saveData = cookie.value.split(",");
    doneList.value = saveData;
  }
});
</script>

<style scoped></style>
