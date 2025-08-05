import { ref, onMounted, onUnmounted } from 'vue';

export function useTouchDetector() {
  const isTouch = ref(false);

  function update() {
    isTouch.value = window.matchMedia('(pointer: coarse)').matches;
  }

  onMounted(() => {
    update();
    window.addEventListener('resize', update);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', update);
  });

  return { isTouch };
}
