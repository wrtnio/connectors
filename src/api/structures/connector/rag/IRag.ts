import { tags } from "typia";

export namespace IRag {
  /**
   * @title Knowledge that the chatbot will use to answer
   */
  export interface IAnalyzeInput {
    /**
     * Knowledge that the chatbot will use to answer
     *
     * @title Knowledge that the chatbot will use to answer
     */
    url: Array<
      string &
        tags.Format<"uri"> &
        tags.ContentMediaType<"application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.hancom.hwp, text/plain, text/html">
    >;
  }

  /**
   * @title RAG analysis results
   */
  export interface IAnalysisOutput {
    /**
     * Chat id required for RAG generation results.
     * Returns the chat id for the analyzed file to generate chat results for the file analyzed by RAG.
     * The same chat id is required to analyze multiple files and generate results for multiple files in the same chat.
     *
     * @title chat id
     */
    chatId: string;
  }

  /**
   * @title RAG Analysis Status
   */
  export interface IStatusOutput {
    /**
     * Analysis status.
     *
     * - RUNNING: Analysis in progress
     * - COMPLETED: Analysis completed
     * - FAILED: Analysis failed
     *
     * @title Analysis status
     */
    status: "RUNNING" | "COMPLETED" | "FAILED";
  }

  /**
   * @title Information required for chatting via RAG
   */
  export interface IGenerateInput {
    /**
     * This is a user utterance.
     *
     * @title User utterance
     */
    query: string;
  }

  /**
   * @title Chat results via RAG
   */
  export interface IGenerateOutput {
    /**
     * Response to RAG-based creation request.
     *
     * @title Response to utterance
     */
    answer: string;
  }
}
