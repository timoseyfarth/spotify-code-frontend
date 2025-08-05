<script setup lang="ts">
import { CheckCircleOutlineRound, CancelOutlined } from '@vicons/material'

defineProps<{
  isDetected: boolean
}>()
</script>

<template>
  <v-icon :size="24">
    <TransitionGroup
      enter-active-class="switch-enter-active"
      leave-active-class="switch-leave-active"
      enter-from-class="switch-enter-from"
      leave-to-class="switch-leave-to"
      :css="true"
    >
      <check-circle-outline-round class="text-success" v-if="isDetected" key="detected" />
      <cancel-outlined class="text-error" v-else key="not-detected" />
    </TransitionGroup>
  </v-icon>
</template>

<style scoped lang="scss">
@use "@/styles/animations";
</style>
