import { Injectable } from "@nestjs/common";
import axios from "axios";

import { IPrompt } from "@wrtn/connector-api/lib/structures/connector/prompt/IPrompt";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

@Injectable()
export class PromptProvider {
  private readonly HAMLET_URL = ConnectorGlobal.env.HAMLET_URL;

  async generate(input: IPrompt.IRequest): Promise<IPrompt.IResponse> {
    try {
      const messages = [];

      if (input.system_prompt) {
        messages.push({
          role: "system",
          content: input.system_prompt,
        });
      }

      const createMessage = (userRequest: string, data: any) => {
        let prompt = `<user_request>\n${userRequest}\n</user_request>`;

        if (data !== null && data !== undefined)
          prompt += `\n\nRefer below data to accomplish the task:\n<data>${JSON.stringify(data, null, 2)}</data>`;

        return prompt;
      };

      messages.push({
        role: "user",
        content: createMessage(input.user_request, input.data),
      });

      const requestBody = {
        messages: messages,
      };

      const res = await axios.post(
        `${this.HAMLET_URL}${ConnectorGlobal.env.HAMLET_PROMPT_NODE_REQUEST_ENDPOINT}`,
        requestBody,
        {
          headers: {
            [ConnectorGlobal.env.HAMLET_HEADER_KEY_NAME]:
              ConnectorGlobal.env.HAMLET_HEADER_KEY_VALUE,
          },
        },
      );
      return { result: res.data.choices?.[0].message?.content };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }
}
