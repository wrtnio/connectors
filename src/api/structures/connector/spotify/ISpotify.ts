import { tags } from "typia";
import { ICommon } from "./ICommon";

export namespace ISpotify {
  /**
   * @title Get User Playlists Input
   * 
   * Input interface for retrieving user playlists.
   */
  export interface IGetUserPlaylistsInput extends ICommon.ISecret<"spotify"> {
    /**
     * @title Limit
     * 
     * The number of items to return. Default is 20.
     */
    limit?: number & tags.Default<20>;

    /**
     * @title Offset
     * 
     * The index of the first item to return. Default is 0.
     */
    offset?: number & tags.Default<0>;
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
    playlists: Array<{ id: string; name: string; tracks: number }>;

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
    albums: Array<{ id: string; name: string; release_date: string }>;
  }

  /**
   * @title Get Current Playing Track Input
   * 
   * Input interface for retrieving the currently playing track.
   */
  export interface IGetCurrentPlayingTrackInput extends ICommon.ISecret<"spotify"> {
    // No additional properties are needed.
  }

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
  export interface ICreatePlaylistInput extends ICommon.ISecret<"spotify"> {
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
}
