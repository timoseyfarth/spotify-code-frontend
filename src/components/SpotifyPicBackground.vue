<script setup lang="ts">

import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useTouchDetector } from '@/composables/useTouchDetector.ts'
import throttle from 'lodash/throttle'

const touchDetector = useTouchDetector()
const { isTouch } = touchDetector

const tiltEl = ref<HTMLElement|null>(null)

const onMouseMove = (e: MouseEvent) => {
  if (!tiltEl.value) return
  const rotX = (window.innerHeight / 2 - e.clientY) / 80
  const rotY = (window.innerWidth / 2  - e.clientX) / 80
  tiltEl.value.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`
}

const throttleMouseMove = throttle(onMouseMove, 60, {
  leading: true,
  trailing: true,
})

onMounted(() => {
  if (isTouch.value) return;
  document.addEventListener('mousemove', throttleMouseMove)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onMouseMove)
})

</script>

<template>
  <div class="background-full bg-container">
    <div ref="bgPic" class="background-full slide-in-wrapper">
      <div
        ref="tiltEl"
        class="tilt-bg-picture background-full">
      </div>
    </div>
    <div class="spotify-bg-overlay background-full"></div>
  </div>
</template>


<style scoped lang="scss">
@use '@/styles/animations';

.bg-container {
  z-index: -6;
}

.slide-in-wrapper {
  transform-origin: center top;
  transform-style: preserve-3d;
  animation: slide3D 1.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  //animation: slide3DAdv 2.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  z-index: -5;
}

.tilt-bg-picture {
  background-repeat: no-repeat;
  background-position: center;
  background-image: image-set(
      url('@/assets/side.webp') 1x,
      url('@/assets/side.png') 1x
  );  filter: blur(2px);
}

.background-full {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.spotify-bg-overlay {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.65)) no-repeat center;
  background-blend-mode: darken;
  z-index: -3;
}

@media (max-width: 600px) {
  .tilt-bg-picture {
    background-size: 100%;
  }
}
</style>
