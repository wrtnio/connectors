import { JMESPath, Placeholder, Prerequisite } from "@wrtnio/decorators";
import { tags } from "typia";
import { ContentMediaType } from "typia/lib/tags";
import { DeepNullablePartial } from "../../types/DeepNullablePartial";

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

  export interface Place {
    /**
     * @title name
     */
    name: string | null;

    /**
     * @title id
     */
    id: string | null;

    /**
     * @title types
     */
    types: string[] | null;

    /**
     * @title nationalPhoneNumber
     */
    nationalPhoneNumber: string | null;

    /**
     * @title internationalPhoneNumber
     */
    internationalPhoneNumber: string | null;

    /**
     * @title formattedAddress
     */
    formattedAddress: string | null;

    /**
     * @title location
     */
    location: {
      /**
       * @title latitude
       */
      latitude: (number & tags.Minimum<-90> & tags.Maximum<90>) | null;

      /**
       * @title longitude
       */
      longitude: (number & tags.Minimum<0> & tags.Maximum<360>) | null;
    };

    /**
     * @title rating
     */
    rating: (number & tags.Maximum<5>) | null;

    /**
     * @title googleMapsUri
     */
    googleMapsUri: (string & tags.Format<"iri">) | null;

    /**
     * @title websiteUri
     */
    websiteUri: (string & tags.Format<"iri">) | null;

    /**
     * @title regularOpeningHours
     */
    regularOpeningHours: {
      /**
       * @title openNow
       */
      openNow: boolean;

      /**
       * @title periods
       */
      periods: {
        /**
         * @title open
         */
        open: {
          /**
           * @title day
           */
          day: number & tags.Type<"uint32"> & tags.Minimum<0> & tags.Maximum<6>;

          /**
           * @title hour
           */
          hour: number &
            tags.Type<"uint32"> &
            tags.Minimum<0> &
            tags.Maximum<24>;

          /**
           * @title minute
           */
          minute: number &
            tags.Type<"uint32"> &
            tags.Minimum<0> &
            tags.Maximum<60>;
        };

        /**
         * @title close
         */
        close: {
          /**
           * @title day
           */
          day: number & tags.Type<"uint32"> & tags.Minimum<0> & tags.Maximum<6>;

          /**
           * @title hour
           */
          hour: number &
            tags.Type<"uint32"> &
            tags.Minimum<0> &
            tags.Maximum<24>;

          /**
           * @title minute
           */
          minute: number &
            tags.Type<"uint32"> &
            tags.Minimum<0> &
            tags.Maximum<60>;
        };
      }[];

      /**
       * @title weekdayDescriptions
       */
      weekdayDescriptions: string[];
    };

    /**
     * @title utcOffsetMinutes
     */
    utcOffsetMinutes: number & tags.Minimum<0> & tags.Maximum<1440>;

    /**
     * @title businessStatus
     */
    businessStatus: string | null;

    /**
     * @title priceLevel
     */
    priceLevel: string;

    /**
     * @title userRatingCount
     */
    userRatingCount: number & tags.Type<"uint64">;

    /**
     * @title displayName
     */
    displayName: {
      /**
       * @title text
       */
      text: string;

      /**
       * @title languageCode
       */
      languageCode: string;
    };

    /**
     * @title primaryTypeDisplayName
     */
    primaryTypeDisplayName: {
      /**
       * @title text
       */
      text: string;

      /**
       * @title languageCode
       */
      languageCode: string;
    };

    /**
     * @title takeout
     */
    takeout: boolean;

    /**
     * @title delivery
     */
    delivery: boolean;

    /**
     * @title dineIn
     */
    dineIn: boolean;

    /**
     * @title reservable
     */
    reservable: boolean;

    /**
     * @title servesBreakfast
     */
    servesBreakfast: boolean;

    /**
     * @title servesLunch
     */
    servesLunch: boolean;

    /**
     * @title servesDinner
     */
    servesDinner: boolean;

    /**
     * @title servesBeer
     */
    servesBeer: boolean;

    /**
     * @title servesBrunch
     */
    servesBrunch: boolean;

    /**
     * @title servesVegetarianFood
     */
    servesVegetarianFood: boolean;

    /**
     * @title primaryType
     */
    primaryType: string;

    /**
     * @title photos
     */
    photos: {
      /**
       * @title name
       */
      name: string;

      /**
       * @title widthPx
       */
      widthPx: number;

      /**
       * @title heightPx
       */
      heightPx: number;
    }[];

    /**
     * @title outdoorSeating
     */
    outdoorSeating: boolean | null;

    /**
     * @title liveMusic
     */
    liveMusic: boolean | null;

    /**
     * @title menuForChildren
     */
    menuForChildren: boolean | null;

    /**
     * @title servesCocktails
     */
    servesCocktails: boolean | null;

    /**
     * @title servesDessert
     */
    servesDessert: boolean | null;

    /**
     * @title servesCoffee
     */
    servesCoffee: boolean | null;

    /**
     * @title goodForChildren
     */
    goodForChildren: boolean | null;

    /**
     * @title allowsDogs
     */
    allowsDogs: boolean | null;

    /**
     * @title restroom
     */
    restroom: boolean | null;

    /**
     * @title goodForGroups
     */
    goodForGroups: boolean | null;

    /**
     * @title goodForWatchingSports
     */
    goodForWatchingSports: boolean | null;

    /**
     * @title paymentOptions
     */
    paymentOptions: {
      /**
       * @title acceptsCreditCards
       */
      acceptsCreditCards: boolean;

      /**
       * @title acceptsDebitCards
       */
      acceptsDebitCards: boolean;

      /**
       * @title acceptsCashOnly
       */
      acceptsCashOnly: boolean;

      /**
       * @title acceptsNfc
       */
      acceptsNfc: boolean;
    };

    /**
     * @title parkingOptions
     */
    parkingOptions: {
      /**
       * @title freeParkingLot
       */
      freeParkingLot: boolean;
    };

    /**
     * @title accessibilityOptions
     */
    accessibilityOptions?: {
      /**
       * @title wheelchairAccessibleParking
       */
      wheelchairAccessibleParking?: boolean | null;

      /**
       * @title wheelchairAccessibleSeating
       */
      wheelchairAccessibleSeating?: boolean | null;
    } | null;

    /**
     * @title googleMapsLinks
     */
    googleMapsLinks: {
      /**
       * @title Place URI
       */
      placeUri: string & tags.Format<"iri">;

      /**
       * @title Reviews URI
       */
      reviewsUri: string & tags.Format<"iri">;

      /**
       * @title Photos URI
       */
      photosUri: string & tags.Format<"iri">;
    };
  }

  export interface ISearchTextOutput {
    /**
     * @title Places
     */
    places: DeepNullablePartial<Place>[];

    /**
     * @title Page Token For Next Page
     */
    nextPageToken: string | null;
  }

  export interface ISearchTextInput {
    /**
     * @title search keyword
     */
    textQuery: string;

    /**
     * @title Page Token For Next Page
     */
    nextPageToken?: string;
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
    placeId?: string | null;
    /**
     * @title Name
     */
    text?: {
      /**
       * @title Name
       */
      text?:
        | null
        | (string &
            Placeholder<"대한민국 서울특별시 강남구 신사동 피자익스프레스">);
    };

    /**
     * @title Place Types
     */
    types: string[];
  }

  /**
   * @title Response of Autocomplete
   */
  export interface IAutocompleteOutput {
    /**
     * @title Response
     */
    suggestions?: ({
      /**
       * Meaning of candidate groups viewed as map search results
       *
       * @title Place Prediction
       */
      placePrediction: PlacePrediction | null;
    } | null)[];
  }

  /**
   * @title Input Parameter of Autocomplete
   */
  export interface IAutocompleteInput {
    /**
     * @title search keyword
     */
    input: string;

    /**
     * @title Search radius
     */
    circle?: {
      /**
       * It refers to a latitude value for specifying a space of an area to be searched.
       *
       * @title Latitude
       */
      latitude: number;

      /**
       * It refers to a longitude value for specifying a space of an area to be searched.
       *
       * @title Longitude
       */
      longitude: number;

      /**
       * This refers to the radial distance for specifying the space of the region to be searched. It is in meters.
       * default value is 500 meters.
       *
       * @title Radius
       */
      radius: number &
        tags.Default<500> &
        tags.Minimum<0> &
        tags.Maximum<50000>;
    };
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
