/**
 * - PDF: PDF 파일.
 *
 * @title 파일 형식.
 */
export enum FileType {
  PDF = "pdf",
}

export namespace IRag {
  export interface IAnalyzeInput {
    /**
     * 분석할 파일 경로 리스트입니다.
     *
     * @title 파일 경로 리스트.
     */
    fileUrls: string[];

    /**
     * 분석할 파일의 확장자입니다.
     *
     * @title 파일 확장자.
     */
    fileType: FileType;
  }

  export interface IAnalysisOutput {
    /**
     * 분석된 document의 id입니다.
     *
     * @title document id.
     */
    docId: string;
  }

  export interface IStatusOutput {
    /**
     * 분석 상태입니다.
     *
     * - INDEXING: 색인 중
     * - INDEXED: 색인 완료
     * - FAILED: 색인 실패
     *
     * @title 분석 상태.
     */
    status: "INDEXING" | "INDEXED" | "FAILED";
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
