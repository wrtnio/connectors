import { Constant } from "@wrtn/decorators";
import { tags } from "typia";

import { ICommon } from "../common/ISecretValue";

export namespace IKakaoTalk {
  /**
   * @title 카카오 로그인 후 받게 되는 코드 DTO.
   */
  export interface IAuthorizationCode {
    /**
     * @title kakaoTalk OAuth2 authorization code.
     */
    code: string;
  }

  /**
   * @title 액세스 토큰 출력 DTO.
   */
  export interface IGetAccessTokenOutput {
    /**
     * @title 액세스 토큰.
     */
    access_token: string;

    /**
     * @title 토큰 타입.
     */
    token_type: "bearer";

    /**
     * @title 리프레시 토큰.
     */
    refresh_token: string;

    /**
     * @title 이 액세스 토큰의 권한 범위.
     */
    scope: string;

    /**
     * @title 액세스 토큰 만료 시간.
     */
    expires_in: number;

    /**
     * @title 리프레시 토큰 만료 시간.
     */
    refresh_token_expires_in: number;
  }

  /**
   * @title 카카오 액세스 토큰을 갱신하기 위한 DTO.
   */
  export interface IRefreshAccessTokenInput {
    refresh_token: string;
  }

  /**
   * @title 액세스 토큰 갱신 출력 DTO.
   */
  export type IRefreshAccessTokenOutput = Pick<
    IGetAccessTokenOutput,
    "access_token" | "expires_in" | "token_type"
  >;

  /**
   * 전송할 메시지의 입력 DTO.
   */
  export interface ITextMemoInput
    extends ICommon.ISecret<
      "kakao",
      ["talk_message", "profile_image", "profile_nickname"]
    > {
    template_object: {
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

      /**
       * @title 버튼의 이름.
       */
      button_title?: string;
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
