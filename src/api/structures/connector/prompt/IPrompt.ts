import { Placeholder } from "@wrtnio/decorators";

export namespace IPrompt {
  /**
   * @title prompt input
   */
  export interface IRequest {
    /**
     * The primary task or request for the AI model. This field is mandatory.
     *
     * @title User Request
     * @example "Create a catchy and humorous advertising slogan based on the product name and features."
     */
    user_request: string;

    /**
     * Optional instructions or guidelines for the AI model. The system prompt provides more granular control over the model's behavior than the user request.
     * AI model should follow the instructions or additional information provided.
     *
     * @title System Prompt
     * @example "The advertising slogan should be friendly in tone and concise."
     */
    system_prompt?: string;

    /**
     * Additional context or data to be used by the AI model. This can include product information, user data, or any other relevant details.
     * You can provide data in various formats such as objects, arrays, etc.
     *
     * @title Additional Data
     * @example { productName: "SuperShiny Shampoo", productFeatures: ["volumizing", "color-safe"] }
     */
    data?: any;
  }

  /**
   * Results received via prompt
   *
   *  @title prompt output
   */
  export interface IResponse {
    /**
     * @title Result received through input prompt
     */
    result: string;
  }
}
