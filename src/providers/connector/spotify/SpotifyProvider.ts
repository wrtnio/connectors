import { Injectable } from "@nestjs/common";
import { ISpotify } from "@wrtn/connector-api/lib/structures/connector/spotify/ISpotify";
import axios from "axios";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";

@Injectable()
export class SpotifyProvider {
  async getUserPlaylists(
    input: ISpotify.IGetUserPlaylistsInput,
  ): Promise<ISpotify.IGetUserPlaylistsOutput> {
    const accessToken = await this.refresh(input.secretKey);
    const response = await axios.get(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          limit: input.limit ?? 20,
          offset: input.offset ?? 0,
        },
      },
    );
    const playlists = response.data.items.map((playlist: any) => ({
      id: playlist.id,
      name: playlist.name,
      tracks: playlist.tracks.total,
    }));
    const pagination = {
      total: response.data.total,
      limit: response.data.limit,
      offset: response.data.offset,
    };
    return { playlists, pagination };
  }

  async getArtistAlbums(
    input: ISpotify.IGetArtistAlbumsInput,
  ): Promise<ISpotify.IGetArtistAlbumsOutput> {
    const accessToken = await this.refresh(input.secretKey);
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${input.artistId}/albums`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
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
    const accessToken = await this.refresh(input.secretKey);
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    const track = response.data.item;
    return {
      track: {
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
    const accessToken = await this.refresh(input.secretKey);
    const response = await axios.post(
      `https://api.spotify.com/v1/users/${input.userId}/playlists`,
      { name: input.playlistName, public: false },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );
    return { playlistId: response.data.id };
  }

  async getRecommendations(
    input: ISpotify.IGetRecommendationsInput,
  ): Promise<ISpotify.IGetRecommendationsOutput> {
    const accessToken = await this.refresh(input.secretKey);
    const response = await axios.get(
      "https://api.spotify.com/v1/recommendations",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
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

  async refresh(secretKey: string): Promise<string> {
    const refresh_token = await OAuthSecretProvider.getSecretValue(secretKey);
    const url = "https://accounts.spotify.com/api/token";
    const res = await axios.post(url, {
      refresh_token,
      client_id: ConnectorGlobal.env.SPOTIFY_CLIENT_SECRET,
      grant_type: "refresh_token",
    });

    return res.data.access_token;
  }
}
