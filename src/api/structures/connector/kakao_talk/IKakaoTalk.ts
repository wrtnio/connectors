import { Constant } from "@wrtn/decorators";
import { tags } from "typia";

import { ICommon } from "../common/ISecretValue";

export namespace IKakaoTalk {
  /**
   * 전송할 메시지의 입력 DTO.
   */
  export interface ITextMemoInput extends ICommon.ISecret<"kakao", []> {
    object_template: {
      /**
       * @title 전송할 메시지의 타입.
       */
      object_type: Constant<
        "text",
        {
          title: "텍스트 타입의 템플릿.";
          description: "단순히 텍스트 메세지를 보내기 위해 사용한다.";
        }
      >;

      /**
       * @title message body.
       */
      text: string;

      /**
       * @title message link.
       */
      link: {
        web_url: string & tags.Format<"url">;
        mobile_web_url: string & tags.Format<"url">;
      };
    };
  }

  export interface IMemoOutput {
    /**
     * @title 응답 코드.
     */
    result_code: Constant<
      0,
      {
        title: "성공.";
        description: "메시지 전송에 성공한 경우를 의미.";
      }
    >;
  }
}
