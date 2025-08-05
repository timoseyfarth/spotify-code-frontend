import { onUnmounted, ref } from 'vue'
import { api } from "@/api/client.ts";
import { useFriendlyErrorMessage } from '@/composables/useFriendlyErrorMessage.ts'

export function usePdfDownloaderAPI() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const friendlyError = useFriendlyErrorMessage();

  const lastPrintUrl = ref<string | null>(null);
  const lastPrintIframe = ref<HTMLIFrameElement | null>(null);

  async function openPdfInNewTab(jobId: string) {
    loading.value = true;
    error.value = null;

    try {
      const blob = await api.getA4Pdf(jobId);
      // const url = `${import.meta.env.VITE_API_BASE_URL}/spotify/pdf/${jobId}/a4`
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      URL.revokeObjectURL(url);
    } catch (e: unknown) {
      friendlyError.rawError.value = e;
      error.value = friendlyError.message.value;
    } finally {
      loading.value = false;
    }
  }

  async function downloadPdf(jobId: string) {
    loading.value = true;
    error.value = null;

    try {
      const blob = await api.getA4Pdf(jobId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `print-your-song_${jobId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e: unknown) {
      friendlyError.rawError.value = e;
      error.value = friendlyError.message.value;
    } finally {
      loading.value = false;
    }
  }

  async function openPrinterDialog(jobId: string) {
    loading.value = true;
    error.value = null;
    try {
      cleanupLastPrint()

      const blob = await api.getA4Pdf(jobId);

      const url = URL.createObjectURL(blob);
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = url;

      document.body.appendChild(iframe);

      iframe.onload = () => {
        const win = iframe.contentWindow;
        if (win) {
          win.focus();
          win.print();
        }
        loading.value = false;

        lastPrintUrl.value = url;
        lastPrintIframe.value = iframe;
      }
    } catch (e: unknown) {
      friendlyError.rawError.value = e;
      error.value = friendlyError.message.value;
    } finally {
      loading.value = false;
    }
  }



  function cleanupLastPrint() {
    if (lastPrintUrl.value) {
      URL.revokeObjectURL(lastPrintUrl.value);
      lastPrintUrl.value = null;
    }
    if (lastPrintIframe.value) {
      document.body.removeChild(lastPrintIframe.value);
      lastPrintIframe.value = null;
    }
  }

  onUnmounted(() => {
    cleanupLastPrint()
  })

  return { loading, error, openPdfInNewTab, downloadPdf, openPrinterDialog };
}
