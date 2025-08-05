<script setup lang="ts">
import { ArrowForwardRound } from '@vicons/material'
import { computed, ref } from 'vue'
import { useTouchDetector } from '@/composables/useTouchDetector.ts'

const touchDetector = useTouchDetector()

const { isTouch } = touchDetector

const mouseOverBtn = ref(false)

const infoExpanded = computed(() => {
  return mouseOverBtn.value || isTouch.value
})

function handleMouseOver() {
  if (isTouch.value) return
  mouseOverBtn.value = true
}

function handleMouseLeave() {
  mouseOverBtn.value = false
}

</script>

<template>
  <a
    class="bambu-button-wrapper no-link-format"
    :class=" { expanded: infoExpanded }"
    href="https://makerworld.com/en/models/1660269-customizable-spotify-keychain-tag#profileId-1756258"
    target="_blank"
    rel="noopener noreferrer"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
  >
    <picture class="bambu-logo">
      <source
        class="bambu-logo"
        srcset="@/assets/bambu-lab-logo.webp"
        type="image/webp"
      />
      <img
        class="bambu-logo"
        :class="{ 'bg-white': infoExpanded }"
        src="@/assets/bambu-lab-logo.png"
        alt="Bambu Lab Logo"
        loading="lazy"
      />
    </picture>
    <v-expand-transition>
      <div v-if="infoExpanded" class="info-expand">
        <span class="bambu-text">MakerWorld Model</span>
        <v-icon class="bambu-arrow">
          <arrow-forward-round />
        </v-icon>
      </div>
    </v-expand-transition>
  </a>
</template>

<style scoped lang="scss">
.bambu-button-wrapper {
  all: unset;

  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  gap: 8px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 2px solid #959595;
  border-radius: 4px;

  overflow: hidden;

  max-height: 56px;
  max-width: 56px;
  transition: max-width 300ms ease;
}

.bambu-button-wrapper.expanded {
  max-width: 280px;
}

.bambu-logo {
  width: 48px;
  height: 48px;
  transition: background-color 300ms ease;
}

.bambu-text {
  padding-inline: 8px;
  color: #959595;
  font-weight: 500;
  margin-left: 4px;
}
.bg-white {
  background-color: #ffffff;
}

.bambu-arrow {
  color: #ffffff;
  font-size: 24px;
  margin-right: 8px;
}

.info-expand {
  display: inline-flex;
  white-space: nowrap;
}
</style>
