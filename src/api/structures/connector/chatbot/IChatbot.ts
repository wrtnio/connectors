export namespace IChatbot {
  /**
   * @title 챗봇 사용을 위한 기본 정보
   */
  export interface IChatBotBase {
    /**
     * 챗봇의 이름입니다.
     *
     * @title 이름
     */
    name: string;

    /**
     * 챗봇의 설명입니다.
     *
     * @title 설명
     */
    description: string;

    /**
     * 유저의 발화입니다.
     *
     * @title 유저 발화
     */
    message: string;

    /**
     * 채팅 히스토리 입니다.
     *
     * @title 채팅 히스토리
     */
    histories?: IHistory[];
  }

  /**
   * @title 쉬움 난이도 챗봇 사용을 위한 정보
   */
  export interface IChatbotEasyGenerateInput extends IChatBotBase {
    /**
     * 챗봇이 제작된 난이도 입니다.
     *
     * @title 난이도
     */
    difficulty: "easy";

    /**
     * 챗봇의 역할입니다.
     *
     * @title 역할
     */
    role: string;

    /**
     * 챗봇의 성격입니다.
     *
     * @title 성격
     */
    personality: string;

    /**
     * 챗봇의 요구사항입니다.
     *
     * @title 요구사항
     */
    requirement: string;
  }

  /**
   * @title 어려움 난이도 챗봇 사용을 위한 정보
   */

  export interface IChatBotHardGenerateInput extends IChatBotBase {
    /**
     * 챗봇이 제작된 난이도 입니다.
     *
     * @title 난이도
     */
    difficulty: "hard";

    /**
     * LLM 요청시 필요한 프롬프트입니다.
     *
     * @title 프롬프트
     */
    prompt: string;
  }

  /**
   * @title 챗봇 응답
   */
  export interface IChatbotGenerateOutput {
    /**
     * 챗봇 응답 결과 입니다.
     *
     * @title 챗봇 응답
     */
    content: string;
  }

  /**
   * @title 채팅 히스토리
   */
  export interface IHistory {
    /**
     * 발화자의 역할입니다.
     *
     * @title 발화자 역할
     */
    role: "user" | "assistant";

    /**
     * 발화 내용입니다.
     *
     * @title 발화 내용
     */
    content: string;
  }
}
