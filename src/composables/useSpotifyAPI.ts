import { ref } from "vue";
import type { SpotifyCodeDTO } from "@/types/spotifyDTO.ts";
import { SpotifyItemType } from "@/types/spotifyType.ts";
import { api } from '@/api/client.ts'
import { useFriendlyErrorMessage } from '@/composables/useFriendlyErrorMessage.ts'

export function useSpotifyCodeAPI() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const data = ref<SpotifyCodeDTO | null>(null);

  const friendlyError = useFriendlyErrorMessage()

  async function fetchCode(type: SpotifyItemType, id: string) {
    loading.value = true;
    error.value = null;
    try {
      data.value = (await api.getSpotifyCode(type, id))
    } catch (e: unknown) {
      friendlyError.rawError.value = e;
      error.value = friendlyError.message.value
    } finally {
      loading.value = false
    }
  }

  return { loading, error, data, fetchCode };
}
