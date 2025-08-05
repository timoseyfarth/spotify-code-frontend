import { ref } from "vue";
import { api } from '@/api/client.ts'
import { useFriendlyErrorMessage } from '@/composables/useFriendlyErrorMessage.ts'

export function useOembedHealthAPI() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const data = ref<{ status: string } | null>(null);

  const friendlyError = useFriendlyErrorMessage()

  async function fetchOembedHealth() {
    loading.value = true;
    error.value = null;
    try {
      data.value = await api.healthOembed();
    } catch (e: unknown) {
      friendlyError.rawError.value = e;
      error.value = friendlyError.message.value;
    } finally {
      loading.value = false;
    }
  }

  return { loading, error, data, fetchOembedHealth };
}
