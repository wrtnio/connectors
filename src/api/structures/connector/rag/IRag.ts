import { tags } from "typia";

export namespace IRag {
  /**
   * @title PDF 파일 RAG 분석을 위한 정보
   */
  interface IPdfInput {
    /**
     * 분석할 파일 경로
     *
     * @title 파일 경로
     */
    url: string & tags.Format<"uri"> & tags.ContentMediaType<"application/pdf">;

    /**
     * 분석할 파일의 확장자입니다.
     *
     * @title 파일 확장자.
     */
    type: tags.Constant<"pdf", { title: "PDF 파일" }>;
  }

  /**
   * @title DOCX 파일 RAG 분석을 위한 정보
   */
  interface IDocxInput {
    /**
     * 분석할 파일 경로
     *
     * @title 파일 경로
     */
    url: string &
      tags.Format<"uri"> &
      tags.ContentMediaType<"application/vnd.openxmlformats-officedocument.wordprocessingml.document">;

    /**
     * 분석할 파일의 확장자입니다.
     *
     * @title 파일 확장자.
     */
    type: tags.Constant<"docx", { title: "DOCX 파일" }>;
  }

  /**
   * @title HWP 파일 RAG 분석을 위한 정보
   */
  interface IHwpInput {
    /**
     * 분석할 파일 경로
     *
     * @title 파일 경로
     */
    url: string &
      tags.Format<"uri"> &
      tags.ContentMediaType<"application/vnd.hancom.hwp">;

    /**
     * 분석할 파일의 확장자입니다.
     *
     * @title 파일 확장자.
     */
    type: tags.Constant<"hwp", { title: "HWP 파일" }>;
  }

  /**
   * @title TXT 파일 RAG 분석을 위한 정보
   */
  interface ITextInput {
    /**
     * 분석할 파일 경로
     *
     * @title 파일 경로
     */
    url: string & tags.Format<"uri"> & tags.ContentMediaType<"text/plain">;

    /**
     * 분석할 파일의 확장자입니다.
     *
     * @title 파일 확장자.
     */
    type: tags.Constant<"txt", { title: "TXT 파일" }>;
  }

  /**
   * @title WEB 링크 RAG 분석을 위한 정보
   */
  interface ILinkInput {
    /**
     * 분석할 파일 경로
     *
     * @title 파일 경로
     */
    url: string & tags.Format<"uri">;

    /**
     * 분석할 파일의 확장자입니다.
     *
     * @title 파일 확장자.
     */
    type: tags.Constant<"html", { title: "웹 링크" }>;
  }

  /**
   * @title RAG 분석을 위해 필요한 정보
   */
  export type IAnalyzeInput =
    | IPdfInput
    | IDocxInput
    | IHwpInput
    | ITextInput
    | ILinkInput;

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
