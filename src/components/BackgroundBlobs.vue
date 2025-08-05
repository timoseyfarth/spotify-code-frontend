<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const props = defineProps<{
  blobCount: number
}>()

const palette = [
  "#7f5af0", "#ff4e6e","#a700ff",
  "#1fb6ff", "#ff49db", "#ff7849",
  "#20c997", "#0d6efd", "#6610f2"
]

interface Blob {
  color: string;
  left: string;
  top: string;
  width: string;
  height: string;
  delay: string;
}

const blobs = ref<Blob[]>([]);

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function getChosenCells(gridSize: number) {
  const totalCells = gridSize * gridSize;

  const cellIndices = Array.from({ length: totalCells }, (_, i) => i)
  cellIndices.sort(() => Math.random() - 0.5)

  return cellIndices.slice(0, props.blobCount)
}

function processCell(idx: number, gridSize: number) {
  const row = Math.floor(idx / gridSize);
  const col = idx % gridSize;

  const cellWidthPercent = 100 / gridSize;
  const cellHeightPercent = 100 / gridSize;

  const paddingPercent = 5;
  const minLeft = col * cellWidthPercent + paddingPercent;
  const maxLeft = (col + 1) * cellWidthPercent - paddingPercent;
  const minTop = row * cellHeightPercent + paddingPercent;
  const maxTop = (row + 1) * cellHeightPercent - paddingPercent;

  return {
    x: randomBetween(minLeft, maxLeft),
    y: randomBetween(minTop, maxTop),
    size: randomBetween(200, 500)
  };
}

onMounted(() => {
  nextTick(() => {
    const gridSize = Math.ceil(Math.sqrt(props.blobCount));

    const chosen = getChosenCells(gridSize);

    chosen.forEach(idx => {
      const { x, y, size } = processCell(idx, gridSize);

      blobs.value.push({
        color: palette[Math.floor(Math.random() * palette.length)],
        left: `${x.toFixed(2)}%`,
        top: `${y.toFixed(2)}%`,
        width: `${size.toFixed(0)}px`,
        height: `${size.toFixed(0)}px`,
        delay: `${randomBetween(0, 7).toFixed(2)}s`
      })
    })
  })
})
</script>

<template>
    <div class="background-blobs">
      <div
        v-for="(b, idx) in blobs"
        :key="idx"
        class="blob"
        :style="{
        background: b.color,
        left: b.left,
        top: b.top,
        width: b.width,
        height: b.height,
        animationDelay: b.delay
      }"
      ></div>
      <slot/>
    </div>
</template>

<style scoped lang="scss">
@use '@/styles/animations';


.background-blobs {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
  z-index: -2;
}

.blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.09;
  filter: blur(50px);
  mix-blend-mode: multiply;
  animation: blob-move 14s ease-in-out infinite alternate;
}
</style>
