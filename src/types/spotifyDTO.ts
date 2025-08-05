import type { SpotifyItemType } from '@/types/spotifyType.ts'

export interface ColorDTO {
  rgb: [number, number, number]
  hex: string
  name: string
}

export interface AlbumImageColorDTO {
  accent_color: ColorDTO
  code_color: ColorDTO
}

export interface SpotifyCodeBarsDTO {
  data_bars: number[]
  octal_part1: number
  octal_part2: number
}

export interface SpotifyCodeDTO {
  job_id: string
  title: string
  type: SpotifyItemType
  spotify_id: string
  spotify_url: string
  bars: SpotifyCodeBarsDTO
  album_image_color: AlbumImageColorDTO
}
