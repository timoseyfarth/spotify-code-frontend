import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { SnackMessage } from '@/types/snackMessage.ts'

const DEFAULT_TIMOUT = 3200
const DEFAULT_COLOR = 'info'

export const useSnackbarData = defineStore('snackbarData', () => {
  const queue = ref<SnackMessage[]>([]);

  function add(message: SnackMessage) {
    if (!message.text) {
      return;
    }
    message.timeout = message.timeout ?? DEFAULT_TIMOUT;
    message.color = message.color ?? DEFAULT_COLOR;
    queue.value.push(message)
  }

  return {
    queue,
    add,
  };
})
