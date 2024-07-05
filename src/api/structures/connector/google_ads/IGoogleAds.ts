import { ICommon } from "../common/ISecretValue";

export namespace IGoogleAds {
  export interface IGenerateKeywordIdeaInput
    extends ICommon.ISecret<"google", []> {
    url: string;
  }

  export interface IGenerateKeywordIdeaOutput {
    keywordIdeas: string[];
  }
}
