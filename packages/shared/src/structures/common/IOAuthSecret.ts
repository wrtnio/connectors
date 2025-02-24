import { tags } from "typia";

export namespace IOAuthSecret {
  /**
   * 취득한 OAuth Secret 정보
   */
  export interface ISecretValue {
    id: string & tags.Format<"uuid">;
    key: string;
    code: string;
    value: string;
    scopes: string[];
  }

  /**
   * OAuth Secret 값 업데이트에 필요한 정보
   */
  export interface IUpdateSecretValueRequest {
    value: string;
  }
}
