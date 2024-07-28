<template>
  <div class="w-full">
    <div class="py-4 flex flex-col justify-center max-w-[1024px] mx-auto">
      <div v-for="chapter in showlist" :key="chapter.chapterId">
        <h2 class="mt-5 text-center text-3xl font-bold text-[#af6025]">
          {{ chapter.title }}
        </h2>
        <div v-if="chapter.checkList && chapter.checkList.length">
          <div
            v-for="(checkItem, index) in chapter.checkList"
            :data-active="'active_' + checkItem.id"
            class="flex items-center"
            :key="checkItem.id"
          >
            <span class="w-12 text-right text-white">
              {{ index ? `${chapter.chapterId}-${index}` : "---" }}
            </span>
            <input
              class="mx-2"
              type="checkbox"
              :name="checkItem.name"
              :id="checkItem.id"
              @change="
                index === 0
                  ? checkAll(chapter.chapterId)
                  : handleCheck(checkItem.name)
              "
              :checked="isChecked(checkItem.name)"
            />
            <label
              class="cursor-pointer text-left text-xl"
              :class="index ? 'text-green-500' : 'text-yellow-500'"
              :for="checkItem.id"
              :style="{
                opacity: isChecked(checkItem.name) ? 0.2 : 1,
                textDecorationLine: isChecked(checkItem.name)
                  ? 'line-through'
                  : 'none',
              }"
            >
              {{ checkItem.text }}
            </label>
          </div>
        </div>
        <div class="pt-3" v-if="chapter.memo && chapter.memo.length">
          <p
            v-for="(tip, index) in chapter.memo"
            :key="`${tip.hashtag}-${index}`"
            class="text-center"
          >
            <span class="text-yellow-500">{{ tip.hashtag }}</span>
            <span>{{ tip.text }}</span>
            <img class="max-w-[50%] block mx-auto" :src="tip.img" alt="tip" />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { tasks } from "~/assets/tasks.json";

useSeoMeta({
  title: "Exile engineer POE 拓荒",
  description: "拓荒 speedrun Exile engineer",
  ogDescription:
    "拓荒 speedrun Exile engineer (感謝各位 poe 社群 you'll the best)",
  ogTitle: "POE 拓荒完成打勾",
});

const cookie = useCookie("doneList");

let showlist: any[] = reactive([]);

let doneList = ref([]);

const saveDoneList = () => {
  cookie.value = doneList.value.join(",");
};

const initialList = () => {
  if (tasks && tasks.length) {
    const list = tasks.map((item, index) => {
      const { title, content, memo } = item;
      const chapterId = index + 1;
      const checkList = content.map((checkItem, cIndex) => ({
        id: 10 * index + cIndex + 1,
        name: `${title}_${cIndex}`,
        text: checkItem,
      }));
      const checkbox = {
        id: 10 * index,
        name: `一鍵全選${index}`,
        text: "一鍵全選",
      };
      checkList.unshift(checkbox);
      return { chapterId, title, checkList, memo: memo ? memo : [] };
    });
    if (list && list.length) {
      showlist = list;
    }
  }
};

const isChecked = (name: string) => {
  return doneList.value.includes(name);
};

const checkAll = (chapter: number) => {
  const chapterRef = showlist[chapter - 1];
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

const handleCheck = (taskName: string) => {
  if (doneList.value.includes(taskName)) {
    doneList.value = doneList.value.filter((item) => item !== taskName);
  } else {
    doneList.value.push(taskName);
  }
  saveDoneList();
};

initialList();

onMounted(() => {
  if (cookie?.value) {
    const saveData = cookie.value.split(",");
    doneList.value = saveData;
  }
});
</script>

<style scoped></style>
