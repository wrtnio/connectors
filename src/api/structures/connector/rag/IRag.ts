import { tags } from "typia";

export namespace IRag {
  /**
   * @title Information required for RAG analysis
   */
  export interface IAnalyzeInput {
    /**
     * File or link to be analyzed
     *
     * @title File or Link
     */
    url: string &
      tags.Format<"uri"> &
      tags.ContentMediaType<"application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.hancom.hwp, text/plain, text/html">;
  }

  /**
   * @title RAG analysis result
   */
  export interface IAnalysisOutput {
    /**
     * Chat ID required for generating RAG results.
     * Returns the chat ID for the analyzed file to generate chat results for the file analyzed by RAG.
     * To analyze multiple files and generate results for them in the same chat, the same chat ID is needed.
     *
     * @title Chat ID.
     */
    chatId: string;
  }

  /**
   * @title RAG analysis status
   */
  export interface IStatusOutput {
    /**
     * Analysis status.
     *
     * - RUNNING: Analysis in progress
     * - COMPLETED: Analysis completed
     * - FAILED: Analysis failed
     *
     * @title Analysis status.
     */
    status: "RUNNING" | "COMPLETED" | "FAILED";
  }

  /**
   * @title Previous utterance history
   */
  interface IHistory {
    /**
     * Role of the speaker.
     *
     * @title Speaker role.
     */
    role: "user" | "assistant";

    /**
     * Content of the utterance.
     *
     * @title Utterance content.
     */
    text: string;
  }

  /**
   * @title Information required for chat through RAG
   */
  export interface IGenerateInput {
    /**
     * User's utterance.
     *
     * @title User utterance.
     */
    query: string;

    /**
     * Previous utterance history.
     *
     * @title Previous utterance history.
     */
    histories?: IHistory[];
  }

  /**
   * @title Chat result through RAG
   */
  export interface IGenerateOutput {
    /**
     * Response to the RAG-based generation request.
     *
     * @title Response to the utterance.
     */
    answer: string;
  }
}
