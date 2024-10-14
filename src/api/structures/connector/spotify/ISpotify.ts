import { tags } from "typia";
import { ICommon } from "../common/ISecretValue";

export namespace ISpotify {
  // ... existing code ...

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
    artistIds: string & tags.Format<"csv">;

    /**
     * @title Limit
     * 
     * The number of items to return. Default is 20.
     */
    limit?: number & tags.Type<"uint64"> & tags.Default<20> & tags.Minimum<0> & tags.Maximum<50>;

    /**
     * @title Offset
     * 
     * The index of the first item to return. Default is 0.
     */
    offset?: number & tags.Type<"uint64"> & tags.Default<0> & tags.Maximum<100000>;
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
    artists: Array<{ id: string; name: string; genres: string[] }>;

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
}