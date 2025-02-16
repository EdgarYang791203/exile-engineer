<template>
  <div class="h-full w-full">
    <h1 class="h-auto w-full py-4 text-center text-2xl text-yellow-300">
      卡葛爾拓荒者 3.25
    </h1>
    <div class="flex flex-wrap justify-center">
      <h2 class="w-full text-center text-xl font-bold">職業</h2>
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
      <h2 class="w-full text-center text-xl font-bold">昇華</h2>
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
    <div class="flex flex-wrap justify-center py-5">
      <span
        v-for="chapter in showchapters"
        :key="chapter.title"
        :class="`cursor-pointer px-5 md:text-2xl ${
          activeChapter === chapter.value ? 'text-yellow-500' : 'text-white'
        }`"
        @click="selectAct(chapter.value)"
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
          :chapter="activeChapter"
        />
        <div class="py-4 text-center text-xl" v-if="currentJobData?.copyright">
          <p v-for="item in currentJobData.copyright" :key="item.link">
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
import { ref, onMounted } from "vue";
import deadEye from "~/assets/deadEye";
import champion from "~/assets/champion";
import necromancer from "~/assets/necromancer";

type Job = {
  title: string;
  code: string;
  ascendancy: { title: string; id: string; img: string }[];
  copyright?: { title: string; link: string; textClass: string }[];
};

const activeJob = ref("");

const jobs = ref<Job[]>([
  {
    title: "遊俠",
    code: "ranger",
    copyright: [
      {
        title: "資料來源 Yotuber 賴阿奇",
        link: "https://www.youtube.com/watch?v=Ftd9axQuL5wo",
        textClass: "text-yellow-500",
      },
      {
        title: "資料來源 Yotuber DS 低欸死",
        link: "https://www.youtube.com/watch?v=gNscxrTy1sM",
        textClass: "text-yellow-500",
      },
      {
        title: "POB",
        link: "https://pobb.in/FDoOQy-vbM8I",
        textClass: "text-green-500",
      },
      {
        title: "天賦",
        link: "https://reurl.cc/lNWGzA",
        textClass: "text-blue-500",
      },
    ],
    ascendancy: [
      {
        title: "銳眼",
        id: "deadEye",
        img: "/images/ascendancies/deadeye.png",
      },
      {
        title: "追獵者",
        id: "pathfinder",
        img: "/images/ascendancies/pathfinder.webp",
      },
      {
        title: "守望者",
        id: "warden",
        img: "/images/ascendancies/warden.png",
      },
    ],
  },
  {
    title: "女巫",
    code: "witch",
    ascendancy: [
      {
        title: "死靈師",
        id: "necromancer",
        img: "/images/ascendancies/necromancer.png",
      },
      {
        title: "元素使",
        id: "elementalist",
        img: "/images/ascendancies/elementalist.png",
      },
      {
        title: "秘術家",
        id: "occultist",
        img: "/images/ascendancies/occultist.png",
      },
    ],
  },
  {
    title: "決鬥者",
    code: "duelist",
    ascendancy: [
      {
        title: "冠軍",
        id: "champion",
        img: "/images/ascendancies/champion.png",
      },
      {
        title: "處刑者",
        id: "slayer",
        img: "/images/ascendancies/slayer.png",
      },
      {
        title: "衛士",
        id: "gladiator",
        img: "/images/ascendancies/gladiator.png",
      },
    ],
  },
]);

const selectJob = (jobCode: string) => {
  if (jobCode) {
    activeJob.value = jobCode;
  }
};

const currentJobData = computed<Job | null>(() => {
  if (activeJob.value && activeJob.value !== "" && jobs.value.length) {
    return jobs.value.find((b) => b.code === activeJob.value) || null;
  }
  return null;
});

const showAscendancy = computed(() => {
  const cb = currentJobData?.value;
  if (cb && typeof cb === "object" && "ascendancy" in cb) {
    return (cb as Job).ascendancy;
  }
  return [];
});

const builds = ref({
  deadEye: deadEye,
  champion: champion,
  necromancer: necromancer,
});

const activeAscendancy = ref("");

const checkExist = (id: string) => {
  return builds.value.hasOwnProperty(id);
};

const selectAscendancy = (ascendancyId: string) => {
  const exist = checkExist(ascendancyId);
  if (exist) {
    console.log(ascendancyId);
    activeAscendancy.value = ascendancyId;
  }
};

const currentBuild = computed(() => {
  if (
    activeAscendancy.value &&
    activeAscendancy.value !== "" &&
    builds.value.hasOwnProperty(activeAscendancy.value)
  ) {
    return builds.value[activeAscendancy.value];
  }
  return [];
});

const showchapters = computed(() => {
  if (currentBuild.value && currentBuild.value.length) {
    return currentBuild.value.map((item) => ({
      title: `章節${item.chapter.split(" ")[1]}`,
      value: item.chapter,
    }));
  }
  return [];
});

const activeChapter = ref("");

const selectAct = (activeAct: string) => {
  if (activeAct) {
    activeChapter.value = activeAct;
  }
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

watchEffect(() => {
  if (showAscendancy.value && showAscendancy.value.length) {
    activeAscendancy.value = showAscendancy.value[0].id;
  }

  if (showchapters.value && showchapters.value.length) {
    activeChapter.value = showchapters.value[0].value;
  }
});

onMounted(() => {
  if (showchapters.value && showchapters.value.length) {
    activeChapter.value = showchapters.value[0].value;
  }

  if (jobs.value && jobs.value.length) {
    activeJob.value = jobs.value[0].code;
  }

  if (showAscendancy.value && showAscendancy.value.length) {
    activeAscendancy.value = showAscendancy.value[0].id;
  }
});
</script>

<style scoped></style>
