import { Injectable } from "@nestjs/common";
import { ISpotify } from "@wrtn/connector-api/lib/structures/connector/spotify/ISpotify";
import axios from "axios";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";

@Injectable()
export class SpotifyProvider {
  async searchArtists(
    input: ISpotify.ISearchArtistsInput,
  ): Promise<ISpotify.ISearchArtistsOutput> {
    try {
      const accessToken = await this.refresh(input.secretKey);
      const response = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: input.artistName,
          type: "artist",
          limit: input.limit ?? 10,
        },
      });

      const artists = response.data.artists.items;
      const pagination = {
        total: response.data.artists.total,
        limit: response.data.artists.limit,
        offset: response.data.artists.offset,
      };

      return { artists, pagination };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async getUsersTopArtists(
    input: ISpotify.IGetUsersTopArtistsInput,
  ): Promise<ISpotify.IGetUsersTopArtistsOutput> {
    try {
      const accessToken = await this.refresh(input.secretKey);
      const response = await axios.get(
        "https://api.spotify.com/v1/me/top/artists",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: {
            time_range: input.timeRange ?? "medium_term",
            limit: input.limit ?? 20,
            offset: input.offset ?? 0,
          },
        },
      );
      const artists = response.data.items.map((artist: any) => ({
        id: artist.id,
        name: artist.name,
        genres: artist.genres,
      }));
      const pagination = {
        total: response.data.total,
        limit: input.limit ?? 20,
        offset: input.offset ?? 0,
      };
      return { artists, pagination };
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getRecommendedTracks(
    input: ISpotify.IGetRecommendedTracksInput,
  ): Promise<ISpotify.IGetRecommendedTracksOutput> {
    try {
      const accessToken = await this.refresh(input.secretKey);
      const response = await axios.get(
        "https://api.spotify.com/v1/recommendations",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: {
            seed_artists: input.seedArtists.join(","),
            limit: input.limit ?? 20,
            offset: input.offset ?? 0,
          },
        },
      );

      const tracks = response.data.tracks;
      return { tracks };
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getArtists(
    input: ISpotify.IGetArtistsInput,
  ): Promise<ISpotify.IGetArtistsOutput> {
    try {
      const accessToken = await this.refresh(input.secretKey);
      const response = await axios.get(`https://api.spotify.com/v1/artists`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          ids: input.artistIds.join(","),
          limit: input.limit ?? 20,
          offset: input.offset ?? 0,
        },
      });

      const artists = response.data.artists;
      return { artists };
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getUserPlaylists(
    input: ISpotify.IGetUserPlaylistsInput,
  ): Promise<ISpotify.IGetUserPlaylistsOutput> {
    try {
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

      const playlists = response.data.items.map((item: any) => {
        item.tracks = item.tracks.total;
        return item;
      });
      const pagination = {
        total: response.data.total,
        limit: response.data.limit,
        offset: response.data.offset,
      };
      return { playlists, pagination };
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getArtistAlbums(
    input: ISpotify.IGetArtistAlbumsInput,
  ): Promise<ISpotify.IGetArtistAlbumsOutput> {
    try {
      const accessToken = await this.refresh(input.secretKey);
      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${input.artistId}/albums`,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );

      const albums = response.data.items;
      return { albums };
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  // async getCurrentPlayingTrack(
  //   input: ISpotify.IGetCurrentPlayingTrackInput,
  // ): Promise<ISpotify.IGetCurrentPlayingTrackOutput> {
  //   try {
  //     const accessToken = await this.refresh(input.secretKey);
  //     const response = await axios.get(
  //       "https://api.spotify.com/v1/me/player/currently-playing",
  //       { headers: { Authorization: `Bearer ${accessToken}` } },
  //     );
  //     const track = response.data.item;
  //     return track;
  //   } catch (err) {
  //     console.error(JSON.stringify(err));
  //     throw err;
  //   }
  // }

  async createPlaylist(
    input: ISpotify.ICreatePlaylistInput,
  ): Promise<ISpotify.ICreatePlaylistOutput> {
    try {
      const accessToken = await this.refresh(input.secretKey);
      const getUserIdInput = input as ISpotify.IGetCurrentUserProfileInput;
      const { id } = await this.getCurrentUserId(getUserIdInput);
      const response = await axios.post(
        `https://api.spotify.com/v1/users/${id}/playlists`,
        { name: input.playlistName, public: input.public },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      return { playlistId: response.data.id };
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getRecommendations(
    input: ISpotify.IGetRecommendationsInput,
  ): Promise<ISpotify.IGetRecommendationsOutput> {
    try {
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
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async refresh(secretKey: string): Promise<string> {
    try {
      const refresh_token = await OAuthSecretProvider.getSecretValue(secretKey);
      // Basic Auth에 필요한 사용자 이름과 비밀번호를 설정합니다.
      const username = ConnectorGlobal.env.SPOTIFY_CLIENT_ID;
      const password = ConnectorGlobal.env.SPOTIFY_CLIENT_SECRET;

      // Base64로 인코딩된 자격 증명을 생성합니다.
      const encodedCredentials = btoa(`${username}:${password}`);
      const url = "https://accounts.spotify.com/api/token";
      const res = await axios.post(
        url,
        {
          refresh_token,
          client_id: ConnectorGlobal.env.SPOTIFY_CLIENT_ID,
          grant_type: "refresh_token",
        },
        {
          headers: {
            Authorization: `Basic ${encodedCredentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      return res.data.access_token;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getCurrentUserId(
    input: ISpotify.IGetCurrentUserProfileInput,
  ): Promise<{ id: string; email: string }> {
    try {
      const accessToken = await this.refresh(input.secretKey);
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return response.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }
}
