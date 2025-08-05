<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  error: string | null
}>()

const expanded = ref(false)
</script>

<template>
  <v-alert
    color="error"
    icon="$error"
    title="An error occurred"
    v-if="error"
    class="error-alert"
    closable
    prominent
  >
    {{ error }}
    <br />
    <div class="popup-msg text-decoration-underline" @click="expanded = !expanded">
      You are sure, that you are not the problem?
    </div>
    <v-expand-transition>
      <div v-if="expanded">
        If you are sure you are not the problem: It would mean much to me if you would
        <a href="mailto:spotify-code@seyfarth.dev">report the bug to me</a> &lt;3
      </div>
    </v-expand-transition>
  </v-alert>
</template>

<style scoped lang="scss">
.error-alert {
  position: fixed;
  top: 0;
  margin: 2rem 0;
  width: 50%;
  z-index: 1000;
}

@media (max-width: 600px) {
  .error-alert {
    width: 90%;
    left: 5%;
  }
}

.popup-msg {
  font-size: 0.9em;
  margin-top: 0.5em;
  color: #3c3c3c;
  cursor: pointer;
}
</style>
