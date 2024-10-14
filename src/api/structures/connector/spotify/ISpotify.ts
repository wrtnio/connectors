export namespace ISpotify {
  export interface IGetUserPlaylistsInput {
    accessToken: string;
  }

  export interface IGetUserPlaylistsOutput {
    playlists: Array<{ id: string; name: string; tracks: number }>;
  }

  export interface IGetArtistAlbumsInput {
    artistId: string;
    accessToken: string;
  }

  export interface IGetArtistAlbumsOutput {
    albums: Array<{ id: string; name: string; release_date: string }>;
  }

  export interface IGetCurrentPlayingTrackInput {
    accessToken: string;
  }

  export interface IGetCurrentPlayingTrackOutput {
    track: { id: string; name: string; artist: string; album: string };
  }

  export interface ICreatePlaylistInput {
    userId: string;
    playlistName: string;
    accessToken: string;
  }

  export interface ICreatePlaylistOutput {
    playlistId: string;
  }

  export interface IGetRecommendationsInput {
    seedTracks: string[];
    accessToken: string;
  }

  export interface IGetRecommendationsOutput {
    tracks: Array<{ id: string; name: string; artist: string }>;
  }
}
