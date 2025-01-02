<template>
  <canvas class="absolute h-full w-full z-[-1]"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, type Ref, onBeforeUnmount } from "vue";

let canvas: any = ref(null);

let ctx: any = reactive({});

let dropCount: Ref<number> = ref(0);

let drops: any = reactive([]);

for (let i = 0; i < dropCount.value; i++) {
  drops.push({ x: i * 15, y: Math.ceil(Math.random() * 60) * -15 });
}

let timer: any = ref(null);

const drop = () => {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);

  if (!drops.length) return;

  for (let i = 0; i < dropCount.value; i++) {
    let text = String.fromCharCode(Math.random() * 128);
    if (drops[i].y > canvas.value.height) {
      drops[i].y = -15;
    }
    drops[i].y += 15;
    ctx.font = "15px monospace";
    ctx.fillStyle = "#00FF40";
    ctx.fillText(text, drops[i].x, drops[i].y);
  }
};

const resize = () => {
  canvas.value.height = window.innerHeight;
  canvas.value.width = window.innerWidth;
  dropCount.value = window.innerWidth / 15;
  drops = [];
  for (let i = 0; i < dropCount.value; i++) {
    drops.push({ x: i * 15, y: Math.ceil(Math.random() * 60) * -15 });
  }
};

onMounted(() => {
  canvas.value = document.querySelector("canvas");
  if (canvas.value) {
    ctx = canvas.value.getContext("2d");
    canvas.value.height = window.innerHeight;
    canvas.value.width = window.innerWidth;

    dropCount.value = Math.floor(window.innerWidth / 15);

    for (let i = 0; i < dropCount.value; i++) {
      drops.push({ x: i * 15, y: Math.ceil(Math.random() * 60) * -15 });
    }
  }
  if (ctx) timer.value = setInterval(drop, 50);
  window.addEventListener("resize", resize);
});

onBeforeUnmount(() => {
  timer.value = null;
  window.removeEventListener("resize", resize);
});
</script>

<style scoped></style>
