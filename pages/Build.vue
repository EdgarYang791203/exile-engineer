<template>
  <div class="h-full w-full">
    <div class="flex flex-wrap justify-center">
      <h2 class="w-full text-center text-xl font-bold">職業選擇</h2>
      <!-- TODO: 職業 -->
      <div
        v-for="job in jobs"
        :key="job.code"
        class="flex flex-col items-center p-2 cursor-pointer"
        @click="selectJob(job.code)"
      >
        <NuxtImg
          :src="`/images/jobs/${job.code}.png`"
          alt="jobs"
          class="w-24 h-24"
          :class="{
            'border-yellow-500 border-2': activeJob === job.code,
          }"
        />
        <span
          class="text-white text-xl py-1"
          :class="{
            'text-yellow-500 font-bold': activeJob === job.code,
          }"
        >
          {{ job.title }}
        </span>
      </div>
      <!-- TODO: 昇華 -->
      <h2 class="w-full text-center text-xl font-bold">昇華選擇</h2>
      <div class="flex flex-wrap justify-center">
        <div
          v-for="ascendancy in showAscendancy"
          :key="ascendancy.id"
          class="flex flex-col items-center p-2 cursor-pointer"
          :class="{
            disabled: !checkExist(ascendancy.id),
          }"
          @click="selectAscendancy(ascendancy.id)"
        >
          <NuxtImg
            :src="ascendancy.img"
            alt="ascendancy"
            class="w-24 h-auto"
            :class="{
              'border-yellow-500 border-2': activeAscendancy === ascendancy.id,
            }"
          />
          <span
            class="text-white text-xl py-1"
            :class="{
              'text-yellow-500 font-bold': activeAscendancy === ascendancy.id,
            }"
          >
            {{ ascendancy.title }}
          </span>
        </div>
      </div>
    </div>
    <!-- TODO: 章節選擇 -->
    <div class="flex flex-wrap justify-start md:justify-center py-5">
      <span
        v-for="chapter in showchapters"
        :key="chapter.title"
        :class="`cursor-pointer px-5 pb-2 md:pb-0 md:text-2xl ${
          activeChapter === chapter.value ? 'text-yellow-500' : 'text-white'
        }`"
        @click="selectChapter(chapter.value)"
      >
        {{ chapter.title }}
      </span>
    </div>
    <!-- TODO: 章節拓荒 -->
    <div class="container max-w-none xl:max-w-[768px] mx-auto flex flex-wrap">
      <div class="flex-1 p-2">
        <ArticleComponent
          :currentBuild="currentBuild"
          :chapterMemo="chapterMemo"
          :talentImages="talentImages"
          :chapter="activeChapter"
        />
        <div
          class="py-4 text-center text-xl"
          v-if="copyrightData && copyrightData.length"
        >
          <p v-for="item in copyrightData" :key="item.link">
            <NuxtLink
              :to="item.link"
              target="_blank"
              external
              :class="item.textClass"
            >
              {{ item.title }}
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
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

// 從 store 取出資料
const initialStore = useInitailStore();
const jobs = toRefs(initialStore).jobs as Ref<Job[]>;
const builds = toRefs(initialStore).builds as Ref<any[]>;
const copyright = toRefs(initialStore).copyright as Ref<Copyright[]>;

// 定義各個狀態
const activeJob = ref("");
const activeAscendancy = ref("");
const activeChapter = ref("");

// 使用 cookie 儲存選擇資料
const cookie = useCookie("selectedData");

// 初始化：若有 cookie，還原選擇資料，否則以 jobs 第一筆資料為預設
onMounted(() => {
  if (cookie.value) {
    try {
      const { job, ascendancy, chapter } = cookie.value as unknown as {
        job: string;
        ascendancy: string;
        chapter?: string;
      };

      activeJob.value = job;
      activeAscendancy.value = ascendancy;
      if (chapter) {
        activeChapter.value = chapter;
      }
    } catch (error) {
      console.error("解析 cookie 失敗", error);
    }
  } else {
    activeJob.value = "ranger";
  }
});

// 取得目前選擇的 Job 資料
const currentJobData = computed(() => {
  return jobs.value.find((job) => job.code === activeJob.value) || null;
});

// 依據目前 job 取得 ascendancy 清單
const showAscendancy = computed(() => {
  return currentJobData.value ? currentJobData.value.ascendancy : [];
});

// 當 activeJob 改變時，預設選擇第一個 ascendancy
let initializedJob = ref(true);
watch(activeJob, (newVal) => {
  if (initializedJob.value) {
    initializedJob.value = false;
    return;
  }

  if (newVal && showAscendancy.value.length > 0) {
    activeAscendancy.value = showAscendancy.value[0].id;
  }
});

// 取得目前選擇的 Build 資料
const currentBuild = computed(() => {
  if (
    activeAscendancy.value &&
    builds.value.hasOwnProperty(activeAscendancy.value)
  ) {
    return builds.value[activeAscendancy.value];
  }
  return [];
});

// 顯示章節資料
const showchapters = computed(() => {
  if (currentBuild.value && currentBuild.value.length > 0) {
    return currentBuild.value.map((item) => ({
      title: `章節${item.chapter.split(" ")[1]}`,
      value: item.chapter,
    }));
  }
  return [];
});

// 當 activeAscendancy 改變時，預設選擇第一個章節
let initializedAscendancy = ref(true);
watch(activeAscendancy, () => {
  if (initializedAscendancy.value) {
    initializedAscendancy.value = false;
    return;
  }

  if (showchapters.value.length > 0) {
    activeChapter.value = showchapters.value[0].value;
  }
});

// 統一管理 cookie 更新的資料（只存 job 與 ascendancy，chapter 可選）
const selectedData = computed(() => {
  const data: { job: string; ascendancy: string; chapter?: string } = {
    job: activeJob.value,
    ascendancy: activeAscendancy.value,
  };
  if (activeChapter.value) {
    data.chapter = activeChapter.value;
  }
  return data;
});

// 當選擇資料改變時，同步更新 cookie
watch(
  selectedData,
  (newData) => {
    cookie.value = JSON.stringify(newData);
  },
  { deep: true }
);

// 可定義選擇事件，根據需要可直接調用（例如在 template 中）
const selectJob = (jobCode: string) => {
  if (jobCode) {
    activeJob.value = jobCode;
  }
};

const selectAscendancy = (ascendancyId: string) => {
  // 這裡可以根據 builds 存在性做檢查
  if (ascendancyId) {
    activeAscendancy.value = ascendancyId;
  }
};

const copyrightData = computed(() => {
  if (activeAscendancy.value && activeAscendancy.value !== "") {
    return copyright.value[activeAscendancy.value];
  }
  return [];
});

const selectChapter = (chapter: string) => {
  if (chapter) {
    activeChapter.value = chapter;
  }
};

const checkExist = (id: string) => {
  return builds.value.hasOwnProperty(id);
};

const chapterMemo = computed(() => {
  if (
    currentBuild.value &&
    currentBuild.value.length &&
    activeAscendancy.value &&
    activeChapter.value
  ) {
    const target = builds.value[activeAscendancy.value];
    if (target) {
      const chapter = target.find(
        (item) => item.chapter === activeChapter.value
      );
      if (chapter && chapter.memo) return chapter.memo;
    }
  }
  return [];
});

const talentImages = computed(() => {
  if (
    currentBuild.value &&
    currentBuild.value.length &&
    activeAscendancy.value &&
    activeChapter.value
  ) {
    const target = builds.value[activeAscendancy.value];
    if (target) {
      const chapter = target.find(
        (item) => item.chapter === activeChapter.value
      );
      if (chapter && chapter.images) return chapter.images;
    }
  }
  return [];
});
</script>

<style scoped></style>
