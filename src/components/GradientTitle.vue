<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <h1 class="gradient-text">{{ title }}</h1>
</template>

<style scoped lang="scss">
.gradient-text {
  font-size: 5rem;
  font-weight: bold;
  line-height: 1.3;
  background: linear-gradient(45deg, #f3ec78, #00ae42);
  background-clip: text;
  color: transparent;
}

@media (max-width: 800px) {
  .gradient-text {
    font-size: 4rem;
  }
}
</style>
