<script setup lang="ts">

import SpotifyTypeDisplay from '@/components/SpotifyTypeDisplay.vue'
import SpotifyIdDisplay from '@/components/SpotifyIdDisplay.vue'
import { SpotifyItemType } from '@/types/spotifyType.ts'

defineProps<{
  spotifyType: SpotifyItemType
  spotifyId: string
}>()

</script>

<template>
  <div class="detected-item-wrapper">
      <span class="detected-item">
      <SpotifyTypeDisplay :type="spotifyType" />
    </span>
    <span class="detected-item">
      <SpotifyIdDisplay :id="spotifyId" />
    </span>
  </div>
</template>

<style scoped lang="scss">

.detected-item-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (min-width: 800px) {
  .detected-item-wrapper {
    flex-direction: row;
    align-items: flex-start;
  }
  .detected-item {
    flex: 1 1 auto;
    min-width: 0;
  }
}
</style>
