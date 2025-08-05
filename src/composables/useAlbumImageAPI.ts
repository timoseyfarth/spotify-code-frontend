import { ref } from "vue";
import { api } from "@/api/client.ts";
import { useFriendlyErrorMessage } from '@/composables/useFriendlyErrorMessage.ts'
import { saveAs } from 'file-saver';

export function useAlbumImageAPI() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const blobUrl = ref<string | null>(null);

  const friendlyError = useFriendlyErrorMessage();

  async function fetchAlbumImage(jobId: string) {
    loading.value = true;
    error.value = null;
    blobUrl.value = null;


    try {
      const blob = await api.getAlbumImage(jobId);
      blobUrl.value = URL.createObjectURL(blob);
    } catch (e: unknown) {
      friendlyError.rawError.value = e;
      error.value = friendlyError.message.value;
    } finally {
      loading.value = false;
    }
  }

  async function downloadAlbumImage(jobId: string) {
    loading.value = true;
    error.value = null;

    try {
      const blob = await api.getAlbumImage(jobId);
      saveAs(blob, `album_image_${jobId}.png`);
    } catch (e: any) {
      friendlyError.rawError.value = e;
      error.value = friendlyError.message.value;
    } finally {
      loading.value = false;
    }
  }

  return { loading, error, blobUrl, fetchAlbumImage, downloadAlbumImage };
}
