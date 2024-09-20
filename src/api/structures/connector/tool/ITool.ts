export namespace ITool {
  export interface IGenerateInput {
    /**
     * Input values for using the tool. The key is the variable name used in the tool, and the value is the value of the variable.
     */
    [key: string]: string | string[];
  }

  /**
   * Here are the results of using the tool.
   */
  export interface IGenerateOutput {
    content: string;
  }
}
