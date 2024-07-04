/**
 * @packageDocumentation
 * @module api.functional.connector.chatbot.generate.easy
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { Try } from "../../../../../../utils/createResponseForm";
import type { IChatbot } from "../../../../../structures/connector/chatbot/IChatbot";

/**
 * 쉬움 난이도로 제작된 챗봇을 사용합니다.
 *
 * @summary 난이도 쉬움 챗봇 사용
 * @param input 쉬움 난이도로 제작된 챗봇을 사용하기 위한 정보
 * @returns 챗봇의 답변
 * @tag Chatbot
 *
 * @controller ChatBotController.generateEasyChatbot
 * @path POST /connector/chatbot/generate/easy
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function generateEasyChatbot(
  connection: IConnection,
  input: generateEasyChatbot.Input,
): Promise<generateEasyChatbot.Output> {
  return !!connection.simulate
    ? generateEasyChatbot.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...generateEasyChatbot.METADATA,
          template: generateEasyChatbot.METADATA.path,
          path: generateEasyChatbot.path(),
        },
        input,
      );
}
export namespace generateEasyChatbot {
  export type Input = Primitive<IChatbot.IChatbotEasyGenerateInput>;
  export type Output = Primitive<Try<IChatbot.IChatbotGenerateOutput>>;

  export const METADATA = {
    method: "POST",
    path: "/connector/chatbot/generate/easy",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = () => "/connector/chatbot/generate/easy";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<Try<IChatbot.IChatbotGenerateOutput>>> =>
    typia.random<Primitive<Try<IChatbot.IChatbotGenerateOutput>>>(g);
  export const simulate = (
    connection: IConnection,
    input: generateEasyChatbot.Input,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(),
      contentType: "application/json",
    });
    assert.body(() => typia.assert(input));
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}
