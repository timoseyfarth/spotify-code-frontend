<template>
  <!-- Wrapper, damit du Styling draufpacken kannst -->
  <div ref="wrapper" class="position-absolute inset-0 -z-10 pointer-events-none"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Application } from '@splinetool/runtime'

const wrapper = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (!wrapper.value) return

  // 1) Erstelle ein Canvas, hänge es ins DOM
  const canvas = document.createElement('canvas')
  canvas.style.width  = '100%'
  canvas.style.height = '100%'
  canvas.style.display = 'block'
  wrapper.value.appendChild(canvas)

  // 2) Initialisiere die Runtime
  const app = new Application(canvas, {
    renderMode: 'auto'   // oder 'continuous' / 'manual'
  })

  // 3) Lade die Szene
  try {
    await app.load('https://prod.spline.design/jmR8XZzdo6bWTfh9/scene.splinecode')
    // Autoplay ist default auf true, falls du’s ausschalten willst:
    // app.setAutoplay(false)
  }
  catch (e) {
    console.error('Spline Load-Fehler:', e)
  }
})
</script>

<style scoped lang="scss">
.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.-z-10 { z-index: -10 }
</style>
