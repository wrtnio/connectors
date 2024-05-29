import { uuid } from "typia/lib/utils/RandomGenerator/RandomGenerator";

import { GenerateToolVO } from "./GenerateToolVO";

export class GenerateToolEasyVO extends GenerateToolVO {
  examples: string;
  user_input: string;

  static of(tool: any, text: string) {
    const vo = new GenerateToolEasyVO();
    vo.name = tool.title;
    vo.model = vo.handleModelName(tool.model);
    vo.prompt_level = tool.difficulty;
    vo.max_tokens = tool.maxTokens;
    vo.id = tool.toolId.$oid;
    vo.instructions = text;
    vo.requestId = uuid();
    vo.plain_text_embedding = !!tool.isPlainTextEmbedding;
    vo.examples = tool.examples;
    vo.user_input = tool.userInput;

    return vo;
  }
}
