<script setup lang="ts">
import { useServerHealthAPI } from '@/composables/useServerHealthAPI.ts'
import { computed, onMounted, ref } from 'vue'
import { useOembedHealthAPI } from '@/composables/useOembedHealthAPI.ts'

const { error: serverError, data: serverData, fetchServerHealth } = useServerHealthAPI()
const { error: oembedError, data: oembedData, fetchOembedHealth } = useOembedHealthAPI()

async function fetchStatus() {
  await fetchServerHealth()
  await fetchOembedHealth()
}

const showDetail = ref(false)

const isServerOkay = computed(() => {
  return !serverError.value && serverData.value?.status === 'ok'
})

const isOembedOkay = computed(() => {
  return !oembedError.value && oembedData.value?.status === 'ok'
})

const overallStatus = computed<'success'|'error'|'warning'>(() => {
  if (isOembedOkay.value && isServerOkay.value) return 'success'
  if (!isOembedOkay.value && !isServerOkay.value) return 'error'
  return 'warning'
})

// let timer: number | undefined
//
onMounted(async () => {
  await fetchStatus()
  // timer = setInterval(load, 600000) // Every 10 minutes
})
//
// onBeforeUnmount(() => {
//   if (timer) clearInterval(timer)
// })
</script>

<template>
  <div
    class="health-indicator-wrapper"
    @mouseenter="showDetail = true"
    @mouseleave="showDetail = false"
    :class="{ expanded: showDetail }"
  >
    <div class="circle main" :class="overallStatus"></div>

    <v-expand-transition>
      <div v-if="showDetail" class="details-blocks">
        <div class="health-indicator">
          <v-tooltip v-if="!isOembedOkay" activator="parent" location="bottom" max-width="300">
            The Spotify API  is not reachable. This may cause that the Album cover image is not displayed and cannot be downloaded.
          </v-tooltip>
          <div class="circle" :class="isOembedOkay ? 'success' : 'error'">
          </div>
          <span class="status-text">
            {{ isOembedOkay ? 'Spotify OK' : 'Spotify Error' }}
          </span>
        </div>
        <div class="health-indicator">
          <v-tooltip v-if="!isServerOkay" activator="parent" location="bottom" max-width="300">
            The Server  is not reachable. Try reloading the page, if the problem persists, please contact the developer.
          </v-tooltip>
          <div class="circle" :class="isServerOkay ? 'success' : 'error'"></div>
          <span class="status-text">
            {{ isServerOkay ? 'Server OK' : 'Server Error' }}
          </span>
        </div>
      </div>
    </v-expand-transition>
  </div>
<!--  <div class="health-indicator">-->
<!--    <div-->
<!--      class="circle"-->
<!--      :class="{-->
<!--        error: !isOembedOkay,-->
<!--        success: isOembedOkay,-->
<!--      }"-->
<!--    >-->
<!--      <v-tooltip v-if="!isOembedOkay" activator="parent" location="bottom">-->
<!--        Spotify API Connection Error-->
<!--      </v-tooltip>-->
<!--    </div>-->
<!--    <span v-if="isOembedOkay" class="status-text">Spotify OK</span>-->
<!--    <span v-else class="status-text">Spotify Error</span>-->
<!--  </div>-->
<!--  <div class="health-indicator">-->
<!--    <div-->
<!--      class="circle"-->
<!--      :class="{-->
<!--        error: !isServerOkay,-->
<!--        success: isServerOkay,-->
<!--      }"-->
<!--    ></div>-->
<!--    <span v-if="isServerOkay" class="status-text">System OK</span>-->
<!--    <span v-else class="status-text">Server Error</span>-->
<!--  </div>-->
</template>

<style scoped lang="scss">
@use '@/styles/animations';
.health-indicator-wrapper {
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  max-width: 16px;
  transition: max-width 300ms ease;
}
.health-indicator-wrapper.expanded {
  max-width: 300px; // genug Platz für Text
}

.circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #666;
  transition: background-color 300ms ease;
  &.success {
    background-color: #00cc00;
    animation: shadow-success 2s infinite;
  }
  &.error {
    background-color: #ff4444;
  }
  &.warning {
    background-color: #ffcc00;
  }
}

.details-blocks {
  display: flex;
  gap: 16px;
  margin-left: 12px;
}

.health-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-text {
  white-space: nowrap;
  font-size: 14px;
  color: #bdbdbd;
}

//.health-indicator {
//  display: flex;
//  align-items: center;
//  gap: 8px;
//}
//
//.circle {
//  width: 12px;
//  height: 12px;
//  border-radius: 50%;
//  background-color: #666;
//  transition: background-color 0.3s ease-in-out;
//
//  &.error {
//    background-color: #ff4444;
//  }
//
//  &.success {
//    background-color: #00cc00;
//    animation: shadow-success 2s infinite;
//  }
//
//  &.warning {
//    background-color: #ffcc00;
//  }
//}
//
//.status-text {
//  font-size: 14px;
//  color: #bdbdbd;
//}
</style>
