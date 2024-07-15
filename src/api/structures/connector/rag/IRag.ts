import { tags } from "typia";

/**
 * - PDF: PDF 파일.
 * - DOCS: DOCS 파일.
 * - HWP: HWP 파일.
 * - TXT: TXT 파일.
 *
 * @title 파일 형식.
 */
export enum FileType {
  PDF = "pdf",
  DOCS = "docx",
  HWP = "hwp",
  TXT = "txt",
}

export namespace IRag {
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
    fileType: FileType;
  }

  export interface IAnalysisOutput {
    /**
     * 분석 작업의 고유 id 입니다.
     *
     * @title job id.
     */
    jobId: string;

    /**
     * rag 생성 결과물에 필요한 chat id.
     *
     * @title chat id.
     */
    chatId: string;
  }

  export interface IStatusOutput {
    /**
     * 분석 상태입니다.
     *
     * - RUNNING: 색인 중
     * - COMPLETED: 색인 완료
     * - FAILED: 색인 실패
     *
     * @title 분석 상태.
     */
    status: "RUNNING" | "COMPLETED" | "FAILED";
  }

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

  export interface IGenerateInput {
    /**
     * 분석할 document의 id입니다.
     *
     * @title document id.
     */
    docId: string;

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

  export interface IGenerateOutput {
    /**
     * RAG 기반 생성 요청에 대한 응답입니다.
     *
     * @title 발화에 대한 응답.
     */
    answer: string;
  }
}
