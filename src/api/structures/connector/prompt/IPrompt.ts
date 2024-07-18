import { Placeholder } from "@wrtnio/decorators";

export namespace IPrompt {
  /**
   * @title 프롬프트 입력
   */
  export interface IRequest {
    /**
     * @title 유저 요청 사항
     */
    user_request: string &
      Placeholder<"제품 이름과 제품 특징을 참고해서 광고 문구를 기발하고 유머러스하게 만들어주세요.">;

    /**
     * @title 시스템 프롬프트
     */
    system_prompt?: string & Placeholder<"친절한 어투로 말해주세요.">;
  }

  /**
   * @title 프롬프트를 통해 받은 결과
   */
  export interface IResponse {
    /**
     * @title 입력된 프롬프트를 통해 받은 결과
     */
    result: string;
  }
}
