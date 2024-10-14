import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ISpotify } from "@wrtn/connector-api/lib/structures/connector/spotify/ISpotify";
import { SpotifyProvider } from "../../../providers/connector/spotify/SpotifyProvider";

@Controller("connector/spotify")
export class SpotifyController {
  constructor(private readonly spotifyProvider: SpotifyProvider) {}
  @core.TypedRoute.Post("search-artists")
  async searchArtists(
    @TypedBody() input: ISpotify.ISearchArtistsInput,
  ): Promise<ISpotify.ISearchArtistsOutput> {
    return this.spotifyProvider.searchArtists(input);
  }

  @core.TypedRoute.Post("get-users-top-artists")
  async getUsersTopArtists(
    @TypedBody() input: ISpotify.IGetUsersTopArtistsInput,
  ): Promise<ISpotify.IGetUsersTopArtistsOutput> {
    return this.spotifyProvider.getUsersTopArtists(input);
  }

  @core.TypedRoute.Post("get-recommended-artists")
  async getRecommendedArtists(
    @TypedBody() input: ISpotify.IGetRecommendedArtistsInput,
  ): Promise<ISpotify.IGetRecommendedArtistsOutput> {
    return this.spotifyProvider.getRecommendedArtists(input);
  }

  @core.TypedRoute.Post("get-artists")
  async getArtists(
    @TypedBody() input: ISpotify.IGetArtistsInput,
  ): Promise<ISpotify.IGetArtistsOutput> {
    return this.spotifyProvider.getArtists(input);
  }

  @core.TypedRoute.Post("get-user-playlists")
  async getUserPlaylists(
    @TypedBody() input: ISpotify.IGetUserPlaylistsInput,
  ): Promise<ISpotify.IGetUserPlaylistsOutput> {
    return this.spotifyProvider.getUserPlaylists(input);
  }

  @core.TypedRoute.Post("get-artist-albums")
  async getArtistAlbums(
    @TypedBody() input: ISpotify.IGetArtistAlbumsInput,
  ): Promise<ISpotify.IGetArtistAlbumsOutput> {
    return this.spotifyProvider.getArtistAlbums(input);
  }

  @core.TypedRoute.Post("get-current-playing-track")
  async getCurrentPlayingTrack(
    @TypedBody() input: ISpotify.IGetCurrentPlayingTrackInput,
  ): Promise<ISpotify.IGetCurrentPlayingTrackOutput> {
    return this.spotifyProvider.getCurrentPlayingTrack(input);
  }

  @core.TypedRoute.Post("create-playlist")
  async createPlaylist(
    @TypedBody() input: ISpotify.ICreatePlaylistInput,
  ): Promise<ISpotify.ICreatePlaylistOutput> {
    return this.spotifyProvider.createPlaylist(input);
  }

  @core.TypedRoute.Post("get-recommendations")
  async getRecommendations(
    @TypedBody() input: ISpotify.IGetRecommendationsInput,
  ): Promise<ISpotify.IGetRecommendationsOutput> {
    return this.spotifyProvider.getRecommendations(input);
  }
}
