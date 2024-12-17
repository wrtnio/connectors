export namespace IAirportInformation {
  /**
   * @title Airport information search conditions
   */
  export interface IRequest {
    /**
     * Enter the name of the country or city you want to search for.
     *
     * @title Search term
     */
    keyword: string;
  }

  /**
   * @title Airport information search results
   */
  export interface IResponse {
    /**
     * Country Name
     *
     * @title Country
     */
    country_name: string;

    /**
     * City Name
     *
     * @title City
     */
    city_name: string;

    /**
     * Airport Name
     *
     * @title Airport
     */
    airport_name: string;

    /**
     * Airport Code
     *
     * @title Airport Code
     */
    airport_code: string;
  }
}
