import { JMESPath, Placeholder, Prerequisite } from "@wrtnio/decorators";
import { tags } from "typia";
import { ContentMediaType } from "typia/lib/tags";

export namespace IGoogleMap {
  /**
   * @title Information for searching restaurants on Google Maps
   */
  export interface IRequest {
    /**
     * Please enter your search term
     *
     * @title Search term
     */
    keyword: string & tags.MinLength<1> & Placeholder<"강남역 맛집">;
  }

  /**
   * @title Place Prediction
   */
  export interface PlacePrediction {
    /**
     * Place ID of Google map
     *
     * @title Place ID
     */
    placeId: string;
    /**
     * @title Name
     */
    text: {
      /**
       * @title Name
       */
      text: string &
        Placeholder<"대한민국 서울특별시 강남구 신사동 피자익스프레스">;
    };
  }

  /**
   * @title Response of Autocomplete
   */
  export interface IAutocompleteOutput {
    /**
     * @title Response
     */
    suggestions: {
      /**
       * Meaning of candidate groups viewed as map search results
       *
       * @title Place Prediction
       */
      placePrediction: PlacePrediction;
    }[];
  }

  /**
   * @title Input Parameter of Autocomplete
   */
  export interface IAutocompleteInput {
    /**
     * @title search keyword
     */
    input: string;
  }

  /**
   * @title Google Maps Restaurant Search Results
   */
  export interface IResponse {
    /**
     * It's the name of a restaurant.
     *
     * @title Name
     */
    title: string;

    /**
     * This is the unique ID of the restaurant.
     *
     * This is the information needed to search for reviews.
     *
     * @title unique ID
     */
    place_id: string;

    /**
     * Here are the coordinates for the restaurant.
     *
     * @title Coordinates
     */
    gps_coordinate: {
      /**
       * This is the latitude of the restaurant's coordinates.
       *
       * @title Latitude
       */
      latitude: number;

      /**
       * This is the coordinates of the restaurant.
       *
       * @title Longitude
       */
      longitude: number;
    };

    /**
     * Here are the restaurant ratings.
     *
     * @title ratings
     */
    rating?: number;

    /**
     * This is the number of restaurant reviews.
     *
     * @title Number of reviews
     */
    reviews?: number;

    /**
     * Here is the address of the restaurant.
     *
     * @title Address
     */
    address: string;

    /**
     * Information about whether the restaurant is currently operating.
     *
     * @title Operation Information
     */
    open_state?: string;

    /**
     * Here is the information on the restaurant's operating hours.
     *
     * @title Information on operating hours
     */
    operating_hours?: { [key: string]: string };

    /**
     * This is the phone number for the restaurant.
     *
     * @title Phone number
     */
    phone_number?: string;

    /**
     * Service options provided by the restaurant.
     *
     * @title Service options
     */
    service_options?: { [key: string]: boolean };

    /**
     * This is a user review of a delicious restaurant.
     *
     * @title User Review
     */
    user_review?: string;

    /**
     * This is a thumbnail image of a delicious restaurant.
     *
     * @title image
     */
    thumbnail?:
      | (string & tags.Format<"iri"> & ContentMediaType<"image/*">)
      | null;
  }

  export interface IReviewRequest {
    place_id: string &
      Prerequisite<{
        method: "post";
        path: "/connector/google-map/search";
        jmesPath: JMESPath<IResponse, "[].{value:place_id, label:place_id}">;
      }>;
  }

  /**
   * @title Review search results
   */
  export interface IReviewResponse {
    /**
     * Reviewer's name.
     *
     * @title Author's name
     */
    username: string;

    /**
     * Here are the review ratings.
     *
     * @title Review ratings
     */
    rating: number;

    /**
     * Here is the review content.
     *
     * @title Review content
     */
    description: string;

    /**
     * Here is the review link.
     *
     * @title Review Link
     */
    link: string & tags.Format<"iri">;

    /**
     * This is the image registered in the review.
     *
     * @title Review Image
     */
    images: Array<string & tags.Format<"iri"> & ContentMediaType<"image/*">>;

    /**
     * The date the review was written.
     *
     * @title Review Date
     */
    date: string;
  }
}
