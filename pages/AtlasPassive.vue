<template>
  <div class="container w-full text-center py-4 mx-auto">
    <div class="flex flex-wrap justify-center py-5">
      <span
        v-for="skill in AtlasPassivePoRecommend"
        :key="skill.skillId"
        :class="`cursor-pointer px-5 md:text-2xl ${
          activeSkill === skill.skillId ? 'text-yellow-500' : 'text-white'
        }`"
        @click="selectAct(skill.skillId)"
      >
        {{ skill.title }}
      </span>
    </div>
    <!-- 輪播區塊 -->
    <div
      class="slider-warp relative w-[96%] mx-auto h-screen border rounded overflow-hidden"
    >
      <!-- 切換主題按鈕 -->
      <button
        role="button"
        class="arrow left-0"
        :class="isFirstOne ? 'opacity-50 ' : ''"
        :disabled="isFirstOne"
        @click="prevSkill"
      >
        <img class="invert" :src="leftArrow" alt="arrow left" />
      </button>
      <button
        role="button"
        class="arrow right-0"
        :class="isLastOne ? 'opacity-50 ' : ''"
        :disabled="isLastOne"
        @click="nextSkill"
      >
        <img class="invert" :src="rightArrow" alt="arrow right" />
      </button>
      <!-- 輪播圖 -->
      <div
        class="silder transition-all absolute w-full flex flex-nowrap"
        :style="{ transform: transformStyle }"
      >
        <div
          class="slide w-full flex flex-col items-center text-black font-bold"
          :style="{ fontSize: '36px', flex: 'none' }"
          v-for="skill in AtlasPassivePoRecommend"
          :key="skill.skillId"
        >
          <h2 class="text-white pt-3">{{ skill.title }}</h2>
          <p>
            <NuxtLink
              class="p-3 text-2xl font-bold text-yellow-500"
              :to="skill.href"
              target="_blank"
              external
            >
              {{ skill.recommend }}
            </NuxtLink>
          </p>
          <NuxtImg
            v-if="skill.img"
            class="inline-block w-[50vw] cursor-pointer"
            :src="skill.img"
            alt="skill"
            @click="imgLink(skill.img)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import leftArrow from "@assets/images/left_arrow.webp";
import rightArrow from "@assets/images/right_arrow.webp";

const AtlasPassivePoRecommend: {
  title: string;
  href: string;
  img?: string;
  skillId: string;
  recommend: string;
}[] = reactive([
  {
    title: "花園人",
    recommend: "資料來源 Yotuber 五边形",
    href: "https://www.youtube.com/watch?v=yh7Vug4xTIE&t=160s",
    img: "/images/harvest.webp",
    skillId: "harvest-0",
  },
  {
    title: "搭配基拉克賺錢天賦",
    recommend: "資料來源 Yotuber Change",
    href: "https://www.youtube.com/watch?v=eWBsKjQzIOo&t=350s",
    img: "/images/kirac.webp",
    skillId: "kirac-0",
  },
  {
    title: "新賽季甲蟲洗錢術",
    recommend: "資料來源 Yotuber Howhowgoose 皓皓鵝-遊戲頻道",
    href: "https://www.youtube.com/watch?v=Y2RWvNOARRc",
    img: "/images/scarabs.webp",
    skillId: "scarabs-0",
  },
  {
    title: "T17 無腦甲蟲",
    recommend: "資料來源 Yotuber Howhowgoose 皓皓鵝-遊戲頻道",
    href: "https://www.youtube.com/watch?v=8AqvnGx75DY&t=225s",
    img: "/images/scarabs2.webp",
    skillId: "scarabs-1",
  },
]);

const cookie = useCookie("passives");

const activeSkill = ref("kirac-0");

const transformStyle = computed(() => {
  if (activeSkill.value) {
    const index = AtlasPassivePoRecommend.findIndex(
      (item) => item.skillId === activeSkill.value
    );
    return `translateX(-${100 * index}%)`;
  }
  return "translateX(0)";
});

const selectAct = (id: string) => {
  if (id) {
    activeSkill.value = id;
    cookie.value = id;
  }
};

const isFirstOne = computed(() => {
  const lastSkillId = AtlasPassivePoRecommend[0].skillId;
  if (activeSkill.value === lastSkillId) return true;
  return false;
});

const isLastOne = computed(() => {
  const lastSkillId =
    AtlasPassivePoRecommend[AtlasPassivePoRecommend.length - 1].skillId;
  if (activeSkill.value === lastSkillId) return true;
  return false;
});

const prevSkill = () => {
  const index = AtlasPassivePoRecommend.findIndex(
    (item) => item.skillId === activeSkill.value
  );
  if (typeof index === "number") {
    const targetIndex =
      (index - 1 + AtlasPassivePoRecommend.length) %
      AtlasPassivePoRecommend.length;
    const target = AtlasPassivePoRecommend[targetIndex];
    if (target) activeSkill.value = target.skillId;
  }
};

const nextSkill = () => {
  const index = AtlasPassivePoRecommend.findIndex(
    (item) => item.skillId === activeSkill.value
  );
  if (typeof index === "number") {
    const targetIndex = (index + 1) % AtlasPassivePoRecommend.length;
    const target = AtlasPassivePoRecommend[targetIndex];
    if (target) activeSkill.value = target.skillId;
  }
};

const imgLink = (href) => {
  const windowReferenceError = window.open("", "skill");
  if (windowReferenceError) windowReferenceError.location.href = href;
};

onMounted(() => {
  if (cookie && cookie.value && cookie.value !== "")
    activeSkill.value = cookie.value;
});
</script>

<style scoped></style>
