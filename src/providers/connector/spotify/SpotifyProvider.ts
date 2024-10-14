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
      {
        headers: { Authorization: `Bearer ${input.secretKey}` },
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

  // ... other methods ...
}
