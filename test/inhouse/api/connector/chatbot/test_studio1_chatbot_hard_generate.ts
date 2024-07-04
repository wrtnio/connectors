import typia from "typia";

import CApi from "@wrtn/connector-api";
import { IChatbot } from "@wrtn/connector-api/lib/structures/connector/chatbot/IChatbot";

export const test_studio1_chatbot_hard_generate = async (connection: CApi.IConnection) => {
  const hardInput: IChatbot.IChatBotHardGenerateInput = {
    name: "고객 감정 분석 리뷰봇",
    description: "고객이 남긴 리뷰의 글을 분석해서 적절한 답장을 생성하는 봇입니다.",
    difficulty: "hard",
    message: "배달이 왔을 때 너무 식어서 배달이 왔고, 음식이 너무 짜요.",
    prompt:
      "[지시]\n- 너는 고객서비스 상담사처럼 행동해.\n- 고객의 감정에 최대한 공감할 수 있는 정중한 표현을 사용해.\n- 아래 [단계]의 순서에 맞게 생각을 하고 답변을 생성해.\n- 필요한 경우 문맥에 맞는 이모지를 사용해 감정을 표현한다.\n- 답장의 맨 아래에는 'AI 상담사 드림' 이라는 표현을 넣어줘.\n\n[단계]\n1. 정보수집 : 사용자로부터 {리뷰}를 수집해야한다.\n2. 감정파악 : 사용자가 제공하는 {리뷰}에 담긴 작성자의 감정이 '긍정'인지 '부정'인지 파악한다.\n3. 답변작성 : {리뷰}의 감정이 '긍정'일 경우, {리뷰}의 내용에 기반한 감사의 답장을 작성해주고, '부정'이면 {리뷰}의 내용에 기반한 사과의 답장을 작성한다.\n4. 평가 : 스스로 점수를 평가하고 100점 만점에서 100점일 경우에만 '최종답장' 단계로 이동하고, 100점 미만일 경우 '수정', '평가' 단계를 반복한다.\n5. 수정 : 작성된 최종 결과물이 {리뷰} 내용의 주제와 맞을 때까지 수정한다.\n6. 최종답장 : 최종답변을 [답장예시]에 맞게 생성해서 사용자에게 제공한다.\n\n답장서식은 '인사말', '리뷰 내용에 기반한 답장', 'AI 상담사 드림'은 아래와 같이 줄바꿈으로 서식을 구분해줘\n###[답장예시]\n'인사말'\n'리뷰 내용에 기반한 답장'\n'AI 상담사 드림'\n###",
    histories: [
      { role: "user", content: "음식이 너무 맛있어요." },
      {
        role: "assistant",
        content: "고객님 음식을 맛있게 드셔주셔서 너무 감사합니다. 항상 최선을 다하겠습니다.",
      },
    ],
  };
  const output = await CApi.functional.connector.chatbot.generate.hard.generateHardChatbot(connection, hardInput);
  typia.assertEquals<IChatbot.IChatbotGenerateOutput>(output);
};
