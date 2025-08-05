import { computed, ref } from "vue";
import type { AxiosError } from "axios";

const NETWORK_MESSAGE = "Check your connection. Try disabling any VPN or proxy services.";
const SERVER_MESSAGE = "Double check your URL. Try copying and pasting your Spotify Share URL again.";
const RATE_LIMIT_MESSAGE = "You’ve sent too many requests too quickly. Please wait a moment and try again.";
const NOT_FOUND_MESSAGE = "This file could not be found. Maybe the link is outdated or the Spotify API  is down.";

export function useFriendlyErrorMessage() {
  const rawError = ref<unknown>(null);
  const actualError = computed(() => {
    if (rawError.value instanceof Error) {
      return rawError.value;
    } else if (typeof rawError.value === "string") {
      return new Error(rawError.value);
    } else {
      return new Error("An unknown error occurred");
    }
  })

  const message = computed(() => {
    const err = actualError.value;

    if (!err) return null;

    if (typeof err === "object" && "isAxiosError" in err) {
      const axiosErr = err as AxiosError<{ detail?: string }>;

      if (axiosErr.code === "ECONNABORTED" || !axiosErr.response) {
        return NETWORK_MESSAGE;
      }
      const status = axiosErr.response.status;
      const detail = axiosErr.response.data?.detail;

      if (status === 500) {
        return SERVER_MESSAGE;
      } else if (status === 429) {
        return RATE_LIMIT_MESSAGE;
      } else if (status === 404) {
        return NOT_FOUND_MESSAGE;
      } else if (status === 400) {
        return (detail ?? "The request was invalid.") + " " + SERVER_MESSAGE;
      }

      return detail ?? `Unexpected error occurred (HTTP ${status})`;
    }

    return err?.message ?? "Unknown error occurred.";
  });

  return {
    rawError,
    message,
  };
}
