
import { useSnackbarData } from '@/stores/snackbarData.ts'

export function useClipboard() {
  const copy = (text: string, context: string = '', displaySnackbar: boolean = true): void => {
    navigator.clipboard.writeText(text)
      .then(() => {
        if (displaySnackbar) {
          const successText = context ? `Copied ${context} to clipboard` : "Copied to clipboard";
          useSnackbarData().add({
            text: successText,
            color: "success",
          });
        }
      }
    ).catch((err) => {
      console.error("Failed to copy text: ", err);
      if (displaySnackbar) {
        const errorText = context ? `Failed to copy ${context} to clipboard` : "Failed to copy to clipboard";
        useSnackbarData().add({
          text: errorText,
          color: "error",
        });
      }
    });
  };

  return {
    copy,
  };
}
