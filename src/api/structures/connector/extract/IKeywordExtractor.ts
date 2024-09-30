import { IConnector } from "../../common/IConnector";

export namespace IKeywordExtraction {
  /**
   * @title Input for keyword extraction
   */
  export interface IExtractKeywordInput {
    /**
     * References for keyword extraction
     *
     * @title References
     */
    referenceContent: IConnector.IReferenceContent;

    /**
     * Contextual information for keyword extraction
     *
     * @title Contextual information
     */
    context: any;
  }

  export interface IExtractKeywordOutput {
    /**
     * Extracted Keywords
     */
    keyword: string;
  }
}
