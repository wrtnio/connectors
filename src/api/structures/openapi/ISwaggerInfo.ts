import { tags } from "typia";

/**
 * Information about the API.
 *
 * @author Samchon
 */
export interface ISwaggerInfo {
  /**
   * The title of the API.
   */
  title: string;

  /**
   * A short description of the API.
   */
  description?: string;

  /**
   * A URL to the Terms of Service for the API.
   */
  termsOfService?: string & tags.Format<"uri">;

  /**
   * The contact information for the exposed API.
   */
  contact?: ISwaggerInfo.IContact;

  /**
   * The license information for the exposed API.
   */
  license?: ISwaggerInfo.ILicense;

  /**
   * Version of the API.
   */
  version: string;
}
export namespace ISwaggerInfo {
  /**
   * Contact information for the exposed API.
   */
  export interface IContact {
    /**
     * The identifying name of the contact person/organization.
     */
    name?: string;

    /**
     * The URL pointing to the contact information.
     */
    url?: string & tags.Format<"uri">;

    /**
     * The email address of the contact person/organization.
     *
     * @format email
     */
    email?: string;
  }

  /**
   * License information for the exposed API.
   */
  export interface ILicense {
    /**
     * The license name used for the API.
     */
    name: string;

    /**
     * A URL to the license used for the API.
     */
    url?: string & tags.Format<"uri">;
  }
}
