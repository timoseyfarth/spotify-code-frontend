<script setup lang="ts">
import {
  AlbumRound,
  AudiotrackRound,
  PodcastsRound,
  PlaylistPlayRound,
  QuestionMarkRound,
} from '@vicons/material'
import { SpotifyItemType } from '@/types/spotifyType.ts'

defineProps<{
  type: SpotifyItemType
  size: number
}>()
</script>

<template>
  <v-icon :size="size">
    <TransitionGroup name="switch">
      <album-round v-if="type === SpotifyItemType.Album" key="album" />
      <audiotrack-round v-else-if="type === SpotifyItemType.Track" key="track" />
      <podcasts-round v-else-if="type === SpotifyItemType.Episode" key="episode" />
      <playlist-play-round v-else-if="type === SpotifyItemType.Playlist" key="playlist" />
      <question-mark-round v-else key="unknown" />
    </TransitionGroup>
  </v-icon>
</template>

<style scoped lang="scss">
@use '@/styles/animations';
</style>
