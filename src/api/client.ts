import type { SpotifyCodeDTO } from "@/types/spotifyDTO";
import { request, requestBlob } from '@/api/axiosClient.ts'

export const api = {
  health: () => request<{ status: string }>("/health"),
  healthOembed: () => request<{ status: string }>("/health/oembed"),
  getSpotifyCode: (type: string, id: string) =>
    request<SpotifyCodeDTO>( `/code/${type}/${id}`),
  getAlbumImage: (jobId: string) =>
    requestBlob(`/album/${jobId}/image`),
  getA4Pdf: (jobId: string) =>
    requestBlob(`/pdf/${jobId}/a4`),
}
