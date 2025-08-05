<script setup lang="ts">
import SpotifyTypeIcon from '@/components/SpotifyTypeIcon.vue'
import type { SpotifyItemType } from '@/types/spotifyType.ts'

defineProps<{
  title: string | null
  type: SpotifyItemType
}>()
</script>

<template>
  <!--  <transition name="slide-fade" mode="out-in">-->
  <div :key="title ?? 'fall-back-title'" class="spot-title-wrapper">
    <SpotifyTypeIcon :type="type" :size="24" class="spot-icon" />
    <h1 v-if="title" class="spot-title">{{ title }}</h1>
    <h2 v-else class="spot-title not-available">Title not available</h2>
  </div>
  <!--  </transition>-->
</template>

<style scoped lang="scss">
.spot-title-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
}

.spot-title {
  color: #f4d6a2;
  font-weight: bold;
  max-width: 480px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.not-available {
  color: #9f9b9b;
  font-style: italic;
}

@media (max-width: 600px) {
  .spot-title-wrapper {
    max-width: 250px;
  }
}

.spot-icon {
  color: #f4d6a2;
}
</style>
