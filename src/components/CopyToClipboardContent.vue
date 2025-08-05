<script setup lang="ts">

import CopyClipboardButton from '@/components/CopyClipboardButton.vue'
import { computed } from 'vue'

const props = defineProps<{
  label: string,
  text: string,
}>()

const textDisplay = computed(() => {
  return props.text || ''
})

defineEmits<{
  copyToClipboard: () => void
}>()
</script>

<template>
  <div class="text-field-wrapper">
    <span class="text-label">{{ label }}</span>
    <div class="text-field-copy-to-clipboard">
<!--      <transition name="slide-fade" mode="out-in">-->
      <v-btn
        :key="textDisplay"
        variant="outlined"
        class="code-box"
        color="white"
        @click="$emit('copyToClipboard')"
      >
        {{ textDisplay }}
      </v-btn>
<!--      </transition>-->
      <CopyClipboardButton @copy-to-clipboard="$emit('copyToClipboard')"/>
    </div>
  </div>

</template>

<style scoped lang="scss">
.text-field-wrapper {
  display: flex;
  flex-direction: column;
}

.text-label {
  font-size: 1.3rem;
  color: #f4d6a2;
}

.text-field-copy-to-clipboard {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}
.code-box {
  width: 120px;
}

:deep(.code-box) {
  border-width: 2px !important;
}

//.slide-fade-enter-from {
//  opacity: 0;
//  transform: translateY(15px);
//}
//.slide-fade-enter-to {
//  opacity: 1;
//  transform: translateY(0);
//}
//.slide-fade-leave-from {
//  opacity: 1;
//  transform: translateY(0);
//}
//.slide-fade-leave-to {
//  opacity: 0;
//  transform: translateY(-15px);
//}
//.slide-fade-enter-active,
//.slide-fade-leave-active {
//  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
//  transition-delay: 0.23s;
//}
</style>
