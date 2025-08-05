export enum SpotifyItemType {
  None = "none",
  Album = "album",
  Track = "track",
  Episode = "episode",
  Playlist = "playlist",
}

export interface SpotifyTypeAttributes {
  label: string;
}

export const SpotifyType: Record<SpotifyItemType, SpotifyTypeAttributes> = {
  [SpotifyItemType.None]: { label: "Empty" },
  [SpotifyItemType.Album]: { label: "Album" },
  [SpotifyItemType.Track]: { label: "Song" },
  [SpotifyItemType.Episode]: { label: "Podcast" },
  [SpotifyItemType.Playlist]: { label: "Playlist" },
};

export function getSpotifyItemTypeFromString(type: string): SpotifyItemType {
  switch (type.toLowerCase()) {
    case "album":
      return SpotifyItemType.Album;
    case "track":
      return SpotifyItemType.Track;
    case "episode":
      return SpotifyItemType.Episode;
    case "playlist":
      return SpotifyItemType.Playlist;
    default:
      return SpotifyItemType.None;
  }
}
