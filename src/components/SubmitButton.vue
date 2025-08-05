<script setup lang="ts">
import { computed, onBeforeUnmount, watch, ref } from 'vue'
import { CheckRound, SubdirectoryArrowLeftRound, DoubleArrowRound, ClearRound } from '@vicons/material'

const props = defineProps<{
  label: string
  loading: boolean
  requestError: boolean
  color?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const success = ref(false)
const error = ref(false)

let timer: ReturnType<typeof setTimeout> | null = null

watch(
  () => props.loading,
  (newVal, oldVal) => {
    if (oldVal && !newVal) {
      if (props.requestError) {
        error.value = true
        timer = setTimeout(() => {
          error.value = false
        }, 3000)
      } else {
        success.value = true
        timer = setTimeout(() => {
          success.value = false
        }, 3000)
      }
    }
  },
)

const buttonColor = computed(() => {
  if (success.value) return 'success'
  if (error.value) return 'error'
  return props.color ?? 'primary'
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})

function onClick() {
  if (!props.loading && !props.disabled) {
    emit('click')
  }
}
</script>

<template>
  <v-btn
    :color="buttonColor"
    :loading="loading"
    :disabled="loading || disabled"
    elevation="2"
    size="x-large"
    rounded="xl"
    class="loading-btn"
    @click="onClick"
  >
    <template #loader>
      <v-progress-circular
        indeterminate
        :size="20"
        :width="2"
        :color="color ? 'white' : 'primary'"
      />
    </template>

    <template #default>
      <v-icon size="20">
        <TransitionGroup name="switch">
          <check-round v-if="success" color="white" />
          <clear-round v-else-if="error" color="white" />
          <double-arrow-round v-else-if="$vuetify.display.mobile" color="white" />
          <subdirectory-arrow-left-round v-else class="enter-key"  color="white" />
        </TransitionGroup>
      </v-icon>
    </template>
  </v-btn>
</template>

<style scoped lang="scss">
@use '@/styles/animations';

.loading-btn {
  text-transform: none;
  font-weight: 500;
  min-width: 170px;
  transition:
    background-color 0.6s ease,
    box-shadow 0.3s ease;
}

.enter-key {
  background-color: rgba(255, 255, 255, 0.15);
  padding: 6px 0;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  box-shadow:
    0 2px 0 rgba(255, 255, 255, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;
}
</style>
