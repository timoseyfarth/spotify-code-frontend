<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { ContentCopyRound, CheckRound } from '@vicons/material'

const emits = defineEmits<{
  copyToClipboard: [],
}>()

const clicked = ref(false)

let timer: ReturnType<typeof setTimeout> | null = null

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})

function clickButton() {
  if (clicked.value) return
  clicked.value = true

  emits('copyToClipboard')

  timer = setTimeout(() => {
    clicked.value = false
  }, 2000)
}
</script>

<template>
  <v-btn
    variant="elevated"
    @click="clickButton"
  >
    <v-icon :size="24">
      <TransitionGroup name="switch">
        <check-round class="text-success" v-if="clicked" key="clicked" />
        <content-copy-round class="text-light-green-darken-2" v-else key="not-clicked" />
      </TransitionGroup>
    </v-icon>
  </v-btn>
</template>

<style scoped lang="scss">
@use "@/styles/animations";
</style>
