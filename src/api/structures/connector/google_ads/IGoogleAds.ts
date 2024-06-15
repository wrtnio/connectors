import { ICommon } from "../common/ISecretValue";

export namespace IGoogleAds {
  export interface IGenerateKeywordIdeaInput
    extends ICommon.ISecret<"google", []> {
    /**
     * @title 접근하고자 하는 클라이언트의 아이디.
     */
    customerId: string;

    /**
     * @title 광고 키워드 아이디어 생성에 참조할 URL.
     */
    url: string;
  }

  export interface IGenerateKeywordIdeaOutput {
    /**
     * @title 키워드 아이디어.
     */
    keywordIdeas: string[];
  }
}
