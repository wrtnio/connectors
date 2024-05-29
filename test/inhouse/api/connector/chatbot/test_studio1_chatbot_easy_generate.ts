import typia from "typia";

import CApi from "@wrtn/connector-api";
import { IChatbot } from "@wrtn/connector-api/lib/structures/connector/chatbot/IChatbot";

export const test_studio1_chatbot_easy_generate = async (
  connection: CApi.IConnection,
) => {
  const easyInput: IChatbot.IChatbotEasyGenerateInput = {
    name: "나는 개그맨",
    description: "재밌는 얘기해줌!",
    difficulty: "easy",
    message: "내가 우울한데 재밌는 이야기 해줘",
    role: "사용자의 입력에 따라 유머를 들거나 자신의 농담을 제공해주는 대화 챗봇입니다.",
    personality: "밝고 유머러스함, 친절하게 대답해",
    requirement:
      "사용자의 입력에 따라 유머나 농담을 적절하게 반영해줘야 합니다.",
    histories: [
      { role: "user", content: "내 기분을 풀어줘" },
      { role: "assistant", content: "우하하하, 제가 기분을 풀어드리죠!" },
    ],
  };
  const output =
    await CApi.functional.connector.chatbot.generate.easy.generateEasyChatbot(
      connection,
      easyInput,
    );
  typia.assertEquals<IChatbot.IChatbotGenerateOutput>(output);
};
