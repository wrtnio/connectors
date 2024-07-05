import { ICommon } from "../common/ISecretValue";

export namespace IGoogleAds {
  export interface IGenerateKeywordIdeaInput
    extends ICommon.ISecret<"google", []> {
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
