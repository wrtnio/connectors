export namespace IChatbot {
  /**
   * @title Basic information for using chatbots
   */
  export interface IChatBotBase {
    /**
     * The name of the chatbot.
     *
     * @title Name
     */
    name: string;

    /**
     * Here is the description of the chatbot.
     *
     * @title Description
     */
    description: string;

    /**
     * This is a user's speech.
     *
     * @title User's speech
     */
    message: string;

    /**
     * This is the chat history.
     *
     * @title Chat History
     */
    histories?: IHistory[];
  }

  /**
   * @title Easy Difficulty Information for using the chatbot
   */
  export interface IChatbotEasyGenerateInput extends IChatBotBase {
    /**
     * This is the difficulty level at which the chatbot was created.
     *
     * @title Difficulty
     */
    difficulty: "easy";

    /**
     * The role of the chatbot.
     *
     * @title Role
     */
    role: string;

    /**
     * The personality of the chatbot.
     *
     * @title Personality
     */
    personality: string;

    /**
     * Here are the requirements for the chatbot.
     *
     * @title Requirements
     */
    requirement: string;
  }

  /**
   * @title Information for using the chatbot in the difficult difficulty level
   */

  export interface IChatBotHardGenerateInput extends IChatBotBase {
    /**
     * This is the difficulty level at which the chatbot was created.
     *
     * @title Difficulty
     */
    difficulty: "hard";

    /**
     * This is the prompt required when requesting an LLM.
     *
     * @title prompt
     */
    prompt: string;
  }

  /**
   * @title Chatbot response
   */
  export interface IChatbotGenerateOutput {
    /**
     * Here is the chatbot response result.
     *
     * @title Chatbot response
     */
    content: string;
  }

  /**
   * @title Chat History
   */
  export interface IHistory {
    /**
     * The role of the speaker.
     *
     * @title The role of the speaker
     */
    role: "user" | "assistant";

    /**
     * Here is the speech content.
     *
     * @title The speech content
     */
    content: string;
  }
}
