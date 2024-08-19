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
        <img class="invert" src="/images/left_arrow.png" alt="arrow left" />
      </button>
      <button
        role="button"
        class="arrow right-0"
        :class="isLastOne ? 'opacity-50 ' : ''"
        :disabled="isLastOne"
        @click="nextSkill"
      >
        <img class="invert" src="/images/right_arrow.png" alt="arrow right" />
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
              to="https://www.youtube.com/watch?v=eWBsKjQzIOo&t=948s"
              target="_blank"
              external
            >
              {{ skill.recommend }}
            </NuxtLink>
          </p>
          <img
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
const AtlasPassivePoRecommend: {
  title: string;
  href: string;
  img?: string;
  skillId: string;
  recommend: string;
}[] = reactive([
  {
    title: "搭配基拉克賺錢天賦",
    recommend: "資料來源 Yotuber Change",
    href: "https://www.youtube.com/watch?v=eWBsKjQzIOo&t=948s",
    img: "/images/kirac.png",
    skillId: "kirac-0",
  },
  {
    title: "新賽季甲蟲洗錢術",
    recommend: "資料來源 Yotuber Howhowgoose 皓皓鵝-遊戲頻道",
    href: "https://www.youtube.com/watch?v=Y2RWvNOARRc&list=WL&index=37&t=256s",
    img: "/images/scarabs.png",
    skillId: "scarabs-0",
  },
]);

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
</script>

<style scoped></style>
