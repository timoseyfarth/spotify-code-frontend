<script setup lang="ts">

import { CheckRound, ClearRound, FileDownloadRound } from '@vicons/material'
import { useAlbumImageAPI } from '@/composables/useAlbumImageAPI.ts'
import { onBeforeUnmount, ref } from 'vue'
import { useSnackbarData } from '@/stores/snackbarData.ts'

const props = defineProps<{
  jobId: string
}>()

const snackBar = useSnackbarData()

const { loading, error, downloadAlbumImage } = useAlbumImageAPI()
const albumSuccess = ref(false)
const albumFailure = ref(false)

let timer: ReturnType<typeof setTimeout> | null = null

async function fetchAndDownloadAlbum() {
  if (albumSuccess.value || albumFailure.value) return
  await downloadAlbumImage(props.jobId)

  if (error.value) {
    snackBar.add({
      text: `Error downloading album image: ${error.value}`,
      color: 'error',
    })
    albumFailure.value = true
  } else {
    albumSuccess.value = true
  }

  timer = setTimeout(() => {
    albumSuccess.value = false
    albumFailure.value = false
  }, 2000)
}

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <div class="album-btn">
    <v-btn color="primary" icon variant="elevated" :loading="loading" @click="fetchAndDownloadAlbum">
      <v-tooltip
        activator="parent"
        location="bottom"
      >
        Download Album Cover Image
      </v-tooltip>
      <v-icon size="x-large">
        <TransitionGroup name="switch">
          <check-round class="text-success" v-if="albumSuccess" key="clicked" />
          <clear-round v-else-if="albumFailure" />
          <file-download-round v-else key="download" />
        </TransitionGroup>
      </v-icon>
    </v-btn>
  </div>
</template>

<style scoped lang="scss">
@use "@/styles/animations";
</style>
