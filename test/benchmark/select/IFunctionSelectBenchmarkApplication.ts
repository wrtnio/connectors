import { IHttpLlmFunction } from "@samchon/openapi";

export interface IFunctionSelectBenchmarkApplication {
  /**
   * Get list of API functions.
   *
   * If agent or user want to list up every remote API functions that
   * can be called from the backend server, utilize this function.
   */
  getApiFunctions(p: {}): IFunctionSelectBenchmarkApplication.IMetadata[];

  /**
   * Select proper API function to execute.
   *
   * If you can find some proper API function to call by analyzing the user's
   * conversation, please select the API endpoint by utilizing this function.
   *
   * @param props Properties of the function
   */
  selectFunction(props: IFunctionSelectBenchmarkApplication.IEndpoint): void;

  /**
   * Go to the next conversation.
   *
   * If there's nothing to remotely call to the API function from the user's
   * conversation, just call this function to keep going the next conversation.
   */
  next(p: {}): void;
}
export namespace IFunctionSelectBenchmarkApplication {
  /**
   * Metadata of API operation.
   */
  export type IMetadata = Pick<
    IHttpLlmFunction<"chatgpt">,
    "method" | "path" | "name" | "description"
  >;

  /**
   * API endpoint information.
   */
  export interface IEndpoint {
    /**
     * Method of the API function.
     */
    method: string;

    /**
     * Path of the API function.
     */
    path: string;

    /**
     * Representative name of the API function.
     */
    name: string;
  }
}
