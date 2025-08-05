<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useSpotifyCodeAPI } from '@/composables/useSpotifyAPI.ts'
import InputURL from '@/components/InputURL.vue'
import GradientTitle from '@/components/GradientTitle.vue'
import DetectedItems from '@/components/DetectedItems.vue'
import BackgroundBlobs from '@/components/BackgroundBlobs.vue'
import SubmitButton from '@/components/SubmitButton.vue'
import HealthIndicator from '@/components/HealthIndicator.vue'
import ApiResultSuccess from '@/components/ApiResultSuccess.vue'
import { useKeyboardShortcuts } from '@/composables/useKeyboardShortcuts.ts'
import { useSpotifyDataStore } from '@/stores/spotifyData.ts'
import { storeToRefs } from 'pinia'
import { useSnackbarData } from '@/stores/snackbarData.ts'
import RequestErrorAlert from '@/components/RequestErrorAlert.vue'
import { useAlbumImageAPI } from '@/composables/useAlbumImageAPI.ts'
import SpotifyPicBackground from '@/components/SpotifyPicBackground.vue'
import BambuButton from '@/components/BambuButton.vue'

const { mountKeyboard, unmountKeyboard } = useKeyboardShortcuts(submit)

const spotifyData = useSpotifyDataStore()
const snackbarData = useSnackbarData()

const { spotifyId, spotifyType, isValidInput, noInputYet, checkIfInputIsPresentInStack } =
  storeToRefs(spotifyData)

const { loading, error: spotError, data, fetchCode } = useSpotifyCodeAPI()

const { error: albumError, blobUrl, fetchAlbumImage } = useAlbumImageAPI()

const error = computed(() => {
  return spotError.value || albumError.value
})

const inputURLModel = ref('')

async function submit() {
  if (!isValidInput.value) return
  if (checkIfInputIsPresentInStack.value) {
    inputURLModel.value = ''
    spotifyData.setRequestWhileSavedOfCurrentInput()
    return
  }
  inputURLModel.value = ''
  await fetchCode(spotifyType.value, spotifyId.value)

  if (!spotError.value && data.value) {
    if (data.value.title) {
      await fetchAlbumImage(data.value.job_id)
      spotifyData.spotifyDataStack.push({
        data: data.value,
        blobURL: blobUrl.value,
        requestWhileSaved: false,
      })
    } else {
      spotifyData.spotifyDataStack.push({
        data: data.value,
        blobURL: null,
        requestWhileSaved: false,
      })
    }
  }
}

const blobCount = computed(() => {
  const totalArea = window.innerWidth * window.innerHeight
  const SCALE = 0.0045
  const MIN_BLOBS = 2
  const MAX_BLOBS = 7
  const raw = Math.round(SCALE * Math.sqrt(totalArea))
  return Math.min(MAX_BLOBS, Math.max(MIN_BLOBS, raw))
})

onMounted(() => {
  mountKeyboard()
})

onBeforeUnmount(() => {
  unmountKeyboard()
})
</script>

<template>
  <div class="home-view">
    <SpotifyPicBackground />
    <BackgroundBlobs :blob-count="blobCount" />

    <HealthIndicator class="health-indicator" />
    <v-snackbar-queue v-model="snackbarData.queue" location="bottom right" />

    <transition-group name="fade-slide" appear move-class="move">
      <RequestErrorAlert :error="error" key="request-error" />

      <div key="top-spacer" class="top-spacer"></div>
      <BambuButton key="bambu-btn" />

      <GradientTitle
        class="gradient-title"
        key="title"
        title="Print Your Song"
        :class="{ 'no-mb': isValidInput || !noInputYet }"
      />

      <div key="title-url-spacer" class="title-url-spacer"></div>
      <InputURL
        key="input"
        :loading="loading"
        :model-value="inputURLModel"
        @update:url="spotifyData.updateSpotifyData"
        @update:model-value="inputURLModel = $event"
      />
      <SubmitButton
        v-if="isValidInput || !noInputYet"
        key="submit"
        label="Submit"
        :loading="loading"
        :request-error="error !== null"
        @click="submit"
        :disabled="!isValidInput"
      />

      <DetectedItems
        v-if="isValidInput || !noInputYet"
        key="detected"
        :spotify-type="spotifyType"
        :spotify-id="spotifyId"
      />

      <transition-group
        name="drop"
        tag="div"
        v-if="spotifyData.spotifyDataStack.length > 0"
        key="api-result"
        ref="apiResultRef"
        class="api-result"
      >
        <ApiResultSuccess
          v-for="item in [...spotifyData.spotifyDataStack].reverse()"
          :key="item.data.job_id"
          :api-result="item.data"
          :album-image-url="item.blobURL"
          :request-while-saved="item.requestWhileSaved"
          @update:requestWhileSaved="item.requestWhileSaved = $event"
        />
      </transition-group>
    </transition-group>
  </div>
</template>

<style scoped lang="scss">
.home-view {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.health-indicator {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 10;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(40px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.drop-enter-from {
  transform: translateY(-10vh) scaleY(0.6) scaleX(1.2);
  opacity: 0;
}

.drop-enter-active {
  transition:
    transform 500ms cubic-bezier(0.25, 1, 0.5, 1),
    opacity 300ms ease-out;
}

.drop-enter-to {
  transform: translateY(0) scale(1);
  opacity: 1;
}

.drop-move {
  transition: transform 300ms ease;
}

.move {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.top-spacer {
  flex-grow: 1;
  height: 50px;
}

@media (max-width: 1350px) {
  .top-spacer {
    height: 10px;
  }
}

.gradient-title {
  margin-bottom: 10rem;
  transition: margin-bottom 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  &.no-mb {
    margin-bottom: 2rem;
  }
}

@media (max-width: 600px) {
  .gradient-title {
    margin-bottom: 32px;
  }
}

.alert-error {
  position: absolute;
  top: 1rem;
  z-index: 20;
}

.api-result {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
