<template>
  <div w="full">
    <div py="4" flex="~ col justify-center" class="custom-container">
      <div v-for="chapter in chapterList" :key="chapter.chapterId">
        <h2
          mt="5"
          text="3xl [#af6025] bold center"
          font="bold"
          :id="`Act-${chapter.chapterId}`"
        >
          {{ chapter.title }}
        </h2>
        <div v-if="chapter.checkList && chapter.checkList.length">
          <div
            v-for="(checkItem, index) in chapter.checkList"
            :data-active="'active_' + checkItem.id"
            flex="~ items-center"
            :key="checkItem.id"
          >
            <span w="12" text="right white">
              {{ index ? `${chapter.chapterId}-${index}` : "---" }}
            </span>
            <input
              mx="2"
              type="checkbox"
              :name="checkItem.name"
              :id="checkItem.id.toString()"
              @change="
                index === 0
                  ? checkAll(chapter.chapterId)
                  : handleCheck(checkItem.name)
              "
              :checked="isChecked(checkItem.name)"
            />
            <label
              text="left xl"
              class="cursor-pointer"
              :class="[
                index ? 'text-green-500' : 'text-yellow-500',
                { 'line-through-opacity': isChecked(checkItem.name) },
              ]"
              :for="checkItem.id.toString()"
            >
              {{ checkItem.text }}
            </label>
          </div>
        </div>
        <div pt="3" v-if="chapter.memo && chapter.memo.length">
          <p
            v-for="(tip, index) in chapter.memo"
            :key="`${tip.hashtag}-${index}`"
            text="center"
          >
            <span text="yellow-500">{{ tip.hashtag }}</span>
            <span>{{ tip.text }}</span>
            <NuxtImg
              max-w="50%"
              block
              mx="auto"
              :src="tip.img"
              alt="tip"
              loading="lazy"
            />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Chapter {
  title: string;
  content: string[];
  chapterId?: number;
  checkList?: { id: number; name: string; text: string }[];
  memo?: { hashtag: string; text: string; img?: string }[];
}

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

const fotmatTasks = (list: Chapter[]) => {
  if (!list || !list.length) return [];
  const result = list.map((item, index) => {
    const { title, content, memo } = item;
    const chapterId = index + 1;
    const checkList = content.map((checkItem: any, cIndex: number) => ({
      id: 100 * cIndex + 1,
      name: `${title}_${cIndex}`,
      text: checkItem,
    }));
    const checkbox = {
      id: 100 * 0,
      name: `一鍵全選0`,
      text: "一鍵全選",
    };
    checkList.unshift(checkbox);
    return { chapterId, title, checkList, memo: memo ? memo : [] };
  });
  return result;
};

const chapterList = computed(() => {
  return fotmatTasks(tasks.value);
});

const handleCheck = (taskName: string) => {
  if (doneList.value.includes(taskName)) {
    doneList.value = doneList.value.filter((item) => item !== taskName);
  } else {
    doneList.value.push(taskName);
  }
  saveDoneList();
};

const isChecked = (name: string) => {
  return doneList.value.includes(name);
};

const checkAll = (chapter: number) => {
  if (!chapterList.value.length) return;
  const chapterRef = chapterList.value.find((ch) => ch.chapterId === chapter);
  if (chapterRef && chapterRef.checkList) {
    const selectName = `一鍵全選${chapter - 1}`;

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
