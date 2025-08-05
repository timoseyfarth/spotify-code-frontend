<script setup lang="ts">
import { computed } from 'vue'
import { SpotifyItemType, SpotifyType } from '@/types/spotifyType.ts'
import DetectedStatusIndicator from '@/components/DetectedStatusIndicator.vue'

const props = defineProps<{
  id: string
}>()

const emptyLabel = SpotifyType[SpotifyItemType.None].label

const chars = computed(() => {
  let text;
  if (!props.id) {
    text = emptyLabel
  } else {
    text = props.id.slice(0, 45)
  }
  return [...text].map((c, i) => ({ c, i, key: `${i}-${c}` }))
})
</script>

<template>
  <div class="box-description">
    <span>Detected Spotify ID:</span>
    <span><DetectedStatusIndicator :is-detected="id !== ''" /> </span>
  </div>
  <div class="id-display" :class="{ valid: id }">
    <span
      class="char-wrapper"
    >
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

.id-display {
  display: flex;
  align-items: center;
  font-size: 20px;
  width: 300px;
  height: 72px;
  padding: 16px;
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

.char-wrapper {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.char {
  display: inline-block;
}

.box-description {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
}
</style>
