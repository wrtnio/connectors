import { IConnector } from "../../common/IConnector";

export namespace IKeywordExtraction {
  /**
   * @title 키워드 추출을 위한 입력
   */
  export interface IExtractKeywordInput {
    /**
     * 키워드 추출을 위한 참고 자료
     *
     * @title 참고 자료
     */
    referenceContent: IConnector.IReferenceContent;

    /**
     * 키워드 추출을 위한 문맥 정보
     *
     * @title 문맥 정보
     */
    context: any;
  }

  export interface IExtractKeywordOutput {
    /**
     * 추출된 키워드
     */
    keyword: string;
  }
}
