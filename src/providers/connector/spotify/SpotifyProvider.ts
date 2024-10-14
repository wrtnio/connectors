import { Injectable } from "@nestjs/common";
import { ISpotify } from "@wrtn/connector-api/lib/structures/connector/spotify/ISpotify";
import axios from "axios";

@Injectable()
export class SpotifyProvider {
  async getUserPlaylists(
    input: ISpotify.IGetUserPlaylistsInput,
  ): Promise<ISpotify.IGetUserPlaylistsOutput> {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/playlists",
      { headers: { Authorization: `Bearer ${input.accessToken}` } },
    );
    const playlists = response.data.items.map((playlist: any) => ({
      id: playlist.id,
      name: playlist.name,
      tracks: playlist.tracks.total,
    }));
    return { playlists };
  }
  
  async getArtistAlbums(
    input: ISpotify.IGetArtistAlbumsInput,
  ): Promise<ISpotify.IGetArtistAlbumsOutput> {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${input.artistId}/albums`,
      { headers: { Authorization: `Bearer ${input.accessToken}` } },
    );
    const albums = response.data.items.map((album: any) => ({
      id: album.id,
      name: album.name,
      release_date: album.release_date,
    }));
    return { albums };
  }
  
  async getCurrentPlayingTrack(
    input: ISpotify.IGetCurrentPlayingTrackInput,
  ): Promise<ISpotify.IGetCurrentPlayingTrackOutput> {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      { headers: { Authorization: `Bearer ${input.accessToken}` } },
    );
    const track = response.data.item;
    return {
      trac
      k: {
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
      },
    };
  }
  async createPlaylist(
    input: ISpotify.ICreatePlaylistInput,
  ): Promise<ISpotify.ICreatePlaylistOutput> {
    const response = await axios.post(
      `https://api.spotify.com/v1/users/${input.userId}/playlists`,
      { name: input.playlistName, public: false },
      {
        headers: {
          Authorization: `Bearer ${input.accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );
    return { playlistId: response.data.id };
  }
  
  async getRecommendations(
    input: ISpotify.IGetRecommendationsInput,
  ): Promise<ISpotify.IGetRecommendationsOutput> {
    const response = await axios.get(
      "https://api.spotify.com/v1/recommendations",
      {
        headers: { Authorization: `Bearer ${input.accessToken}` },
        params: { seed_tracks: input.seedTracks.join(",") },
      },
    );
    const tracks = response.data.tracks.map((track: any) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
    }));
    return { tracks };
  }
  
}
