<script setup lang="ts">

import { CheckRound, ClearRound, PrintRound } from '@vicons/material'
import { usePdfDownloaderAPI } from '@/composables/usePdfDownloaderAPI.ts'
import { onBeforeUnmount, ref } from 'vue'
import { useSnackbarData } from '@/stores/snackbarData.ts'
import { useTouchDetector } from '@/composables/useTouchDetector.ts'

const props = defineProps<{
  jobId: string
}>()

const snackBar = useSnackbarData()
const touchDetector = useTouchDetector()

const { loading, error, openPrinterDialog, openPdfInNewTab } = usePdfDownloaderAPI()
const printSuccess = ref(false)
const printFailure = ref(false)

let timer: ReturnType<typeof setTimeout> | null = null

async function fetchAndDownloadPdf() {
  if (printSuccess.value || printFailure.value) return
  if (touchDetector.isTouch) {
    await openPdfInNewTab(props.jobId)
  } else {
    await openPrinterDialog(props.jobId)

    if(error.value) {
      await openPdfInNewTab(props.jobId)
    }
  }

  if (error.value) {
    snackBar.add({
      text: `Error downloading PDF: ${error.value}`,
      color: 'error',
    })
    printFailure.value = true
  } else {
    printSuccess.value = true
  }

  timer = setTimeout(() => {
    printSuccess.value = false
    printFailure.value = false
  }, 2000)
}

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <div class="print-btn">
    <v-btn color="primary" icon variant="elevated" :loading="loading" @click="fetchAndDownloadPdf">
      <v-tooltip
        activator="parent"
        location="bottom"
      >
        Print Album PDF
      </v-tooltip>
      <v-icon size="x-large">
        <TransitionGroup name="switch">
          <check-round class="text-success" v-if="printSuccess" key="clicked" />
          <clear-round v-else-if="printFailure" />
          <print-round v-else key="print" />
        </TransitionGroup>
      </v-icon>
    </v-btn>
  </div>
</template>

<style scoped lang="scss">
@use "@/styles/animations";
</style>
