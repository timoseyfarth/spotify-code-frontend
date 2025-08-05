<script setup lang="ts">
import { SpotifyItemType, SpotifyType } from '@/types/spotifyType.ts'
import SpotifyTypeIcon from '@/components/SpotifyTypeIcon.vue'
import { computed } from 'vue'
import DetectedStatusIndicator from '@/components/DetectedStatusIndicator.vue'

const props = defineProps<{
  type: SpotifyItemType
}>()

const hasValidClass = computed(() => {
  return props.type && props.type !== SpotifyItemType.None
})

const chars = computed(() => {
  const text = SpotifyType[props.type].label
  return [...text].map((c, i) => ({ c, i, key: `${i}-${c}` }))
})
</script>

<template>
  <div class="box-description">
    <span>Detected Spotify Type:</span>
    <span><DetectedStatusIndicator :is-detected="hasValidClass" /> </span>
  </div>
  <div class="type-display" :class="{ valid: hasValidClass }">
    <SpotifyTypeIcon :type="type" :size="52" class="type-icon" />
    <span class="char-wrapper">
      <TransitionGroup name="char" tag="span">
        <span v-for="item in chars" :key="item.key" class="char" :style="{ '--i': item.i }">
          {{ item.c }}
        </span>
      </TransitionGroup>
    </span>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/animations';


.type-display {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: 8px;
  font-size: 28px;
  width: 300px;
  height: 72px;
  padding: 32px;
  border: 3px solid dimgray;
  background: linear-gradient(145deg, rgba(230, 230, 230, 0.3), rgba(255, 255, 255, 0.1));
  backdrop-filter: blur(10px);
  border-radius: 8px;
  transition: border 0.3s ease-in-out, background 0.7s ease-in-out;

  &.valid {
    border: 3px solid #3a492d;
    background: linear-gradient(145deg, rgba(113, 151, 92, 0.3), rgba(36, 81, 29, 0.1));
  }
}

.type-text {
  font-size: 24px;
}

.char-wrapper {
  display: inline-block;
  overflow: hidden;
}

.char {
  display: inline-block;
}

//.char-enter-from {
//  opacity: 0;
//  transform: translateY(1em);
//}
//.char-enter-to {
//  opacity: 1;
//  transform: translateY(0);
//}
//
//.char-enter-active {
//  transition:
//    opacity 180ms ease calc(var(--i) * 52ms),
//    transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--i) * 52ms);
//}

.box-description {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
}
</style>
