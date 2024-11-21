import { tags } from "typia";

export namespace IPrompt {
  /**
   * @title prompt input
   */
  export interface IRequest {
    /**
     * The primary task or request for the AI model. This field is mandatory.
     *
     * @title User Request
     */
    user_request: string &
      tags.Example<"Create a catchy and humorous advertising slogan based on the product name and features.">;

    /**
     * Optional instructions or guidelines for the AI model. The system prompt provides more granular control over the model's behavior than the user request.
     * AI model should follow the instructions or additional information provided.
     *
     * @title System Prompt
     */
    system_prompt?: string &
      tags.Example<"The advertising slogan should be friendly in tone and concise.">;

    /**
     * Additional context or data to be used by the AI model. This can include product information, user data, or any other relevant details.
     * You can provide data in various formats such as objects, arrays, etc.
     *
     * @title Additional Data
     */
    data?: any &
      tags.Example<`{ productName: "SuperShiny Shampoo", productFeatures: ["volumizing", "color-safe"] }`>;
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
