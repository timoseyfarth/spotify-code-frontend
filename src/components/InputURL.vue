<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  loading: boolean
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:url', value: string): void
  (e: 'update:modelValue', value: string): void
}>()

const url = ref('')
const errorMessages = ref<string[]>([])

function validateURL(inputUrl: string) {
  if (!inputUrl || inputUrl.trim() === '') {
    errorMessages.value = []
    return
  }
  try {
    new URL(inputUrl)
    errorMessages.value = []

    if (!inputUrl.includes('open.spotify.com')) {
      errorMessages.value = [
        'This is not a valid Spotify URL. Format: https://open.spotify.com/{type}/{id}',
      ]
      return
    }
    if (!inputUrl.match(/(track|album|episode|playlist)/)) {
      errorMessages.value = ['Only track, album, playlist and podcast episode types are allowed']
      return
    }
  } catch {
    errorMessages.value = [
      'This is not a valid Spotify URL. Format: https://open.spotify.com/{type}/{id}',
    ]
  }
}

const overrideProxy = computed({
  get() {
    return props.modelValue || ''
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

function onInput(e: unknown) {
  url.value = e.target.value
  emit('update:url', url.value)
  validateURL(url.value)
}
</script>

<template>
  <v-text-field
    class="glossy-input"
    :loading="loading"
    label="Enter Spotify URL"
    placeholder="https://open.spotify.com/{type}/{id}"
    v-model="overrideProxy"
    @input="onInput"
    @update:modelValue="
      (val) => {
        url = val
        emit('update:url', val)
      }
    "
    :error-messages="errorMessages"
    variant="outlined"
    dense
    rounded="xl"
    clearable
    persistent-clear
  ></v-text-field>
</template>

<style scoped lang="scss">
.glossy-input {
  width: 100%;
  max-width: 900px;
  max-height: 80px;
  align-items: center;

  :deep(input) {
    color: #fff !important;
    font-size: 1.1rem;
  }

  :deep(.v-field__loader) {
    width: calc(100% - 40px);
    left: 20px;
  }
}
</style>
