import { Placeholder } from "@wrtn/decorators";

export namespace IPrompt {
  /**
   * @title 프롬프트 입력
   */
  export interface IRequest {
    /**
     * @title 유저 요청 사항
     */
    user_request: string & Placeholder<"">;

    /**
     * @title 시스템 프롬프트
     */
    system_prompt?: string & Placeholder<"">;
  }

  export interface IResponse {
    /**
     * @title 입력된 프롬프트를 통해 받은 결과
     */
    result: string;
  }
}
