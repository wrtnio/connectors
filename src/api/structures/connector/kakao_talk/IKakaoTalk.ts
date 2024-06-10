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
   * @title 카카오 메시지 본문 상의 버튼을 의미.
   */
  export interface Button {
    title: string;
    link: IWebLink | IMobileWebLink | IAndroidAppLink | IiOSAppLink;
  }

  export interface IWebLink {
    /**
     * @title PC버전 카카오톡에서 사용하는 웹 링크 URL.
     *
     * 도메인 부분은 [내 애플리케이션] > [플랫폼] > [Web]에서 등록한 사이트 도메인과 일치해야 함.
     */

    web_url: string;
  }

  export interface IMobileWebLink {
    /**
     * @title 모바일 카카오톡에서 사용하는 웹 링크 URL.
     *
     * 도메인 부분은 [내 애플리케이션] > [플랫폼] > [Web]에서 등록한 사이트 도메인과 일치해야 함.
     */
    mobile_web_url: string;
  }

  export interface IAndroidAppLink {
    /**
     * @title 안드로이드 카카오톡에서 사용하는 앱 링크 URL에 사용될 파라미터.
     *
     * 해당 값이 없을 경우 mobile_web_url 이용.
     */
    android_execution_params: string;
  }

  export interface IiOSAppLink {
    /**
     * @title iOS 카카오톡에서 사용하는 앱 링크 URL에 사용될 파라미터.
     *
     * 해당 값이 없을 경우 mobile_web_url 이용.
     */
    ios_execution_params: string;
  }

  /**
   * 텍스트 타입으로 전송할 메시지의 입력 DTO.
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
      text: string & tags.MaxLength<200>;

      /**
       * @title message link.
       */
      link: {
        web_url: string & tags.Format<"url">;
        mobile_web_url: string & tags.Format<"url">;
      };

      /**
       * @title 버튼의 이름.
       *
       * `button`이 있을 시에는 `button` 프로퍼티를 우선시한다.
       *
       * 기본 버튼 타이틀("자세히 보기")을 변경하고 싶을 때 설정.
       */
      button_title?: string;

      /**
       * @title 버튼.
       *
       * 버튼 목록, 최대 2개.
       *
       * 버튼 타이틀과 링크를 변경하고 싶을 때, 버튼 두 개를 넣고 싶을 때 사용.
       */
      buttons?: IKakaoTalk.Button & tags.MaxLength<2>;
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
