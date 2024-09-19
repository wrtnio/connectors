import { Placeholder } from "@wrtnio/decorators";

export namespace IPrompt {
  /**
   * @title prompt input
   */
  export interface IRequest {
    /**
     * @title User Request
     */
    user_request: string &
      Placeholder<"제품 이름과 제품 특징을 참고해서 광고 문구를 기발하고 유머러스하게 만들어주세요.">;

    /**
     * @title System Prompt
     */
    system_prompt?: string & Placeholder<"친절한 어투로 말해주세요.">;
  }

  /**
   * Results received via @title prompt
   */
  export interface IResponse {
    /**
     * @title Result received through input prompt
     */
    result: string;
  }
}
