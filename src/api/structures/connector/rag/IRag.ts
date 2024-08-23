import { tags } from "typia";

export namespace IRag {
  /**
   * @title RAG 분석을 위해 필요한 정보
   */
  export interface IAnalyzeInput {
    /**
     * 분석할 파일 또는 링크
     *
     * @title 파일 또는 링크
     */
    url: string &
      tags.Format<"uri"> &
      tags.ContentMediaType<"application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.hancom.hwp, text/plain, text/html">;
  }

  /**
   * @title RAG 분석 결과물
   */
  export interface IAnalysisOutput {
    /**
     * RAG 생성 결과물에 필요한 chat id.
     * RAG로 분석된 파일에 대해 채팅 결과물을 생성하기 위해 분석된 파일에 대한 chat id를 반환합니다.
     * 여러 개의 파일을 분석시키고 같은 채팅에서 여러 파일에 대한 결과물을 생성하기 위해서는 같은 chat id가 필요합니다.
     *
     * @title chat id.
     */
    chatId: string;
  }

  /**
   * @title RAG 분석 상태
   */
  export interface IStatusOutput {
    /**
     * 분석 상태입니다.
     *
     * - RUNNING: 분석 중
     * - COMPLETED: 분석 완료
     * - FAILED: 분석 실패
     *
     * @title 분석 상태.
     */
    status: "RUNNING" | "COMPLETED" | "FAILED";
  }

  /**
   * @title RAG를 통한 채팅을 위해 필요한 정보
   */
  export interface IGenerateInput {
    /**
     * 유저의 발화입니다.
     *
     * @title 유저 발화.
     */
    query: string;
  }

  /**
   * @title RAG를 통한 채팅 결과
   */
  export interface IGenerateOutput {
    /**
     * RAG 기반 생성 요청에 대한 응답입니다.
     *
     * @title 발화에 대한 응답.
     */
    answer: string;
  }
}
