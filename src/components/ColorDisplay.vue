<script setup lang="ts">
import { computed } from 'vue'
import type { ColorDTO } from '@/types/spotifyDTO.ts'
import { useClipboard } from '@/composables/useClipboard.ts'

const props = defineProps<{
  label: string
  color: ColorDTO
}>()

const rgb = computed(() => props.color.rgb)
const hex = computed(() => props.color.hex)
const name = computed(() => props.color.name)

const rgbDisplay = computed(() => `${rgb.value[0]}, ${rgb.value[1]}, ${rgb.value[2]}`)

const buttonColor = computed(() => {
  const [r, g, b] = rgb.value
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? 'black' : 'white'
})

const clipboard = useClipboard()
</script>

<template>
  <div class="color-display">
    <h2 class="color-label">{{ label }}</h2>
<!--    <transition name="slide-fade" mode="out-in">-->

    <div
      :key="name"
      class="color-box"
      :style="{ backgroundColor: hex,
       border: `1px solid ${buttonColor}` }">
      <h3 class="color-name">{{ name }}</h3>

      <div class="copy-buttons">
        <v-btn
          variant="outlined"
          :color="buttonColor"
          @click="clipboard.copy(rgbDisplay, 'RGB of ' + label)"
        >
          {{ rgbDisplay }}
        </v-btn>

        <v-btn
          variant="outlined"
          :color="buttonColor"
          @click="clipboard.copy(hex, 'HEX of ' + label)"
        >
          {{ hex }}
        </v-btn>
      </div>
    </div>
<!--    </transition>-->
  </div>
</template>

<style scoped lang="scss">
.color-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.color-label {
  padding: 0 1rem;
  align-self: flex-start;
  color: #f4d6a2;
}

.color-box {
  position: relative;
  width: 260px;
  height: 120px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  color: #fff;
  font-weight: bold;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.1);
    border-radius: inherit;
  }
}

.color-name {
  margin: 0;
  font-size: 1.25rem;
  text-align: center;
  background: rgba(81, 78, 35, 0.49);
  border-radius: inherit;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.copy-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

//.slide-fade-enter-from {
//  opacity: 0;
//  transform: translateY(15px);
//}
//.slide-fade-enter-to {
//  opacity: 1;
//  transform: translateY(0);
//}
//.slide-fade-leave-from {
//  opacity: 1;
//  transform: translateY(0);
//}
//.slide-fade-leave-to {
//  opacity: 0;
//  transform: translateY(-15px);
//}
//.slide-fade-enter-active,
//.slide-fade-leave-active {
//  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
//  transition-delay: 0.42s;
//}
</style>
