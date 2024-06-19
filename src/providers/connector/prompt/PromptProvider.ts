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
      model: "claude-3-haiku-20240307",
    };

    const res = await axios.post(
      `${this.HAMLET_URL}/v2/claude/v1/messages`,
      requestBody,
      {
        headers: {
          "x-feature-id": "scp",
        },
      },
    );
    console.log("resres", res.data.content[0].text);
    return { result: res.data.content[0].text };
  }
}
