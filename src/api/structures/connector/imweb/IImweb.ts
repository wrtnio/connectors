import { Constant } from "@wrtn/decorators";

export namespace IImweb {
  /**
   * @title Imweb Access Token을 발급 받기 위한 요청 DTO.
   *
   * Rest API를 사용하기 위해 먼저 API Key 와 Secret Key를 발급 받아야 한다.
   *
   * 해당 키는 사이트 단위로 생성된다.
   */
  export interface Credential {
    /**
     * @title api key.
     */
    key: string;

    /**
     * @title api secret.
     */
    secret: string;
  }

  /**
   * @title 아임웹 토큰 발급 요청 응답 DTO.
   */
  export interface IGetAccessTokenOutput {
    /**
     * @title response message.
     */
    msg: "SUCCESS";

    /**
     * @title IMWEB custom code.
     */
    code: Constant<200, { title: "성공을 의미하는 값" }>;

    /**
     * @title HTTP status code.
     */
    http_code: Constant<200, { title: "HTTP STATUS CODE 200" }>;

    /**
     * @title access token.
     */
    access_token: string;
  }
}
