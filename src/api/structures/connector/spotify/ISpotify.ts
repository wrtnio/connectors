import { tags } from "typia";
import { MyPick } from "../../types/MyPick";
import { ICommon } from "../common/ISecretValue";

export namespace ISpotify {
  /**
   * @title Search Artists Input
   *
   * Input interface for searching artists.
   */
  export interface ISearchArtistsInput extends ICommon.ISecret<"spotify"> {
    /**
     * @title Artist Name
     *
     * The name of the artist to search for.
     */
    artistName: string;

    /**
     * @title Limit
     *
     * Limits the number of search results. Default is 10.
     */
    limit?: number &
      tags.Type<"uint64"> &
      tags.Default<10> &
      tags.Minimum<1> &
      tags.Maximum<50>;

    /**
     * @title Offset
     *
     * The index of the first item to return. Default is 0.
     */
    offset?: number &
      tags.Type<"uint64"> &
      tags.Default<0> &
      tags.Maximum<100000>;
  }

  /**
   * @title Search Artists Output
   *
   * Output interface for returning search results of artists.
   */
  export interface ISearchArtistsOutput {
    /**
     * @title Artists
     *
     * An array containing the list of searched artists.
     */
    artists: Array<ISpotify.Artist>;

    /**
     * @title Pagination Info
     *
     * Information about pagination for the artists.
     */
    pagination: {
      total: number; // Total number of artists
      limit: number; // Number of artists per page
      offset: number; // Current offset
    };
  }

  /**
   * @title Get User's Top Artists Input
   *
   * Input interface for retrieving user's top artists.
   */
  export interface IGetUsersTopArtistsInput
    extends ICommon.ISecret<"spotify", ["user-top-read"]> {
    /**
     * @title Time Range
     *
     * Over what time frame the affinities are computed. Valid values: short_term (4 weeks), medium_term (6 months), long_term (several years). Default: medium_term.
     */
    timeRange?:
      | tags.Constant<"short_term", { title: "short_term" }>
      | tags.Constant<"medium_term", { title: "medium_term" }>
      | tags.Constant<"long_term", { title: "long_term" }>;

    /**
     * @title Limit
     *
     * The number of items to return. Default is 20.
     */
    limit?: number &
      tags.Type<"uint64"> &
      tags.Default<20> &
      tags.Minimum<0> &
      tags.Maximum<50>;

    /**
     * @title Offset
     *
     * The index of the first item to return. Default is 0.
     */
    offset?: number &
      tags.Type<"uint64"> &
      tags.Default<0> &
      tags.Maximum<100000>;
  }

  /**
   * @title Get User's Top Artists Output
   *
   * Output interface for retrieving user's top artists.
   */
  export interface IGetUsersTopArtistsOutput {
    /**
     * @title Artists
     *
     * An array containing the ID, name, and genres of top artists.
     */
    artists: Array<ISpotify.Artist>;

    /**
     * @title Pagination Info
     *
     * Information about pagination for the artists.
     */
    pagination: {
      total: number; // Total number of artists
      limit: number; // Number of artists per page
      offset: number; // Current offset
    };
  }

  /**
   * @title Get Recommended Tracks Input
   *
   * Input interface for retrieving recommended tracks.
   */
  export interface IGetRecommendedTracksInput
    extends ICommon.ISecret<"spotify"> {
    /**
     * @title Seed Artists
     *
     * An array of seed track IDs for recommendations.
     */
    seedArtists: Artist["id"][] & tags.MinItems<1> & tags.MaxItems<5>;

    /**
     * @title Limit
     *
     * The number of items to return. Default is 20.
     */
    limit?: number &
      tags.Type<"uint64"> &
      tags.Default<20> &
      tags.Minimum<0> &
      tags.Maximum<50>;

    /**
     * @title Offset
     *
     * The index of the first item to return. Default is 0.
     */
    offset?: number &
      tags.Type<"uint64"> &
      tags.Default<0> &
      tags.Maximum<100000>;
  }

  /**
   * @title Get Recommended Tracks Output
   *
   * Output interface for retrieving recommended tracks.
   */
  export interface IGetRecommendedTracksOutput {
    /**
     * @title Tracks
     *
     * An array containing the ID, name, and genres of recommended tracks.
     */
    tracks: Array<MyPick<ISpotify.Artist, "id" | "name">>;
  }

  /**
   * @title Get Artists Input
   *
   * Input interface for retrieving artists.
   */
  export interface IGetArtistsInput extends ICommon.ISecret<"spotify"> {
    /**
     * @title Artist IDs
     *
     * A comma-separated list of the Spotify IDs for the artists.
     */
    artistIds: string[] & tags.MaxItems<50>;

    /**
     * @title Limit
     *
     * The number of items to return. Default is 20.
     */
    limit?: number &
      tags.Type<"uint64"> &
      tags.Default<20> &
      tags.Minimum<0> &
      tags.Maximum<50>;

    /**
     * @title Offset
     *
     * The index of the first item to return. Default is 0.
     */
    offset?: number &
      tags.Type<"uint64"> &
      tags.Default<0> &
      tags.Maximum<100000>;
  }

  /**
   * @title Get Artists Output
   *
   * Output interface for retrieving artists.
   */
  export interface IGetArtistsOutput {
    /**
     * @title Artists
     *
     * An array containing the ID, name, and genres of artists.
     */
    artists: Array<ISpotify.Artist>;
  }

  /**
   * @title Get User Playlists Input
   *
   * Input interface for retrieving user playlists.
   */
  export interface IGetUserPlaylistsInput
    extends ICommon.ISecret<"spotify", ["playlist-read-private"]> {
    /**
     * @title Limit
     *
     * The number of items to return. Default is 20.
     */
    limit?: number &
      tags.Type<"uint64"> &
      tags.Default<20> &
      tags.Minimum<0> &
      tags.Maximum<50>;

    /**
     * @title Offset
     *
     * The index of the first item to return. Default is 0.
     */
    offset?: number &
      tags.Type<"uint64"> &
      tags.Default<0> &
      tags.Maximum<100000>;
  }

  /**
   * @title Get User Playlists Output
   *
   * Output interface for retrieving user playlists.
   */
  export interface IGetUserPlaylistsOutput {
    /**
     * @title Playlists
     *
     * An array containing the ID, name, and track count of playlists.
     */
    playlists: Array<{
      /**
       * @title Playlist ID
       */
      id: string;

      /**
       * @title PlayList Name
       */
      name: string;

      /**
       * @title PlayList Description
       */
      description: string;

      /**
       * @title Total Tracks
       */
      tracks: number;

      /**
       * @title Track Images
       */
      images: {
        height: number | null;
        width: number | null;

        /**
         * @title Image Link
         */
        url: string & tags.Format<"iri">;
      }[];
    }>;

    /**
     * @title Pagination Info
     *
     * Information about pagination for the playlists.
     */
    pagination: {
      total: number; // Total number of playlists
      limit: number; // Number of playlists per page
      offset: number; // Current offset
    };
  }

  /**
   * @title Get Artist Albums Input
   *
   * Input interface for retrieving artist albums.
   */
  export interface IGetArtistAlbumsInput extends ICommon.ISecret<"spotify"> {
    /**
     * @title Artist ID
     *
     * The ID of the artist.
     */
    artistId: string;
  }

  /**
   * @title Get Artist Albums Output
   *
   * Output interface for retrieving artist albums.
   */
  export interface IGetArtistAlbumsOutput {
    /**
     * @title Albums
     *
     * An array containing the ID, name, and release date of albums.
     */
    albums: Array<{
      id: string;

      /**
       * @title Total Tracks
       */
      total_tracks: number & tags.Type<"uint64">;

      /**
       * @title Album Name
       */
      name: string;

      /**
       * @title Release Date
       */
      release_date: string;
      images: {
        height: number | null;
        width: number | null;

        /**
         * @title Image Link
         */
        url: string & tags.Format<"iri">;
      }[];

      /**
       * @title Artists
       */
      artists: MyPick<ISpotify.Artist, "id" | "name">[];
    }>;
  }

  /**
   * @title Get Current Playing Track Input
   *
   * Input interface for retrieving the currently playing track.
   */
  export type IGetCurrentPlayingTrackInput = ICommon.ISecret<
    "spotify",
    ["user-read-currently-playing"]
  >;

  /**
   * @title Get Current Playing Track Output
   *
   * Output interface for retrieving the currently playing track.
   */
  export interface IGetCurrentPlayingTrackOutput {
    /**
     * @title Track Information
     *
     * Contains the ID, name, artist, and album information of the track.
     */
    track: { id: string; name: string; artist: string; album: string };
  }

  /**
   * @title Create Playlist Input
   *
   * Input interface for creating a playlist.
   */
  export interface ICreatePlaylistInput
    extends ICommon.ISecret<
      "spotify",
      [
        "playlist-modify-public",
        "playlist-modify-private",
        "user-read-private", // 유저의 아이디를 알아야 추가할 수 있으나, 유저 아이디를 조회하려면 이 스코프가 필요
        "user-read-email", // 유저의 아이디를 알아야 추가할 수 있으나, 유저 아이디를 조회하려면 이 스코프가 필요
      ]
    > {
    /**
     * @title User ID
     *
     * The ID of the user.
     */
    userId: string;

    /**
     * @title Playlist Name
     *
     * The name of the playlist to be created.
     */
    playlistName: string;

    /**
     * @title public
     */
    public: boolean;
  }

  /**
   * @title Create Playlist Output
   *
   * Output interface for creating a playlist.
   */
  export interface ICreatePlaylistOutput {
    /**
     * @title Playlist ID
     *
     * The ID of the created playlist.
     */
    playlistId: string;
  }

  /**
   * @title Get Recommendations Input
   *
   * Input interface for retrieving recommended tracks.
   */
  export interface IGetRecommendationsInput extends ICommon.ISecret<"spotify"> {
    /**
     * @title Seed Tracks
     *
     * An array of seed track IDs for recommendations.
     */
    seedTracks: string[];
  }

  /**
   * @title Get Recommendations Output
   *
   * Output interface for retrieving recommended tracks.
   */
  export interface IGetRecommendationsOutput {
    /**
     * @title Recommended Tracks
     *
     * An array containing the ID, name, and artist information of recommended tracks.
     */
    tracks: Array<{ id: string; name: string; artist: string }>;
  }

  export type IGetCurrentUserProfileInput = ICommon.ISecret<
    "spotify",
    ["user-read-private", "user-read-email"]
  >;

  export interface Artist {
    /**
     * @title Artist ID
     *
     * The Spotify ID of the artist.
     */
    id: string;

    /**
     * @title Artist Name
     *
     * The name of the artist.
     */
    name: string;

    /**
     * @title Genres
     *
     * A list of genres the artist belongs to.
     */
    genres: string[];

    /**
     * @title Popularity
     *
     * A score representing the popularity of the artist.
     */
    popularity: number & tags.Type<"uint32">;
  }

  export interface Track {
    /**
     * @title Track ID
     */
    id: string;

    /**
     * @title Track Name
     */
    name: string;

    /**
     * @title Artist List
     */
    artists: Array<ISpotify.Artist>;

    /**
     * @title Duration
     */
    duration_ms: number & tags.Type<"uint64">;

    /**
     * @title Popularity
     *
     * A score representing the popularity of the artist.
     */
    popularity: number & tags.Type<"uint32">;

    /**
     * @title preview audio link
     */
    preview_url: string & tags.Format<"iri">;
  }
}
