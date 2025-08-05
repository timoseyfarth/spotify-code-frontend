import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getSpotifyItemTypeFromString, SpotifyItemType } from '@/types/spotifyType.ts'
import type { SpotifyCodeDTO } from '@/types/spotifyDTO.ts'

export const useSpotifyDataStore = defineStore('spotifyData', () => {
  const spotifyId = ref('')
  const spotifyType = ref<SpotifyItemType>(SpotifyItemType.None)

  const spotifyDataStack = ref<{ data: SpotifyCodeDTO, blobURL: string | null, requestWhileSaved: boolean }[]>([])

  const isValidSpotifyId = computed(() => {
    return spotifyId.value.trim().length > 0
  })
  const isValidSpotifyType = computed(() => {
    return spotifyType.value !== SpotifyItemType.None
  })
  const isValidInput = computed(() => {
    return isValidSpotifyId.value && isValidSpotifyType.value
  })

  const checkIfInputIsPresentInStack = computed(() => {
      return spotifyDataStack.value.some(item => item.data.spotify_id === spotifyId.value && item.data.type === spotifyType.value)
  })
  function setRequestWhileSavedOfCurrentInput() {
    const currentInput = spotifyDataStack.value.find(item => item.data.spotify_id === spotifyId.value && item.data.type === spotifyType.value);
    if (currentInput) {
      currentInput.requestWhileSaved = true;
    }
  }

  const noInputYet = ref(true)

  function updateSpotifyData(url: string) {
    if (!url) return
    const cleanedQuestionMarkUrl = url.includes('?') ? url.split('?')[0] : url
    const cleanedAnchorUrl = cleanedQuestionMarkUrl.includes('#') ? cleanedQuestionMarkUrl.split('#')[0] : cleanedQuestionMarkUrl
    const cleanedParamUrl = cleanedAnchorUrl.includes('&') ? cleanedAnchorUrl.split('&')[0] : cleanedAnchorUrl

    let urlObj;
    try {
      urlObj = new URL(cleanedParamUrl);
    } catch { return }

    const pathParts = urlObj.pathname.split('/').filter(part => part.length > 0);

    const typeIndex = pathParts.findIndex(part => getSpotifyItemTypeFromString(part) !== SpotifyItemType.None);
    const idIndex = typeIndex + 1;

    if (typeIndex === -1) return;
    if (idIndex >= pathParts.length) return;

    const newType = getSpotifyItemTypeFromString(pathParts[typeIndex]);
    const newId = newType === SpotifyItemType.None ? '' : pathParts[idIndex];

    noInputYet.value = false;
    spotifyType.value = newType;
    spotifyId.value = newId;
  }

  return { spotifyId, spotifyType, isValidInput, noInputYet,
    spotifyDataStack, checkIfInputIsPresentInStack,
    updateSpotifyData, setRequestWhileSavedOfCurrentInput };
})
