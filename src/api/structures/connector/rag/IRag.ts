import { tags } from "typia";

export namespace IRag {
  /**
   * @title RAG 분석을 위해 필요한 정보
   */
  export interface IAnalyzeInput {
    /**
     * 분석할 파일 경로
     *
     * @title 파일 경로
     */
    fileUrl: string & tags.Format<"uri">;

    /**
     * 분석할 파일의 확장자입니다.
     *
     * @title 파일 확장자.
     */
    fileType:
      | tags.Constant<"pdf", { title: "PDF 파일" }>
      | tags.Constant<"docx", { title: "DOCX 파일" }>
      | tags.Constant<"hwp", { title: "HWP 파일" }>
      | tags.Constant<"txt", { title: "TXT 파일" }>
      | tags.Constant<"html", { title: "웹 링크" }>;
  }

  /**
   * @title RAG 분석 결과물
   */
  export interface IAnalysisOutput {
    /**
     * rag 생성 결과물에 필요한 chat id.
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
   * @title 이전 발화 내역
   */
  interface IHistory {
    /**
     * 발화자의 역할입니다.
     *
     * @title 발화자 역할.
     */
    role: "user" | "assistant";

    /**
     * 발화 내용입니다.
     *
     * @title 발화 내용.
     */
    text: string;
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

    /**
     * 이전 발화 내역입니다.
     *
     * @title 이전 발화 내역.
     */
    histories?: IHistory[];
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
