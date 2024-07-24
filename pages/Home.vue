<template>
  <div class="flex flex-col items-center justify-center pt-16">
    <div class="py-4">
      <div v-for="chapter in showlist" :key="chapter.chapterId">
        <h1 class="mt-5 text-center text-3xl font-bold text-[#af6025]">
          {{ chapter.title }}
        </h1>
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
              :for="checkItem.name"
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
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
// import { type CookieRef } from "#app";
import { useCookie } from "#imports";
import { tasks } from "~/assets/tasks.json";

const savedList = useCookie("todoList");

let showlist: any[] = reactive([]);

let doneList = ref([]);

function updateShowList() {
  if (savedList.value) {
    try {
      showlist.splice(0, showlist.length, ...JSON.parse(savedList.value));
    } catch (error) {
      console.error("Failed to parse savedList:", error);
      showlist.splice(0, showlist.length);
    }
  } else {
    showlist.splice(0, showlist.length);
  }
}

const initialList = () => {
  if (tasks && tasks.length) {
    const list = tasks.map((item, index) => {
      const { title, content } = item;
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
      return { chapterId, title, checkList };
    });
    if (list && list.length) showlist = list;
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
  }
};

const handleCheck = (taskName: string) => {
  if (doneList.value.includes(taskName)) {
    doneList.value = doneList.value.filter((item) => item !== taskName);
  } else {
    doneList.value.push(taskName);
  }
};

if (savedList.value) {
  try {
    showlist = JSON.parse(savedList.value);
    updateShowList();
  } catch (error) {
    initialList();
  }
} else {
  initialList();
}
</script>

<style scoped></style>
