import { Injectable } from "@nestjs/common";
import axios from "axios";

import { IPrompt } from "@wrtn/connector-api/lib/structures/connector/prompt/IPrompt";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

@Injectable()
export class PromptProvider {
  constructor() {}
  private readonly HAMLET_URL = ConnectorGlobal.env.HAMLET_URL;

  async generate(input: IPrompt.IRequest): Promise<IPrompt.IResponse> {
    const requestBody = {
      messages: [
        {
          role: "user",
          content: input.user_request,
        },
      ],
      ...(input.system_prompt && { system: input.system_prompt }),
      temperature: 0.5,
      model: ConnectorGlobal.env.HAMLET_PROMPT_NODE_MODEL_NAME,
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
    return { result: res.data.content[0].text };
  }
}
